package com.tjaide.nursery.barrier.common.shiro.handler;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.context.session.SessionStore;
import org.pac4j.core.logout.handler.LogoutHandler;
import org.pac4j.core.profile.ProfileManager;
import org.pac4j.core.util.CommonHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 退出Handler
 * <pre>
 * 构建组：certification
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年04月22日-19:02

 * </pre>
 **/
public class ShiroCasLogoutHandler<C extends WebContext> implements LogoutHandler<C> {
    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    private Cache<String, Object> store;
    private boolean destroySession;

    public ShiroCasLogoutHandler(EhCacheManager ehCacheManager) {
        this.store = ehCacheManager.getCache("cas-session");
    }

    @SuppressWarnings("unchecked")
    public void recordSession(C context, String key) {
        SessionStore sessionStore = context.getSessionStore();
        if (sessionStore == null) {
            this.logger.error("No session store available for this web context");
        } else {
            String sessionId = sessionStore.getOrCreateSessionId(context);
            Object trackableSession = sessionStore.getTrackableSession(context);
            if (trackableSession != null) {
                this.logger.debug("key: {} -> trackableSession: {}", key, trackableSession);
                this.logger.debug("sessionId: {}", sessionId);
                this.store.put(key, trackableSession);
                this.store.put(sessionId, key);
            } else {
                this.logger.debug("No trackable session for the current session store: {}", sessionStore);
            }
        }

    }

    @SuppressWarnings("unchecked")
    public void destroySessionFront(C context, String key) {
        this.store.remove(key);
        SessionStore sessionStore = context.getSessionStore();
        if (sessionStore == null) {
            this.logger.error("No session store available for this web context");
        } else {
            String currentSessionId = sessionStore.getOrCreateSessionId(context);
            this.logger.debug("currentSessionId: {}", currentSessionId);
            String sessionToKey = (String) this.store.get(currentSessionId);
            this.logger.debug("-> key: {}", key);
            this.store.remove(currentSessionId);
            this.store.remove(currentSessionId + "_token");
            if (CommonHelper.areEquals(key, sessionToKey)) {
                this.destroy(context, sessionStore, "front");
            } else {
                this.logger.error("The user profiles (and session) can not be destroyed for the front channel logout because the provided key is not the same as the one linked to the current session");
            }
        }

    }

    @SuppressWarnings("unchecked")
    protected void destroy(C context, SessionStore sessionStore, String channel) {
        ProfileManager manager = new ProfileManager(context, sessionStore);
        manager.logout();
        this.logger.debug("destroy the user profiles");
        if (this.destroySession) {
            this.logger.debug("destroy the whole session");
            boolean invalidated = sessionStore.destroySession(context);
            if (!invalidated) {
                this.logger.error("The session has not been invalidated for {} channel logout", channel);
            }
        }

    }

    @SuppressWarnings("unchecked")
    public void destroySessionBack(C context, String key) {
        Object trackableSession = this.store.get(key);
        this.logger.debug("key: {} -> trackableSession: {}", key, trackableSession);
        if (trackableSession == null) {
            this.logger.error("No trackable session found for back channel logout. Either the session store does not support to track session or it has expired from the store and the store settings must be updated (expired data)");
        } else {
            this.store.remove(key);
            SessionStore sessionStore = context.getSessionStore();
            if (sessionStore == null) {
                this.logger.error("No session store available for this web context");
            } else {
                SessionStore<C> newSessionStore = sessionStore.buildFromTrackableSession(context, trackableSession);
                if (newSessionStore != null) {
                    this.logger.debug("newSesionStore: {}", newSessionStore);
                    String sessionId = newSessionStore.getOrCreateSessionId(context);
                    this.logger.debug("remove sessionId: {}", sessionId);
                    this.store.remove(sessionId);
                    this.destroy(context, newSessionStore, "back");
                } else {
                    this.logger.error("The session store should be able to build a new session store from the tracked session");
                }
            }
        }

    }

    public void renewSession(String oldSessionId, C context) {
        String key = (String) this.store.get(oldSessionId);
        this.logger.debug("oldSessionId: {} -> key: {}", oldSessionId, key);
        if (key != null) {
            this.store.remove(key);
            this.store.remove(oldSessionId);
            this.recordSession(context, key);
        }

    }

    public Cache<String, Object> getStore() {
        return this.store;
    }

    public void setStore(Cache<String, Object> store) {
        this.store = store;
    }

    public boolean isDestroySession() {
        return this.destroySession;
    }

    public void setDestroySession(boolean destroySession) {
        this.destroySession = destroySession;
    }

    public String toString() {
        return CommonHelper.toNiceString(this.getClass(), "store", this.store, "destroySession", this.destroySession);
    }
}