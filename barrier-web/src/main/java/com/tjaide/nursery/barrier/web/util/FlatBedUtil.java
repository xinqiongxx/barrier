package com.tjaide.nursery.barrier.web.util;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.tjaide.nursery.barrier.common.core.util.ShiroUtils;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.entity.SysFlatbed;
import com.tjaide.nursery.barrier.web.service.SysFlatbedService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
public class FlatBedUtil {

    private static final String SCHEME = "http://";

    public static Map<String,Object> GetSysParam(String url){
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/GetSysParam");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
        HttpResponse httpResponse = httpRequest.execute();
        return (Map<String, Object>) JSONUtil.parseObj(httpResponse.body()).get("info");
    }


    public static Map<String,Object> SearchPersonNum(String url,String deviceId){
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/SearchPersonNum");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
        JSONObject jsonObject = new JSONObject();
        JSONObject info = new JSONObject();
        info.put("DeviceID",deviceId);
        info.put("Gender",2);
        jsonObject.put("operator","SearchPersonNum");
        jsonObject.put("info",info);
        httpRequest.body(jsonObject);
        HttpResponse httpResponse = httpRequest.execute();
        return (Map<String, Object>) JSONUtil.parseObj(httpResponse.body()).get("info");
    }


    public static Map<String,Object> DeleteAllPerson(String url){
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/DeleteAllPerson");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
        JSONObject jsonObject = new JSONObject();
        JSONObject info = new JSONObject();
        info.put("DeleteAllPersonCheck",1);
        jsonObject.put("operator","DeleteAllPerson");
        jsonObject.put("info",info);
        httpRequest.body(jsonObject);
        HttpResponse httpResponse = httpRequest.execute();
        return (Map<String, Object>) JSONUtil.parseObj(httpResponse.body()).get("info");
    }

    public static Map<String,Object> DeletePerson(String url,String deviceId,List<String> ids){
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/DeletePerson");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
        JSONObject jsonObject = new JSONObject();
        JSONObject info = new JSONObject();
        info.put("DeviceID",deviceId);
        info.put("TotalNum",ids.size());
        info.put("IdType",2);
        info.put("PersonUUID",ids);
        jsonObject.put("operator","DeletePerson");
        jsonObject.put("info",info);
        httpRequest.body(jsonObject);
        HttpResponse httpResponse = httpRequest.execute();
        return (Map<String, Object>) JSONUtil.parseObj(httpResponse.body()).get("info");
    }

    public static Integer EditPerson(String url,String deviceId,List<SysDepotUser> lists,String filePath){
        // 多线程处理
        int tempInt = lists.size() / 30 + 1;
        AtomicInteger error = new AtomicInteger();
        Map<Integer,SysDepotUser> oldMap = new HashMap<>();
        List<CompletableFuture> resList = new ArrayList<>();
        for (int i = 1; i <= lists.size(); i++) {
            oldMap.put(i-1,lists.get(i-1));
            if ( i % tempInt == 0 || (i == lists.size()  && i % tempInt != 0)) {
                Map<Integer, SysDepotUser> finalOldMap = oldMap;
                resList.add(CompletableFuture.supplyAsync(() -> finalOldMap).thenAcceptAsync(e -> {
                    for(Integer key : finalOldMap.keySet()){
                        SysDepotUser sysDepotUser = finalOldMap.get(key);
                        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/EditPerson");
                        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
                        Map<String, Object> user = new HashMap<>();
                        user.put("PersonType", sysDepotUser.getDepotType());//0 白名单 1 黑名单
                        user.put("Name", sysDepotUser.getName());
                        user.put("IdType", 2);
                        user.put("Gender", sysDepotUser.getGender());
                        user.put("Nation", sysDepotUser.getNation());
                        user.put("CardType", 0);
                        user.put("IdCard", sysDepotUser.getCardId());
                        user.put("Birthday", sysDepotUser.getBirthday());
                        user.put("Telnum", sysDepotUser.getPhone());
                        user.put("Native", "");
                        user.put("Address", sysDepotUser.getAddress());
                        user.put("Notes", sysDepotUser.getRemark());
                        user.put("Tempvalid", 0);
                        user.put("isCheckSimilarity", 0);
                        if(sysDepotUser.getPhotoBase64(filePath) == null){
                            continue;
                        }
                        user.put("PersonUUID", sysDepotUser.getId() + "A");
                        user.put("DeviceID", deviceId);
                        String bodyStr = String.format("{\"operator\":\"EditPerson\",\"info\":%s,\"picinfo\":\"%s\"}", JSONUtil.toJsonStr(user),sysDepotUser.getPhotoBase64(filePath));
                        httpRequest.body(bodyStr);
                        HttpResponse httpResponse = httpRequest.execute();
                        String body = httpResponse.body();
                        Integer code = Integer.parseInt(JSONUtil.parseObj(body).get("code").toString());
                        if(code != 200){
                            error.getAndIncrement();
                        }
                    }
                }));
                oldMap = new HashMap<>();
            }
        }
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        return error.get();
    }

