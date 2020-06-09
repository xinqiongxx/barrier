package com.tjaide.nursery.barrier.web.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.core.util.ShiroUtils;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.service.SysDictItemService;
import com.tjaide.nursery.barrier.web.service.SysPassProcessService;
import com.tjaide.nursery.barrier.web.service.SysUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 首页跳转控制器
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-11:16
 **/
@Controller
@ApiIgnore
@AllArgsConstructor
public class HomeController {

    private final SysPassProcessService sysPassProcessService;
    /**
     * 根目录跳转
     *
     * @return 重定向到登录页面
     */
    @RequestMapping(value = "/login")
    public String root() {
        return "login/login";
    }


    @GetMapping(value = "/")
    public String main(Model model) {
        model.addAttribute("user", ShiroUtils.getUser());
        return "index/main";
    }



    @GetMapping(value = "/data")
    public String tomain(Model model) {
        LocalDateTime now=LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String nowStr=now.format(formatter);
        LocalDateTime starTime= LocalDateTime.parse(nowStr+" 00:00:00",formatter2);
        LocalDateTime endTime= LocalDateTime.parse(nowStr+" 23:59:59",formatter2);
        Map<String,Object> datas=sysPassProcessService.getBaseDatas();
        //获取进出人数
        Integer entercount=sysPassProcessService.count(Wrappers.<SysPassProcess>lambdaQuery()
            .eq(SysPassProcess::getEnterType,1)
            .ge(SysPassProcess::getCreateTime,starTime)
            .le(SysPassProcess::getCreateTime,endTime));
        //获取进出人数
        Integer leavecount=sysPassProcessService.count(Wrappers.<SysPassProcess>lambdaQuery()
            .eq(SysPassProcess::getEnterType,2)
            .ge(SysPassProcess::getCreateTime,starTime)
            .le(SysPassProcess::getCreateTime,endTime));
        model.addAttribute("stucount",datas.get("data1"));
        model.addAttribute("teachercount",datas.get("data2"));
        model.addAttribute("entercount",entercount);
        model.addAttribute("leavecount",leavecount);
        return "index/data";
    }


    @GetMapping(value = "/system")
    public String system() {
        return "index/system";
    }

    @GetMapping(value = "/home/stats")
    public String home() {
        ShiroUser user = ShiroUtils.getUser();
        return "index/stats";
    }
}
