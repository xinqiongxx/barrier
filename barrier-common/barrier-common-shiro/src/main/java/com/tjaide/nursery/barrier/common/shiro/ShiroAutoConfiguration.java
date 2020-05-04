package com.tjaide.nursery.barrier.common.shiro;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import cn.hutool.core.util.ObjectUtil;
import com.tjaide.nursery.barrier.common.shiro.config.SessionConfigurationProperties;
import com.tjaide.nursery.barrier.common.shiro.config.ShiroConfigurationProperties;
import com.tjaide.nursery.barrier.common.shiro.config.ShiroProxySecurityLogic;
import com.tjaide.nursery.barrier.common.shiro.filter.CasProxyCallbackFilter;
import com.tjaide.nursery.barrier.common.shiro.filter.ShiroCasCallbackFilter;
import com.tjaide.nursery.barrier.common.shiro.listener.ShiroSessionListener;
import com.tjaide.nursery.barrier.common.shiro.realm.CasRealm;
import com.tjaide.nursery.barrier.common.shiro.realm.DbRealm;
import io.buji.pac4j.filter.LogoutFilter;
import io.buji.pac4j.subject.Pac4jSubjectFactory;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.apache.shiro.authc.AbstractAuthenticator;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authc.pam.AtLeastOneSuccessfulStrategy;
import org.apache.shiro.authc.pam.ModularRealmAuthenticator;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.SessionListener;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.session.mgt.eis.MemorySessionDAO;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.jasig.cas.client.session.SingleSignOutFilter;
import org.pac4j.cas.config.CasConfiguration;
import org.pac4j.cas.store.ProxyGrantingTicketStore;
import org.pac4j.core.config.Config;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.Ordered;
import org.springframework.web.filter.DelegatingFilterProxy;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import java.net.URLEncoder;
import java.util.*;

/**
 * Shiro控制属性注入

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-11:34

 **/
@Configuration
@AllArgsConstructor
public class ShiroAutoConfiguration {


    private ShiroConfigurationProperties shiroConfigurationProperties;

    private SessionConfigurationProperties sessionConfigurationProperties;

    /**
     * Method 凭证验证管理
     *
     * @return HashedCredentialsMatcher
     */
    @Bean
    public HashedCredentialsMatcher hashedCredentialsMatcher() {
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        hashedCredentialsMatcher.setHashAlgorithmName("MD5");
        hashedCredentialsMatcher.setHashIterations(2);
        return hashedCredentialsMatcher;
    }

    @Bean
    public DbRealm dbRealm() {
        DbRealm dbRealm = new DbRealm();
        dbRealm.setCredentialsMatcher(hashedCredentialsMatcher());
        return dbRealm;
    }

    @Bean
    public CasRealm casRealm() {
        CasRealm realm = new CasRealm();
        // 使用自定义的realm
        realm.setClientName(shiroConfigurationProperties.getCas().getClientName());
        realm.setCachingEnabled(false);
        // 暂时不使用缓存
        realm.setAuthenticationCachingEnabled(false);
        realm.setAuthorizationCachingEnabled(false);
        return realm;
    }

