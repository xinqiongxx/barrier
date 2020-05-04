package com.tjaide.nursery.barrier.common.qui.aspect;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.qui.util.QuiUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * 参数重写拦截器

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年08月06日-14:46

 **/
@Aspect
@Component
public class ParamAspect {


    /**
     * 前置通知
     */
    @Before("execution(* com.tjaide.nursery.barrier.web.controller.*.*(com.baomidou.mybatisplus.extension.plugins.pagination.Page)) ||execution(* com.tjaide.nursery.barrier.web.controller.*.*(com.baomidou.mybatisplus.extension.plugins.pagination.Page,*))")
    public void proceed(JoinPoint joinPoint) {
        Object[] obj = joinPoint.getArgs();
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        for (Object temp : obj) {
            if (temp instanceof Page) {
                QuiUtil.reAttribute(request, (Page) temp);
                break;
            }
        }
    }
}
