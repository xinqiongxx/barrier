package com.tjaide.nursery.barrier.common.shiro.filter;

import io.buji.pac4j.context.ShiroSessionStore;
import io.buji.pac4j.engine.ShiroSecurityLogic;
import org.jasig.cas.client.proxy.ProxyGrantingTicketStorage;
import org.jasig.cas.client.util.CommonUtils;
import org.pac4j.core.config.Config;
import org.pac4j.core.context.J2EContext;
import org.pac4j.core.context.session.SessionStore;
import org.pac4j.core.engine.SecurityLogic;
import org.pac4j.core.http.adapter.J2ENopHttpActionAdapter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.pac4j.core.util.CommonHelper.assertNotNull;

public class CasProxyCallbackFilter implements Filter {

    private ProxyGrantingTicketStorage proxyGrantingTicketStorage = null;

    public ProxyGrantingTicketStorage getProxyGrantingTicketStorage() {
        return proxyGrantingTicketStorage;
    }

    public void setProxyGrantingTicketStorage(ProxyGrantingTicketStorage proxyGrantingTicketStorage) {
        this.proxyGrantingTicketStorage = proxyGrantingTicketStorage;
    }

    private SecurityLogic<Object, J2EContext> securityLogic;

    private Config config;

    private String clients;

    private String authorizers;

    private String matchers;
    private String proxyCallbackUrl;
    private Boolean multiProfile;

    public CasProxyCallbackFilter() {
        securityLogic = new ShiroSecurityLogic<>();
    }

    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(final ServletRequest servletRequest, final ServletResponse servletResponse, final FilterChain filterChain) throws IOException, ServletException {

        assertNotNull("securityLogic", securityLogic);
        assertNotNull("config", config);

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        if (request.getServletPath().startsWith(proxyCallbackUrl)) {
            CommonUtils.readAndRespondToProxyReceptorRequest((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, proxyGrantingTicketStorage);
        }

        final SessionStore<J2EContext> sessionStore = config.getSessionStore();
        final J2EContext context = new J2EContext(request, response, sessionStore != null ? sessionStore : ShiroSessionStore.INSTANCE);

        securityLogic.perform(context, config, (ctx, profiles, parameters) -> {

            filterChain.doFilter(request, response);
            return null;

        }, J2ENopHttpActionAdapter.INSTANCE, clients, authorizers, matchers, multiProfile);
    }

    @Override
    public void destroy() {
    }

    public SecurityLogic<Object, J2EContext> getSecurityLogic() {
        return securityLogic;
    }

    public void setSecurityLogic(final SecurityLogic<Object, J2EContext> securityLogic) {
        this.securityLogic = securityLogic;
    }

    public Config getConfig() {
        return config;
    }

    public void setConfig(final Config config) {
        this.config = config;
    }

    public String getClients() {
        return clients;
    }

    public void setClients(final String clients) {
        this.clients = clients;
    }

    public String getAuthorizers() {
        return authorizers;
    }

    public void setAuthorizers(final String authorizers) {
        this.authorizers = authorizers;
    }

    public String getMatchers() {
        return matchers;
    }

    public void setMatchers(final String matchers) {
        this.matchers = matchers;
    }

    public Boolean getMultiProfile() {
        return multiProfile;
    }

    public void setMultiProfile(final Boolean multiProfile) {
        this.multiProfile = multiProfile;
    }

    public String getProxyCallbackUrl() {
        return proxyCallbackUrl;
    }

    public void setProxyCallbackUrl(String proxyCallbackUrl) {
        this.proxyCallbackUrl = proxyCallbackUrl;
    }

}
