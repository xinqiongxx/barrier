package com.tjaide.nursery.barrier.common.shiro;

import com.tjaide.nursery.barrier.common.shiro.config.CasCallbackUrlResolver;
import com.tjaide.nursery.barrier.common.shiro.config.ShiroConfigurationProperties;
import com.tjaide.nursery.barrier.common.shiro.util.ShiroCasClient;
import io.buji.pac4j.context.ShiroSessionStore;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.pac4j.cas.client.CasProxyReceptor;
import org.pac4j.cas.client.direct.DirectCasProxyClient;
import org.pac4j.cas.config.CasConfiguration;
import org.pac4j.cas.config.CasProtocol;
import org.pac4j.core.client.Clients;
import org.pac4j.core.config.Config;
import org.pac4j.core.http.url.DefaultUrlResolver;
import org.pac4j.core.logout.handler.DefaultLogoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Pac4jConfig

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年08月04日-09:36

 **/
@Slf4j
@Configuration
@AllArgsConstructor
public class Pac4jAutoConfiguration {

    private ShiroConfigurationProperties shiroConfigurationProperties;

    /**
     * pac4j配置
     *
     * @param casClient
     * @param shiroSessionStore
     * @return
     */
    @Bean("authcConfig")
    public Config config(Clients clients, ShiroSessionStore shiroSessionStore) {

        System.out.println("123123");

        Config config = new Config(clients);
        config.setSessionStore(shiroSessionStore);
        return config;
    }

    /**
     * 自定义存储
     *
     * @return
     */
    @Bean
    public ShiroSessionStore shiroSessionStore() {
        return new ShiroSessionStore();
    }

    /**
     * cas 客户端配置
     *
     * @param casConfig
     * @return
     */
    @Bean
    public Clients casClient(CasConfiguration casConfig) {
        ShiroCasClient casClient = new ShiroCasClient(casConfig);
        //客户端回调地址
        casClient.setCallbackUrl(shiroConfigurationProperties.getCas().getProjectUrl()
                + "/callback?client_name=" + shiroConfigurationProperties.getCas().getClientName());
        casClient.setName(shiroConfigurationProperties.getCas().getClientName());


        DirectCasProxyClient client = new DirectCasProxyClient();
        client.setConfiguration(casConfig);
        client.setName("Proxy_" + shiroConfigurationProperties.getCas().getClientName());
        client.setServiceUrl(shiroConfigurationProperties.getCas().getProjectUrl() + "/proxy/callback?client_name=" + "Proxy_" + shiroConfigurationProperties.getCas().getClientName());
        Clients clients = new Clients(casClient, client);
        return clients;
    }

    @Bean
    public CasProxyReceptor casProxyReceptor() {
        //TODO
        CasProxyReceptor receptor = new CasProxyReceptor();
        receptor.setUrlResolver(new DefaultUrlResolver(true));
        receptor.setCallbackUrlResolver(new CasCallbackUrlResolver());
        receptor.setCallbackUrl("/proxy/callback");
        receptor.setName("Proxy_" + shiroConfigurationProperties.getCas().getClientName());
        return receptor;
    }

    /**
     * 请求cas服务端配置
     */
    @Bean
    public CasConfiguration casConfig(CasProxyReceptor casProxyReceptor) {
        final CasConfiguration configuration = new CasConfiguration();
        //CAS server登录地址
        configuration.setLoginUrl(shiroConfigurationProperties.getCas().getServerUrl() + "/login");
        //CAS 版本，默认为 CAS30，我们使用的是 CAS20
        configuration.setProtocol(CasProtocol.CAS20_PROXY);
        configuration.setAcceptAnyProxy(true);
        // 一定需要 / 结尾
        configuration.setPrefixUrl(shiroConfigurationProperties.getCas().getServerUrl() + "/");

        // 被代理端
        configuration.setAcceptAnyProxy(true);
//		configuration.setRenew(true);
        if (casProxyReceptor != null) {
            // 代理端
            configuration.setProxyReceptor(casProxyReceptor);
        }
        DefaultLogoutHandler defaultLogoutHandler = new DefaultLogoutHandler<>();
        defaultLogoutHandler.setDestroySession(true);
        configuration.setLogoutHandler(defaultLogoutHandler);
        return configuration;
    }

}
