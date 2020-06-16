package com.tjaide.nursery.barrier.web.util;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.entity.SysFlatbed;
import com.tjaide.nursery.barrier.web.service.SysFlatbedService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.bytedeco.ffmpeg.avformat.AVFormatContext;
import org.bytedeco.ffmpeg.global.avcodec;
import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.FFmpegFrameRecorder;
import org.bytedeco.javacv.Frame;

import java.lang.reflect.Field;
import java.util.*;
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
                        JSONObject object = JSONUtil.parseObj(body);
                        Integer code = Integer.parseInt(object.get("code").toString());
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
    public static List<String> AddPersons(Boolean isDel,String userid,SysFlatbed sysFlatbed, List<SysDepotUser> lists, String filePath, SysFlatbedService sysFlatbedService){
        sysFlatbed.setProcess("开始同步");
        WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), userid);
        sysFlatbedService.updateById(sysFlatbed);
        String url = sysFlatbed.getIpAddress();
        String deviceId = sysFlatbed.getNumber();
        sysFlatbed.setProcess("完成：0%");
        WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), userid);
        sysFlatbedService.updateById(sysFlatbed);
        Set<String> idsNow = new HashSet<>();
        if(isDel) {
            List<String> ids = new ArrayList<>();
            lists.forEach(sysDepotUser -> {
                ids.add(sysDepotUser.getId()+"");
                ids.add(sysDepotUser.getId()+"A");
            });
            DeletePerson(url, deviceId, ids);
        }else {
            idsNow = FlatBedUtil.SearchPersonList(sysFlatbed.getIpAddress(), sysFlatbed.getNumber(), 0, 100);
        }
//        // 多线程处理
        int tempInt = lists.size() / 30 + 1;
//        //int tempInt = lists.size();
        AtomicInteger unPicNum = new AtomicInteger();
        AtomicInteger unFeatureNum = new AtomicInteger();
        AtomicInteger useNum = new AtomicInteger();
        List<String> error = new ArrayList<>();
        List<SysDepotUser> oldList = new ArrayList<>();
        List<CompletableFuture> resList = new ArrayList<>();
        AtomicInteger completeInt = new AtomicInteger(0);
        for (int i = 1; i <= lists.size(); i++) {
//            oldList.add(lists.get(i-1));
//            if ( i % tempInt == 0 || (i == lists.size()  && i % tempInt != 0)) {
//                List<SysDepotUser>  finalOldMap = oldList;
//                resList.add(CompletableFuture.supplyAsync(() -> finalOldMap).thenAcceptAsync(e -> {
                    HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/AddPersons");
                    httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("operator","AddPersons");
                    jsonObject.put("DeviceID",deviceId);
//                    jsonObject.put("Total",e.size()*2);
                    jsonObject.put("Total",2);
                    List<SysDepotUser> sysDepotUsers = new ArrayList<>();
                    int sizeM = 0;
//                    for(int m = 0;m<e.size();m++) {
//                        SysDepotUser sysDepotUser = e.get(m);
                        SysDepotUser sysDepotUser = lists.get(i - 1);
                        if(idsNow.contains(sysDepotUser.getId().toString())){
                            useNum.getAndIncrement();
                            completeInt.getAndSet(completeInt.get()+1);
                            continue;
                        }
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
                        if(StrUtil.isEmpty(sysDepotUser.getPhotoBase64(filePath))){
                            completeInt.getAndSet(completeInt.get()+1);
                            unPicNum.getAndIncrement();
                            error.add(sysDepotUser.getName()+"照片不存在；");
                            continue;
                        }
                        user.put("picinfo", sysDepotUser.getPhotoBase64(filePath));
                        jsonObject.put("Personinfo_" + sizeM * 2, user);
                        user.put("PersonUUID", sysDepotUser.getId() + "A");
                        // 获取最新一次进出记录的照片进行同步
                        user.put("picinfo",sysDepotUser.getPhotoBase64(filePath));
                        jsonObject.put("Personinfo_" + (sizeM * 2 + 1), user);

                        // 服务端不支持多线程
                        httpRequest.body(jsonObject);
                        HttpResponse httpResponse = httpRequest.executeAsync();
                        String body = httpResponse.body();
                        JSONObject bodyObj = JSONUtil.parseObj(body);
                        Integer code = Integer.parseInt(bodyObj.get("code").toString());

                        sizeM = 0;
                        if (code != 200) {
                            JSONObject info = JSONUtil.parseObj(bodyObj.get("info").toString());
                            if(info.get("Detail").toString().indexOf("Unkonw Picinfo and get picURI error") > -1){
                                unPicNum.getAndIncrement();
                                error.add(sysDepotUser.getName()+"照片过大，请勿超过1M；");
                            }
                            if(info.get("Detail").toString().indexOf("Unkonw operator") > -1){
                                error.add(sysDepotUser.getName()+"照片不存在，请重新上传；");
                            }
                            if(info.get("Detail").toString().indexOf("GetPersonFeature err") > -1){
                                unFeatureNum.getAndIncrement();
                                error.add(sysDepotUser.getName()+"照片无法找到人脸，请重新上传；");
                            }

                            if(info.get("Detail").toString().indexOf("PersonUUID had existed") > -1){
                                useNum.getAndIncrement();
                            }

                        }
                        completeInt.getAndSet(completeInt.get()+1);
                        sysFlatbed.setProcess("完成："+(double)Math.round( completeInt.get()/(double)lists.size()*1000)/10+"%");
                        WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), userid);
                        sysFlatbedService.updateById(sysFlatbed);
