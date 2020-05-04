package com.tjaide.nursery.barrier.web.controller;

import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.core.util.ShiroUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 首页跳转控制器
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-11:16
 **/
@Controller
@ApiIgnore
public class HomeController {
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
        return "index/mainshow";
    }



    @GetMapping(value = "/main")
    public String tomain(Model model) {
        model.addAttribute("user", ShiroUtils.getUser());
        return "index/main";
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
