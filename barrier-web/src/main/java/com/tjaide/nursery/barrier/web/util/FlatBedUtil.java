package com.tjaide.nursery.barrier.web.util;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import io.swagger.models.auth.In;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

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


    public static List<SysDepotUser> AddPersons(String url, String deviceId,List<SysDepotUser> lists){
        List<String> ids = new ArrayList<>();
        lists.forEach(sysDepotUser -> {
            ids.add(sysDepotUser.getId()+"");
            ids.add(sysDepotUser.getId()+"A");
        });
        DeletePerson(url,deviceId,ids);
        // 多线程处理
        int tempInt = lists.size() / 30 + 1;
        List<SysDepotUser> error = new ArrayList<>();
        List<SysDepotUser> oldList = new ArrayList<>();
        List<CompletableFuture> resList = new ArrayList<>();
        for (int i = 0; i < lists.size(); i++) {
            oldList.add(lists.get(i));
            if (i / tempInt == 0 || (i == (lists.size() - 1) && i / tempInt != 0)) {
                List<SysDepotUser>  finalOldMap = oldList;
                resList.add(CompletableFuture.supplyAsync(() -> finalOldMap).thenAcceptAsync(e -> {
                    HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/AddPersons");
                    httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("operator","AddPersons");
                    jsonObject.put("DeviceID",deviceId);
                    jsonObject.put("Total",finalOldMap.size()*2);
                    List<SysDepotUser> sysDepotUsers = new ArrayList<>();
                    for(int m = 0;m<finalOldMap.size();m++) {
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
                        user.put("picinfo", sysDepotUser.getPhoto());
                        jsonObject.put("Personinfo_" + m * 2, user);
                        user.put("PersonUUID", sysDepotUser.getId() + "A");
                        // 获取最新一次进出记录的照片进行同步
                        user.put("picinfo", sysDepotUser.getPhoto());
                        jsonObject.put("Personinfo_" + (m * 2 + 1), user);
                    }
                    httpRequest.body(jsonObject);
                    HttpResponse httpResponse = httpRequest.execute();
                    String body = httpResponse.body();
                    System.out.println("---"+body);
                    Integer code = Integer.parseInt(JSONUtil.parseObj(body).get("code").toString());
                    if(code != 200){
                        error.addAll(sysDepotUsers);
                    }
                }));
                oldList = new ArrayList<>();
            }
        }
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
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
