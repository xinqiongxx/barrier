package com.tjaide.nursery.barrier.web.controller;

import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.shiro.util.LoginException;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 登录控制器类

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-23:37

 **/
@Controller
@ApiIgnore
@RequestMapping(value = "/login")
public class LoginController {

    @ResponseBody
    @PostMapping(value = "/login")
    public R loginUser(HttpServletRequest request, Model model) {
        String remeber = request.getParameter("remeber");
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(request.getParameter("username"), request.getParameter("password"), Boolean.valueOf(remeber));
        try {
            subject.login(usernamePasswordToken);
            return R.ok();
        } catch (UnknownAccountException e) {
            model.addAttribute("msg", "用户名不存在!");
            return R.failed("用户名不存在!");
        } catch (IncorrectCredentialsException e) {
            model.addAttribute("msg", "密码错误!");
            return R.failed("密码错误!");
        } catch (ExcessiveAttemptsException eae) {
            model.addAttribute("msg", "登录失败次数过多");
            return R.failed("登录失败次数过多!");
        } catch (LoginException e) {
            model.addAttribute("msg",  e.getMessage());
            return R.failed( e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("msg", "未知错误" + e.getMessage());
            return R.failed("未知错误!");
        }
    }

    /**
     * 退出
     */
    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        SecurityUtils.getSubject().logout();
        return "redirect:/";
    }
}