    @Bean("securityManager")
    public SecurityManager securityManager(Pac4jSubjectFactory subjectFactory, AbstractAuthenticator abstractAuthenticator, SessionManager sessionManager) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        if (shiroConfigurationProperties.getCas().isEnabled()) {
            securityManager.setSubjectFactory(subjectFactory);
        }
        securityManager.setSessionManager(sessionManager);
        securityManager.setAuthenticator(abstractAuthenticator);
        return securityManager;
    }

    /**
     * 认证器
     */
    @Bean
    public AbstractAuthenticator abstractAuthenticator() {
        ModularRealmAuthenticator authenticator = new ModularRealmAuthenticator();
        authenticator.setAuthenticationStrategy(new AtLeastOneSuccessfulStrategy());
        List<Realm> realms = new ArrayList<Realm>();
        if (shiroConfigurationProperties.getCas().isEnabled()) {
            realms.add(casRealm());
        }
        realms.add(dbRealm());
        authenticator.setRealms(realms);
        return authenticator;
    }

    @Bean("shiroFilter")
    @SneakyThrows
    public ShiroFilterFactoryBean factory(@Qualifier("securityManager") SecurityManager securityManager,
                                          Config config, CasConfiguration casConfig) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        shiroFilterFactoryBean.setLoginUrl(shiroConfigurationProperties.getLoginUrl());
        shiroFilterFactoryBean.setSuccessUrl(shiroConfigurationProperties.getSuccessUrl());
        shiroFilterFactoryBean.setUnauthorizedUrl(shiroConfigurationProperties.getUnauthorizedUrl());

        Map<String, String> filterChainDefinitionMap = new LinkedHashMap<>();
        Map<String, Filter> filters = new HashMap<>();

        shiroConfigurationProperties.getAnon()
                .forEach(anon -> filterChainDefinitionMap.put(anon, "anon"));
        if (shiroConfigurationProperties.getCas().isEnabled()) {

            CasProxyCallbackFilter securityFilter = new CasProxyCallbackFilter();
            securityFilter.setConfig(config);
            securityFilter.setClients(shiroConfigurationProperties.getCas().getClientName() + ",Proxy_" + shiroConfigurationProperties.getCas().getClientName());
            securityFilter.setSecurityLogic(new ShiroProxySecurityLogic<>(casConfig));
            securityFilter.setProxyGrantingTicketStorage(new ProxyGrantingTicketStore(casConfig.getProxyReceptor().getStore()));
            securityFilter.setProxyCallbackUrl("/proxy/callback");
            filters.put("securityFilter", securityFilter);

//            SecurityFilter securityFilter = new SecurityFilter();
//            securityFilter.setConfig(config);
//            securityFilter.setClients(shiroConfigurationProperties.getCas().getClientName());
//            filters.put("securityFilter", securityFilter);

            // 注销 拦截器
            LogoutFilter logoutFilter = new LogoutFilter();
            logoutFilter.setConfig(config);
            logoutFilter.setCentralLogout(true);
            logoutFilter.setLocalLogout(true);
            logoutFilter.setDefaultUrl(shiroConfigurationProperties.getCas().getProjectUrl()
                    + "/callback?client_name=" + shiroConfigurationProperties.getCas().getClientName());
            filters.put("logout", logoutFilter);

            //cas 认证后回调拦截器
            ShiroCasCallbackFilter callbackFilter = new ShiroCasCallbackFilter();
            callbackFilter.setConfig(config);
            callbackFilter.setDefaultUrl(shiroConfigurationProperties.getCas().getProjectUrl());
            filters.put("callbackFilter", callbackFilter);

            shiroFilterFactoryBean.setLoginUrl(shiroConfigurationProperties.getCas().getServerUrl()
                    + "?service=" + URLEncoder.encode(shiroConfigurationProperties.getCas().getProjectUrl(), "UTF-8")
                    + "/callback?client_name=" + shiroConfigurationProperties.getCas().getClientName());


            // 退出
            filterChainDefinitionMap.put("/login/logout", "logout");
            // cas登录成功
            filterChainDefinitionMap.put("/callback", "callbackFilter");

            shiroConfigurationProperties.getAuthc()
                    .forEach(authc -> filterChainDefinitionMap.put(authc, "securityFilter"));
        } else {
            shiroConfigurationProperties.getAuthc()
                    .forEach(authc -> filterChainDefinitionMap.put(authc, "authc"));
        }

        shiroFilterFactoryBean.setFilters(filters);
        if (ObjectUtil.isNotEmpty(shiroConfigurationProperties.getOther())) {
            filterChainDefinitionMap.putAll(shiroConfigurationProperties.getOther());
        }


        shiroConfigurationProperties.getUser()
                .forEach(user -> filterChainDefinitionMap.put(user, "user"));

        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
        return shiroFilterFactoryBean;
    }


    @Bean
    public SessionDAO sessionDAO() {
        return new MemorySessionDAO();
    }

    @Bean
    public SimpleCookie sessionIdCookie() {
        //这个参数是cookie的名称
        SimpleCookie simpleCookie = new SimpleCookie("cacx");
        //setcookie的httponly属性如果设为true的话，会增加对xss防护的安全系数。它有以下特点：
        //  setcookie()的第七个参数
        //  设为true后，只能通过http访问，javascript无法访问
        //  防止xss读取cookie
        simpleCookie.setHttpOnly(true);
        simpleCookie.setPath("/");
        //maxAge=-1表示浏览器关闭时失效此Cookie
        simpleCookie.setMaxAge(-1);
        return simpleCookie;
    }

    @Bean
    public DefaultWebSessionManager sessionManager(SimpleCookie sessionIdCookie, SessionDAO sessionDAO) {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        Collection<SessionListener> listeners = new ArrayList<>();
        //配置监听
        listeners.add(new ShiroSessionListener(sessionConfigurationProperties));
        sessionManager.setSessionListeners(listeners);
        sessionManager.setSessionDAO(sessionDAO());
        sessionManager.setSessionIdCookie(sessionIdCookie());
        sessionManager.setSessionIdCookieEnabled(true);
        //全局会话超时时间（单位毫秒），默认30分钟  可以设置为10秒钟 用来测试,这里设置的是1天
        sessionManager.setGlobalSessionTimeout(86400000);
        //是否开启删除无效的session对象  默认为true
        sessionManager.setDeleteInvalidSessions(true);
        //是否开启定时调度器进行检测过期session 默认为true
        sessionManager.setSessionValidationSchedulerEnabled(true);
        //设置session失效的扫描时间, 清理用户直接关闭浏览器造成的孤立会话 默认为 1个小时
        //设置该属性 就不需要设置 ExecutorServiceSessionValidationScheduler 底层也是默认自动调用ExecutorServiceSessionValidationScheduler
        //可以设置为 5秒 用来测试，这里设置的是1天
        sessionManager.setSessionValidationInterval(86400000);
        return sessionManager;
    }

    @Bean
    @DependsOn("lifecycleBeanPostProcessor")
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
        return defaultAdvisorAutoProxyCreator;
    }

    @Bean
    public static LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
        advisor.setSecurityManager(securityManager);
        return advisor;
    }

    //用于thymeleaf模板使用shiro标签
    @Bean
    public ShiroDialect shiroDialect() {
        return new ShiroDialect();
    }


    /**
     * 使用 pac4j 的 subjectFactory
     */
    @Bean
    public Pac4jSubjectFactory subjectFactory() {
        return new Pac4jSubjectFactory();
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
        filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter"));
        //  该值缺省为false,表示生命周期由SpringApplicationContext管理,设置为true则表示由ServletContainer管理
        filterRegistration.addInitParameter("targetFilterLifecycle", "true");
        filterRegistration.setEnabled(true);
        filterRegistration.addUrlPatterns("/*");
        filterRegistration.setDispatcherTypes(DispatcherType.REQUEST, DispatcherType.FORWARD);
        return filterRegistration;
    }

    /*
     @Bean
    public FilterRegistrationBean singleSignOutFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setName("singleSignOutFilter");
        SingleSignOutFilter singleSignOutFilter = new SingleSignOutFilter();
        singleSignOutFilter.setCasServerUrlPrefix(shiroConfigurationProperties.getCas().getServerUrl());
        singleSignOutFilter.setIgnoreInitConfiguration(true);
        bean.setFilter(singleSignOutFilter);
        bean.addUrlPatterns("/*");
        bean.setEnabled(true);
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }*/
}
