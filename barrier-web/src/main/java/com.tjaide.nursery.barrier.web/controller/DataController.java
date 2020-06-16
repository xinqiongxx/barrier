package com.tjaide.nursery.barrier.web.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.service.*;
import com.tjaide.nursery.barrier.web.service.impl.AsyncServiceImpl;
import com.tjaide.nursery.barrier.web.vo.UserVO;
import lombok.AllArgsConstructor;
import org.apache.shiro.SecurityUtils;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 大屏页面数据支持

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月08日-21：00

 *
 * @author 86130
 */
@RestController
@RequestMapping("/dataData")
@AllArgsConstructor
public class DataController {
    private final SysDictService sysDictService;
    private final SysDictItemService sysDictItemService;
    private final SysFlatbedService flatbedService;
    private final SysBarrierService barrierService;
    private final SysPassProcessService passProcessService;
    private final SysDepotUserService sysDepotUserService;
    private final AsyncServiceImpl asyncService;



    @GetMapping("/getCount")
    public R getCount(){
        Map<String,Object> map = new HashMap<>();
        LocalDateTime now=LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String nowStr=now.format(formatter);
        LocalDateTime starTime= LocalDateTime.parse(nowStr+" 00:00:00",formatter2);
        LocalDateTime endTime= LocalDateTime.parse(nowStr+" 23:59:59",formatter2);
        Map<String,Object> datas=passProcessService.getBaseDatas();
        //获取进出人数
        Integer entercount=passProcessService.count(Wrappers.<SysPassProcess>lambdaQuery()
                .eq(SysPassProcess::getEnterType,0)
                .ge(SysPassProcess::getCreateTime,starTime)
                .le(SysPassProcess::getCreateTime,endTime));
        //获取进出人数
        Integer leavecount=passProcessService.count(Wrappers.<SysPassProcess>lambdaQuery()
                .eq(SysPassProcess::getEnterType,1)
                .ge(SysPassProcess::getCreateTime,starTime)
                .le(SysPassProcess::getCreateTime,endTime));
        map.put("stucount",datas.get("data1"));
        map.put("teachercount",datas.get("data2"));
        map.put("entercount",entercount);
        map.put("leavecount",leavecount);
        return R.ok(map);
    }
    /**
     * 查询基础数据
     */
    @GetMapping("/getBaseDatas")
    public R getBaseDatas() {
        Map<String,Object> res=new HashMap<>();
        Integer data1 = sysDepotUserService.count(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getUserType,1));
        Integer data2 = sysDepotUserService.count(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getUserType,3));
        Integer data3 = sysDepotUserService.count(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getUserType,2));
        Integer data4 = sysDepotUserService.count();
        res.put("data1",data1);
        res.put("data2",data2);
        res.put("data3",data3);
        res.put("data4",data4);
        return R.ok(res);
    }



    /**
     * 查询最新进出记录
     */
    @GetMapping("/getLastPassProcess")
    public R getLastPassProcess() {
        return R.ok(passProcessService.findRecentPassVoList());
    }




    /**
     * 查询最近五天进出人数
     */
    @GetMapping("/getDateNum")
    public R getDateNum() {
        return R.ok(passProcessService.getDateNum());
    }


    /**
     * 查询今日流量情况
     */
    @GetMapping("/getflow")
    public R getflow() {
        return R.ok(passProcessService.getflow());
    }


    @GetMapping("/test")
    public R test(){
        SysPassProcess sysPassProcess = new SysPassProcess();
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        sysPassProcess.setDiscernId(3);
        sysPassProcess.setRemark("");
        sysPassProcess.setStatus(0);
        LocalDateTime localDateTime =LocalDateTime.parse("2020-07-01 00:00:00", df);
        sysPassProcess.setCreateTime(localDateTime);
        sysPassProcess.setSanpPic("/api/image/view/match/1");
        sysPassProcess.setEnterType(0);
        sysPassProcess.setUserId(sysPassProcess.getDiscernId());
        sysPassProcess.setRegisteredPic("/api/image/view/reg/1");
        asyncService.insertAttendance(sysPassProcess,"deviceId","photo",-99);
        return R.ok();
    }
}
