/**
 * Copyright (C), 2018-2019, 天津市爱德科技发展有限公司
 * FileName: ShiroSessionListener
 * Author:   Administrator
 * Date:     2019/3/25 17:43
 * Description: 配置session监听器
 * History:
 * Administrator        2019/3/25 17:43         1.0              <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.tjaide.nursery.barrier.common.shiro.listener;

import com.tjaide.nursery.barrier.common.shiro.config.SessionConfigurationProperties;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListener;

import java.util.concurrent.atomic.AtomicInteger;

public class ShiroSessionListener implements SessionListener {

    private SessionConfigurationProperties sessionConfigurationProperties;

    public ShiroSessionListener(SessionConfigurationProperties sessionConfigurationProperties) {
        this.sessionConfigurationProperties = sessionConfigurationProperties;
    }

    /**
     * 统计在线人数
     * juc包下线程安全自增
     */
    private final AtomicInteger sessionCount = new AtomicInteger(0);

    /**
     * 会话创建时触发
     *
     * @param session
     */
    @Override
    public void onStart(Session session) {
        session.setAttribute("quseUrl", sessionConfigurationProperties.getQuseUrl());
        session.setAttribute("adapterUrl", sessionConfigurationProperties.getAdapterUrl());
        session.setAttribute("basicsUrl", sessionConfigurationProperties.getBasicsUrl());
        session.setAttribute("cooperationUrl", sessionConfigurationProperties.getCooperationUrl());
        session.setAttribute("fileUrl", sessionConfigurationProperties.getFileUrl());
        session.setAttribute("hdUrl", sessionConfigurationProperties.getHdUrl());
        session.setAttribute("securityUrl", sessionConfigurationProperties.getSecurityUrl());
        session.setAttribute("siteType", sessionConfigurationProperties.getSiteType());
        //会话创建，在线人数加一
        sessionCount.incrementAndGet();
    }

    /**
     * 退出会话时触发
     *
     * @param session
     */
    @Override
    public void onStop(Session session) {
        //会话退出,在线人数减一
        sessionCount.decrementAndGet();
    }

    /**
     * 会话过期时触发
     *
     * @param session
     */
    @Override
    public void onExpiration(Session session) {
        //会话过期,在线人数减一
        sessionCount.decrementAndGet();
    }

    /**
     * 获取在线人数使用
     *
     * @return
     */
    public AtomicInteger getSessionCount() {
        return sessionCount;
    }
}