//                    }

//                }));
//                oldList = new ArrayList<>();
//            }
        }
        long end =System.currentTimeMillis();
//        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
//        all.join();
        sysFlatbed.setProcess("同步完成");
        WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), userid);
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

    public static Set<String> SearchPersonList(String url, String deviceId, int start, int size){
        Set<String> persionIds = new HashSet<>();
        HttpRequest httpRequest = HttpUtil.createPost(SCHEME+url+"/action/SearchPersonList");
        httpRequest.header("Authorization","Basic YWRtaW46YWRtaW4=");
        JSONObject jsonObject = new JSONObject();
        JSONObject info = new JSONObject();
        info.put("DeviceID",deviceId);
        info.put("PersonType",2);
        info.put("Gender",2);
        info.put("BeginTime","2020-06-01T00:00:00");
        info.put("EndTime","2050-06-19T23:59:59");
        info.put("BeginNO",start);
        info.put("RequestCount",size);
        jsonObject.put("operator","SearchPersonList");
        jsonObject.put("info",info);
        httpRequest.body(jsonObject);
        HttpResponse httpResponse = httpRequest.executeAsync();
        String body = httpResponse.body();
        if(!"".equals(body)){
            Map<String,Object> infos = (Map<String, Object>) JSONUtil.parseObj(body).get("info");
            List<Map<String,Object>> res = (List<Map<String,Object>>)infos.get("List");
            res.forEach(map -> {
                persionIds.add(map.get("PersonUUID").toString());
            });
            persionIds.addAll(SearchPersonList(url,deviceId,start+size,size));
        }
        return persionIds;
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

    public  static  RtspThread rtspThread = null;
    public  static long start ;

    public static void setUrl(String url){
        boolean isRun = true;
        if(ObjectUtil.isNotEmpty(rtspThread)) {
            rtspThread.interrupt();
        }
        while(isRun){
            if(rtspThread  == null) {
                isRun = false;
                rtspThread = new RtspThread();
                rtspThread.setUrl(url);
                rtspThread.start();
            }else if(System.currentTimeMillis() - start > 3000&&rtspThread!= null){
                rtspThread.stop();
                rtspThread = null;
            }
        }
    }

    public static void startVideo(String url){
        rtspThread = new RtspThread();
        rtspThread.setUrl(url);
        rtspThread.start();
    }

    static class RtspThread extends Thread{

        public  String url = "";

        public void setUrl(String url){
            this.url = url;
        }

        @SneakyThrows
        @Override
        public void run() {
            start = System.currentTimeMillis();
            final int captureWidth = 1280;
            final int captureHeight = 720;
            FFmpegFrameGrabber grabber = new FFmpegFrameGrabber(this.url);// 最后一个参数是AudioChannels，建议通过grabber获取
            FFmpegFrameRecorder recorder = new FFmpegFrameRecorder("rtmp://barrier-nginx:1935/live", captureWidth, captureHeight, 1);

            try {
                grabber.setImageWidth(captureWidth);
                grabber.setImageHeight(captureHeight);
                // rtsp格式一定要添加这个参数，否则丢帧会比较严重
                grabber.setOption("rtsp_transport", "tcp");
                grabber.start();
                recorder.setInterleaved(true);
                // 降低编码延时
                recorder.setVideoOption("tune", "zerolatency");
                // 提升编码速度
                recorder.setVideoOption("preset", "ultrafast");
                // 视频质量参数(详见 https://trac.ffmpeg.org/wiki/Encode/H.264)
                recorder.setVideoOption("crf", "28");
                // 分辨率
                recorder.setVideoBitrate(2000000);
                // 视频编码格式
                recorder.setVideoCodec(avcodec.AV_CODEC_ID_H264);
                // 视频格式
                recorder.setFormat("flv");
                // 视频帧率
                recorder.setFrameRate(15);
                recorder.setGopSize(60);
                recorder.setAudioOption("crf", "0");
                recorder.setAudioQuality(0);
                recorder.setAudioBitrate(192000);
                recorder.setSampleRate(44100);
                // 建议从grabber获取AudioChannels
                recorder.setAudioChannels(1);
                recorder.setAudioCodec(avcodec.AV_CODEC_ID_AAC);
                recorder.start();

                // 解决音视频同步导致的延时问题
                Field field = recorder.getClass().getDeclaredField("oc");
                field.setAccessible(true);
                AVFormatContext oc = (AVFormatContext) field.get(recorder);
                oc.max_interleave_delta(100);

                // 用来测试的frame窗口
                Frame capturedFrame = null;

                // 有些时候，程序执行回报下列错误，添加一行代码解决此问题
                // av_interleaved_write_frame() error -22 while writing interleaved video packet.
                grabber.flush();
                while ((capturedFrame = grabber.grab()) != null && !rtspThread.isInterrupted()) {
                    start = System.currentTimeMillis();
                    recorder.setTimestamp(capturedFrame.timestamp);
                    recorder.record(capturedFrame);
                }
                if (rtspThread.isInterrupted()) {
                    grabber.close();
                    recorder.close();
                    rtspThread = null;
                }
            }catch (Exception e){
                grabber.close();
                recorder.close();
                rtspThread = null;
            }
        }
    }

    public static void main(String[] args) {
        System.out.println(SearchPersonList("demo-pad.tjaide.com", "1330788", 0, 100).size());
    }
}
