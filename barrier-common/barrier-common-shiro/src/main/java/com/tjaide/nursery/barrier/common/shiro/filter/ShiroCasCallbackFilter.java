package com.tjaide.nursery.barrier.common.shiro.filter;

import io.buji.pac4j.filter.CallbackFilter;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.session.UnknownSessionException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

/**
 * 退出过滤器
 * <pre>
 * 构建组：certification
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年04月20日-15:14

 * </pre>
 **/
@Slf4j
public class ShiroCasCallbackFilter extends CallbackFilter {


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        try {
            super.doFilter(servletRequest, servletResponse, filterChain);
        } catch (UnknownSessionException e) {
            log.error(e.getMessage());
        }
    }
}