    @SneakyThrows
    public static List<SysDepotUser> AddPersons(SysFlatbed sysFlatbed, List<SysDepotUser> lists, String filePath, SysFlatbedService sysFlatbedService){
        String userid = ShiroUtils.getUser().getUserId();
        sysFlatbed.setProcess("开始同步");
        WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), userid);
        sysFlatbedService.updateById(sysFlatbed);
        String url = sysFlatbed.getIpAddress();
        String deviceId = sysFlatbed.getNumber();
        List<String> ids = new ArrayList<>();
        lists.forEach(sysDepotUser -> {
            ids.add(sysDepotUser.getId()+"");
            ids.add(sysDepotUser.getId()+"A");
        });
        sysFlatbed.setProcess("完成：0%");
        WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), userid);
        sysFlatbedService.updateById(sysFlatbed);
        DeletePerson(url, deviceId, ids);
        // 多线程处理
        int tempInt = lists.size() / 30 + 1;
        //int tempInt = lists.size();
        List<SysDepotUser> error = new ArrayList<>();
        List<SysDepotUser> oldList = new ArrayList<>();
        List<CompletableFuture> resList = new ArrayList<>();
        AtomicInteger completeInt = new AtomicInteger(0);
        for (int i = 1; i <= lists.size(); i++) {
            oldList.add(lists.get(i-1));
            if ( i % tempInt == 0 || (i == lists.size()  && i % tempInt != 0)) {
                List<SysDepotUser>  finalOldMap = oldList;
                resList.add(CompletableFuture.supplyAsync(() -> finalOldMap).thenAcceptAsync(e -> {
                    HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/AddPersons");
                    httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("operator","AddPersons");
                    jsonObject.put("DeviceID",deviceId);
                    jsonObject.put("Total",e.size()*2);
                    List<SysDepotUser> sysDepotUsers = new ArrayList<>();
                    for(int m = 0;m<e.size();m++) {
                        SysDepotUser sysDepotUser = e.get(m);
                        sysDepotUsers.add(sysDepotUser);
                        Map<String, Object> user = new HashMap<String, Object>();
                        user.put("PersonType", sysDepotUser.getDepotType());//0 白名单 1 黑名单
                        user.put("Name", sysDepotUser.getName());
                        user.put("Gender", sysDepotUser.getGender());
                        user.put("Nation", sysDepotUser.getNation());
                        user.put("CardType", 0);
                        user.put("IdCard", sysDepotUser.getCardId());
                        user.put("Birthday", sysDepotUser.getBirthday());
                        user.put("Telnum", sysDepotUser.getPhone());
                        user.put("Native", "");
                        user.put("Address", sysDepotUser.getAddress());
                        user.put("Notes", sysDepotUser.getRemark());
                        user.put("Tempvalid", 0);
                        user.put("PersonUUID", sysDepotUser.getId());
                        user.put("isCheckSimilarity", 0);
                        if(sysDepotUser.getPhotoBase64(filePath) == null){
                            continue;
                        }
                        user.put("picinfo", sysDepotUser.getPhotoBase64(filePath));
                        jsonObject.put("Personinfo_" + m * 2, user);
                        user.put("PersonUUID", sysDepotUser.getId() + "A");
                        // 获取最新一次进出记录的照片进行同步
                        user.put("picinfo",sysDepotUser.getPhotoBase64(filePath));
                        jsonObject.put("Personinfo_" + (m * 2 + 1), user);
                    }
                    // 服务端不支持多线程
                    httpRequest.body(jsonObject);
                    HttpResponse httpResponse = httpRequest.executeAsync();
                    String body = httpResponse.body();
                    Integer code = Integer.parseInt(JSONUtil.parseObj(body).get("code").toString());
                    if (code != 200) {
                        error.addAll(sysDepotUsers);
                    }
                    completeInt.set(completeInt.get()+e.size());
                    sysFlatbed.setProcess("完成："+(double)Math.round( completeInt.get()/(double)lists.size()*1000)/10+"%");
                    WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), userid);
                    sysFlatbedService.updateById(sysFlatbed);
                }));
                oldList = new ArrayList<>();
            }
        }
        long end =System.currentTimeMillis();
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        sysFlatbed.setProcess("同步完成");
        sysFlatbedService.updateById(sysFlatbed);
        return error;
    }

    public static Map<String,Object> OpenDoor(String url, String deviceId){
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/OpenDoor");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
        JSONObject jsonObject = new JSONObject();
        JSONObject info = new JSONObject();
        info.put("DeviceID",deviceId);
        info.put("Chn",0);
        jsonObject.put("operator","OpenDoor");
        jsonObject.put("info",info);
        httpRequest.body(jsonObject);
        HttpResponse httpResponse = httpRequest.executeAsync();
        String body = httpResponse.body();
        return (Map<String, Object>) JSONUtil.parseObj(body).get("info");
    }

    public static Map<String,Object> GetPictureSimilarity(String url, String picinfo1,String picinfo2){
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/GetPictureSimilarity");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("operator","GetPictureSimilarity");
        jsonObject.put("picinfo1",picinfo1);
        jsonObject.put("picinfo2",picinfo2);
        httpRequest.body(jsonObject);
        HttpResponse httpResponse = httpRequest.executeAsync();
        String body = httpResponse.body();
        return (Map<String, Object>) JSONUtil.parseObj(body).get("info");
    }


    public static Map<String,Object> GetPictureSearch(String url, String picinfo,float MaxSimilarity,int MaxNum){
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/GetPictureSearch");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");;
        JSONObject info = new JSONObject();
        info.put("MaxSimilarity",MaxSimilarity);
        info.put("MaxNum",MaxNum);
        String bodyStr = String.format("{\"operator\":\"GetPictureSearch\",\"info\":%s,\"picinfo\":\"%s\"}", JSONUtil.toJsonStr(info),picinfo);
        httpRequest.body(bodyStr.getBytes());
        HttpResponse httpResponse = httpRequest.executeAsync();
        String body = httpResponse.body();
        return (Map<String, Object>) JSONUtil.parseObj(body).get("info");
    }
}
