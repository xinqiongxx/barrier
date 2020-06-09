package com.tjaide.nursery.barrier.web.controller;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidPooledConnection;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.service.*;
import com.tjaide.nursery.barrier.web.service.impl.AsyncServiceImpl;
import com.tjaide.nursery.barrier.web.util.FlatBedUtil;
import com.tjaide.nursery.barrier.web.util.WebSocketServer;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.ResultSet;
import java.util.*;
import java.util.stream.Collectors;

@ApiIgnore
@Controller
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private SysFlatbedService sysFlatbedService;
    @Autowired
    private SysUserRelationService sysUserRelationService;
    @Autowired
    private SysBarrierService sysBarrierService;
    @Autowired
    private SysPassProcessService sysPassProcessService;
    @Autowired
    private SysDepotUserService sysDepotUserService;
    @Autowired
    private AsyncServiceImpl asyncService;

    @Autowired
    private DruidDataSource dataSource;

    private Map<String,Timer> timerMap = new HashMap<>();

    @Value("${file.path}")
    private String filePath;

    @SneakyThrows
    @ResponseBody
    @GetMapping("/validate/{table}/{name}")
    public Map<String,Object> validate(@PathVariable("table") String table,@PathVariable("name") String name,@RequestParam("validateValue") String validateValue){
        return validateValue("",table,name,validateValue);
    }

    @SneakyThrows
    @ResponseBody
    @GetMapping("/validate/{table}/{name}/{value}")
    public Map<String,Object> validateValue(@PathVariable("value")String value,@PathVariable("table") String table,@PathVariable("name") String name,@RequestParam("validateValue") String validateValue){
        Map<String,Object> result = new HashMap<>();
        Map<String,Object> message = new HashMap<>();
        DruidPooledConnection druidPooledConnection = dataSource.getConnection();
        String sql = "select * from "+table + " where "+ name +" = '"+ validateValue +"' and "+ name + " <> '"+value+"'";
        ResultSet resultSet = druidPooledConnection.prepareStatement(sql).executeQuery();
        if(resultSet.next()){
            message.put("message","");
            message.put("valid", false);
        }else{
            message.put("message","");
            message.put("valid", true);
        }
        result.put("validateResult",message);
        return result;
    }

    @SneakyThrows
    @RequestMapping(value = "/image/view/{type}/{id}")
    @ResponseBody
    public void imageView(@PathVariable String type, @PathVariable String id, HttpServletResponse response){
        File imageFile = new File(filePath+File.separator+type+File.separator + id+".jpeg");
        if(!imageFile.exists()){
            InputStream inputStream = this.getClass().getResourceAsStream("/static/image/noData.png");
            response.setContentType("image/jpeg");
            IoUtil.copy(inputStream, response.getOutputStream());
        }else {
            response.setContentType("image/jpeg");
            IoUtil.copy(new FileInputStream(imageFile), response.getOutputStream());
        }
    }

    @SneakyThrows
    @RequestMapping(value = "/statistics/verify")
    @ResponseBody
    public void verify(HttpServletRequest request) {
        StringBuffer res = new StringBuffer();
        InputStream inputStream = request.getInputStream();
        InputStreamReader isr = new InputStreamReader(inputStream);
        BufferedReader read = new BufferedReader(isr);
        String line;
        line = read.readLine();
        while (line != null) {
            res.append(line);
            line = read.readLine();
        }
        JSONObject jsonObject = JSONUtil.parseObj(res.toString());
        Map<String,Object> infoMap = (Map<String, Object>) jsonObject.get("info");
        // infoMap 存储进出记录表
        SysPassProcess sysPassProcess = new SysPassProcess();
        String PersonUUID = infoMap.get("PersonUUID").toString();
        sysPassProcess.setDiscernId(Integer.parseInt(PersonUUID.replace("A","")));
        // 异步更新用户
        String fileName = infoMap.get("DeviceID")+"-"+System.currentTimeMillis();
        asyncService.savePhoto(jsonObject.get("SanpPic").toString(),fileName);
        sysPassProcess.setRemark("");
        sysPassProcess.setStatus(0);
        sysPassProcess.setSanpPic("/api/image/view/match/"+fileName);
        // 0 进 1 出 2 未知
        SysFlatbed sysFlatbed = sysFlatbedService.getOne(Wrappers.<SysFlatbed>lambdaQuery().eq(SysFlatbed::getNumber,infoMap.get("DeviceID")));
        List<SysBarrier> leaves = sysBarrierService.list(Wrappers.<SysBarrier>lambdaQuery().eq(SysBarrier::getLeaveFlatbed,sysFlatbed.getId()));
        List<SysBarrier> enters = sysBarrierService.list(Wrappers.<SysBarrier>lambdaQuery().eq(SysBarrier::getEnterFlatbed,sysFlatbed.getId()));
        if(ObjectUtil.isNotEmpty(leaves)){
            sysPassProcess.setEnterType(0);
        }else if(ObjectUtil.isNotEmpty(enters)){
            sysPassProcess.setEnterType(1);
        }else{
            sysPassProcess.setEnterType(1);
        }
        // ----
        // sysPassProcessService.save(sysPassProcess);
        List<SysUserRelation> lists = sysUserRelationService.list(Wrappers.<SysUserRelation>lambdaQuery().eq(SysUserRelation::getMemberId,sysPassProcess.getDiscernId()));
        if(ObjectUtil.isEmpty(lists)){
            sysPassProcess.setUserId(sysPassProcess.getDiscernId());
            sysPassProcess.setRegisteredPic("/api/image/view/reg/"+PersonUUID);
            sysPassProcessService.save(sysPassProcess);
            asyncService.insertAttendance(sysPassProcess,infoMap.get("DeviceID").toString(),jsonObject.get("SanpPic").toString(),-99);
        }else{
            lists.forEach(sysUserRelation -> {
                sysPassProcess.setUserId(sysUserRelation.getUserId());
                sysPassProcess.setRegisteredPic("/api/image/view/reg/"+sysUserRelation.getUserId());
                sysPassProcessService.save(sysPassProcess);
                asyncService.insertAttendance(sysPassProcess,infoMap.get("DeviceID").toString(),jsonObject.get("SanpPic").toString(),sysUserRelation.getRelationType());
            });
        }
        WebSocketServer.sendInfo(JSONUtil.toJsonStr(sysFlatbed), "page");
    }


    private static boolean isStart = false;

    @SneakyThrows
    @ResponseBody
    @RequestMapping(value = "/statistics/heartbeat")
    public String heartbeat(HttpServletRequest request) {
        StringBuffer res = new StringBuffer();
        InputStream inputStream = request.getInputStream();
        InputStreamReader isr = new InputStreamReader(inputStream);
        BufferedReader read = new BufferedReader(isr);
        String line;
        line = read.readLine();
        while (line != null) {
            res.append(line);
            line = read.readLine();
        }
        JSONObject jsonObject = JSONUtil.parseObj(res.toString());
        Map<String,Object> infoMap = (Map<String, Object>) jsonObject.get("info");
        String deviceId = infoMap.get("DeviceID").toString();
        Timer timer;
        if(ObjectUtil.isNotEmpty(timerMap.get(deviceId))){
            timer = timerMap.get(deviceId);
            timer.cancel();
        }else{
            sysFlatbedService.update(Wrappers.<SysFlatbed>lambdaUpdate().set(SysFlatbed::getOnlineStatus,"1").eq(SysFlatbed::getNumber,deviceId));
            SysFlatbed sysFlatbed= sysFlatbedService.getOne(Wrappers.<SysFlatbed>lambdaQuery().eq(SysFlatbed::getNumber,deviceId));
            synchronized (this) {
                if (!isStart) {
                    isStart = true;
                    FlatBedUtil.startVideo(sysFlatbed.getRtspAddress());
                }
            }
        }
        timer = new Timer();
        timer.schedule(new TimerTask() {
            public void run() {
                sysFlatbedService.update(Wrappers.<SysFlatbed>lambdaUpdate().set(SysFlatbed::getOnlineStatus,"0").eq(SysFlatbed::getNumber,deviceId));
                timerMap.remove(deviceId);
                if(timerMap.keySet().size()> 0) {
                    SysFlatbed sysFlatbed = sysFlatbedService.getOne(Wrappers.<SysFlatbed>lambdaQuery().eq(SysFlatbed::getNumber, timerMap.keySet().iterator().next()));
                    FlatBedUtil.setUrl(sysFlatbed.getRtspAddress());
                }
            }
        },30000);
        timerMap.put(deviceId,timer);
        return res.toString();
    }

    @Scheduled(cron = "0 0 0/12 * * ?")
    //@Scheduled(cron = "0 0 2 * * ?")
    public void fixTime() {
        List<SysDepotUser> lists = sysDepotUserService.enterDepotUser().stream().map(sysDepotUser -> {
            SysPassProcess sysPassProcess = sysPassProcessService.getOne(Wrappers.<SysPassProcess>lambdaQuery().eq(SysPassProcess::getDiscernId,sysDepotUser.getId()).orderByDesc(SysPassProcess::getCreateTime).last("limit 0 , 1"));
            String inputFile = sysPassProcess.getSanpPic().replace("/api/image/view/match/","");
            try {
                IoUtil.copy(new FileInputStream(new File(filePath+File.separator+"match"+File.separator+inputFile+".jpeg")),new FileOutputStream(new File(filePath+File.separator+"reg"+File.separator+sysPassProcess.getDiscernId()+"A.jpeg")));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            sysDepotUser.setPhoto("/api/image/view/reg/"+sysPassProcess.getDiscernId()+"A");
            return sysDepotUser;
        }).collect(Collectors.toList());
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list(Wrappers.<SysFlatbed>lambdaQuery().eq(SysFlatbed::getOnlineStatus,"1"));
        sysFlatbeds.forEach(sysFlatbed -> {
            FlatBedUtil.EditPerson(sysFlatbed.getIpAddress(),sysFlatbed.getNumber(),lists,filePath);
        });
    }
}
