package com.tjaide.nursery.barrier.common.shiro.config;

import io.buji.pac4j.profile.ShiroProfileManager;
import org.pac4j.cas.config.CasConfiguration;
import org.pac4j.core.authorization.checker.AuthorizationChecker;
import org.pac4j.core.authorization.checker.DefaultAuthorizationChecker;
import org.pac4j.core.client.*;
import org.pac4j.core.client.finder.ClientFinder;
import org.pac4j.core.client.finder.DefaultSecurityClientFinder;
import org.pac4j.core.config.Config;
import org.pac4j.core.context.Pac4jConstants;
import org.pac4j.core.context.WebContext;
import org.pac4j.core.context.session.SessionStore;
import org.pac4j.core.credentials.Credentials;
import org.pac4j.core.engine.AbstractExceptionAwareLogic;
import org.pac4j.core.engine.SecurityGrantedAccessAdapter;
import org.pac4j.core.engine.SecurityLogic;
import org.pac4j.core.engine.decision.DefaultProfileStorageDecision;
import org.pac4j.core.engine.decision.ProfileStorageDecision;
import org.pac4j.core.exception.HttpAction;
import org.pac4j.core.http.adapter.HttpActionAdapter;
import org.pac4j.core.http.ajax.AjaxRequestResolver;
import org.pac4j.core.http.ajax.DefaultAjaxRequestResolver;
import org.pac4j.core.matching.MatchingChecker;
import org.pac4j.core.matching.RequireAllMatchersChecker;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.core.profile.ProfileManager;

import java.util.Arrays;
import java.util.List;

import static org.pac4j.core.util.CommonHelper.*;

public class ShiroProxySecurityLogic<R, C extends WebContext> extends AbstractExceptionAwareLogic<R, C> implements SecurityLogic<R, C> {
    private ClientFinder clientFinder = new DefaultSecurityClientFinder();

    private AuthorizationChecker authorizationChecker = new DefaultAuthorizationChecker();

    private MatchingChecker matchingChecker = new RequireAllMatchersChecker();

    private ProfileStorageDecision profileStorageDecision = new DefaultProfileStorageDecision();

    private AjaxRequestResolver ajaxRequestResolver = new DefaultAjaxRequestResolver();
    private CasConfiguration casConfig;

    public ShiroProxySecurityLogic() {
        super();
        this.setProfileManagerFactory(ShiroProfileManager::new);
    }

    public ShiroProxySecurityLogic(CasConfiguration casConfig) {
        super();
        this.casConfig = casConfig;
        this.setProfileManagerFactory(ShiroProfileManager::new);
    }

    protected HttpAction redirectToOriginallyRequestedUrl(final C context, final String defaultUrl) {
        final String requestedUrl = (String) context.getSessionStore().get(context, Pac4jConstants.REQUESTED_URL);
        String redirectUrl = defaultUrl;
        if (isNotBlank(requestedUrl)) {
            context.getSessionStore().set(context, Pac4jConstants.REQUESTED_URL, null);
            redirectUrl = requestedUrl;
        }
        logger.debug("redirectUrl: {}", redirectUrl);
        return HttpAction.redirect(context, redirectUrl);
    }

    protected void renewSession(final C context, final Config config) {
        final SessionStore<C> sessionStore = context.getSessionStore();
        if (sessionStore != null) {
            final String oldSessionId = sessionStore.getOrCreateSessionId(context);
            final boolean renewed = sessionStore.renewSession(context);
            if (renewed) {
                final String newSessionId = sessionStore.getOrCreateSessionId(context);
                logger.debug("Renewing session: {} -> {}", oldSessionId, newSessionId);
                final Clients clients = config.getClients();
                if (clients != null) {
                    final List<Client> clientList = clients.getClients();
                    for (final Client client : clientList) {
                        final BaseClient baseClient = (BaseClient) client;
                        baseClient.notifySessionRenewal(oldSessionId, context);
                    }
                }
            } else {
                logger.error("Unable to renew the session. The session store may not support this feature");
            }
        } else {
            logger.error("No session store available for this web context");
        }
    }

    @Override
    public R perform(final C context, final Config config, final SecurityGrantedAccessAdapter<R, C> securityGrantedAccessAdapter, final HttpActionAdapter<R, C> httpActionAdapter,
                     final String clients, final String authorizers, final String matchers, final Boolean inputMultiProfile, final Object... parameters) {

        logger.debug("=== SECURITY ===" + clients);

        HttpAction action;
        try {

            // default value
            final boolean multiProfile;
            if (inputMultiProfile == null) {
                multiProfile = false;
            } else {
                multiProfile = inputMultiProfile;
            }

            // checks
            assertNotNull("context", context);
            assertNotNull("config", config);
            assertNotNull("httpActionAdapter", httpActionAdapter);
            assertNotNull("clientFinder", clientFinder);
            assertNotNull("authorizationChecker", authorizationChecker);
            assertNotNull("matchingChecker", matchingChecker);
            assertNotNull("profileStorageDecision", profileStorageDecision);
            final Clients configClients = config.getClients();
            assertNotNull("configClients", configClients);

            // logic
            logger.debug("url: {}", context.getFullRequestURL());
            logger.debug("matchers: {}", matchers);
            String ticket = context.getRequestParameter(CasConfiguration.TICKET_PARAMETER);
            String clientName = clients;
            boolean isProxy = false;
            if (ticket != null && ticket.startsWith("PT-")) {
                isProxy = true;
            }
            if (matchingChecker.matches(context, matchers, config.getMatchers())) {
                logger.debug("clients: {}", clientName);
                final List<Client> currentClients = clientFinder.find(configClients, context, clientName);
                logger.debug("currentClients: {}", currentClients);
                final boolean loadProfilesFromSession = profileStorageDecision.mustLoadProfilesFromSession(context, currentClients);
                logger.debug("loadProfilesFromSession: {}", loadProfilesFromSession);
                final ProfileManager manager = getProfileManager(context, config);
                List<CommonProfile> profiles = manager.getAll(loadProfilesFromSession);
                // no profile and some current clients

//				if (isProxy) {
//					DirectCasProxyClient dc = new DirectCasProxyClient();
//					dc.setConfiguration(casConfig);
//					String url = context.getFullRequestURL();
//					int ix = url.indexOf("?");
//					if (ix != -1) {
//						dc.setServiceUrl(context.getFullRequestURL().substring(0, ix));
//					} else {
//						dc.setServiceUrl(context.getFullRequestURL());
//					}
//					TokenCredentials credentials = dc.getCredentials(context);
//					logger.debug("credentials: {}", credentials);
//					final CommonProfile profile = dc.getUserProfile(credentials, context);
//					logger.debug("profile: {}", profile);
//					boolean updated = false;
//					if (profile != null) {
//						final boolean saveProfileInSession = profileStorageDecision.mustSaveProfileInSession(context, currentClients, (DirectClient) dc, profile);
//						logger.debug("saveProfileInSession: {} / multiProfile: {}", saveProfileInSession, multiProfile);
//						manager.save(saveProfileInSession, profile, multiProfile);
//						updated = true;
//					}
//					profiles = manager.getAll(loadProfilesFromSession);
//
//				} else 
                if (isEmpty(profiles) && isNotEmpty(currentClients)) {
                    boolean updated = false;
                    // loop on all clients searching direct ones to perform authentication
                    for (final Client currentClient : currentClients) {
                        if (currentClient instanceof DirectClient) {
                            logger.debug("Performing authentication for direct client: {}", currentClient);
                            DirectClient dc = (DirectClient) currentClient;
                            final Credentials credentials = currentClient.getCredentials(context);
                            logger.debug("credentials: {}", credentials);
                            final CommonProfile profile = currentClient.getUserProfile(credentials, context);
                            logger.debug("profile: {}", profile);
                            if (profile != null) {
                                final boolean saveProfileInSession = profileStorageDecision.mustSaveProfileInSession(context, currentClients, (DirectClient) currentClient,
                                        profile);
                                logger.debug("saveProfileInSession: {} / multiProfile: {}", saveProfileInSession, multiProfile);
                                manager.save(saveProfileInSession, profile, multiProfile);
                                updated = true;
                                if (!multiProfile) {
                                    break;
                                }
                            }
                        }
                    }
                    if (updated) {
                        profiles = manager.getAll(loadProfilesFromSession);
                        logger.debug("new profiles: {}", profiles);
                    }
                }

                // we have profile(s) -> check authorizations
                if (isNotEmpty(profiles)) {
                    logger.debug("authorizers: {}", authorizers);
                    if (authorizationChecker.isAuthorized(context, profiles, authorizers, config.getAuthorizers())) {
                        logger.debug("authenticated and authorized -> grant access");
                        return securityGrantedAccessAdapter.adapt(context, profiles, parameters);
                    } else {
                        logger.debug("forbidden");
                        action = forbidden(context, currentClients, profiles, authorizers);
                    }
                } else {
                    if (startAuthentication(context, currentClients)) {
                        logger.debug("Starting authentication");
                        saveRequestedUrl(context, currentClients);
                        action = redirectToIdentityProvider(context, currentClients);
                    } else {
                        logger.debug("unauthorized");
                        action = unauthorized(context, currentClients);
                    }
                }

            } else {

                logger.debug("no matching for this request -> grant access");
                return securityGrantedAccessAdapter.adapt(context, Arrays.asList(), parameters);
            }

        } catch (final Exception e) {
            return handleException(e, httpActionAdapter, context);
        }

        return httpActionAdapter.adapt(action.getCode(), context);
    }

    /**
     * Return a forbidden error.
     *
     * @param context        the web context
     * @param currentClients the current clients
     * @param profiles       the current profiles
     * @param authorizers    the authorizers
     * @return a forbidden error
     */
    protected HttpAction forbidden(final C context, final List<Client> currentClients, final List<CommonProfile> profiles, final String authorizers) {
        return HttpAction.forbidden(context);
    }

    /**
     * Return whether we must start a login process if the first client is an
     * indirect one.
     *
     * @param context        the web context
     * @param currentClients the current clients
     * @return whether we must start a login process
     */
    protected boolean startAuthentication(final C context, final List<Client> currentClients) {
        return isNotEmpty(currentClients) && currentClients.get(0) instanceof IndirectClient;
    }

    /**
     * Save the requested url.
     *
     * @param context        the web context
     * @param currentClients the current clients
     */
    protected void saveRequestedUrl(final C context, final List<Client> currentClients) {
        if (ajaxRequestResolver == null || !ajaxRequestResolver.isAjax(context)) {
            final String requestedUrl = context.getFullRequestURL();
            logger.debug("requestedUrl: {}", requestedUrl);
            context.getSessionStore().set(context, Pac4jConstants.REQUESTED_URL, requestedUrl);
        }
    }

    /**
     * Perform a redirection to start the login process of the first indirect
     * client.
     *
     * @param context        the web context
     * @param currentClients the current clients
     * @return the performed redirection
     */
    protected HttpAction redirectToIdentityProvider(final C context, final List<Client> currentClients) {
        final IndirectClient currentClient = (IndirectClient) currentClients.get(0);
        return currentClient.redirect(context);
    }

    /**
     * Return an unauthorized error.
     *
     * @param context        the web context
     * @param currentClients the current clients
     * @return an unauthorized error
     */
    protected HttpAction unauthorized(final C context, final List<Client> currentClients) {
        return HttpAction.unauthorized(context);
    }

    public ClientFinder getClientFinder() {
        return clientFinder;
    }

    public void setClientFinder(final ClientFinder clientFinder) {
        this.clientFinder = clientFinder;
    }

    public AuthorizationChecker getAuthorizationChecker() {
        return authorizationChecker;
    }

    public void setAuthorizationChecker(final AuthorizationChecker authorizationChecker) {
        this.authorizationChecker = authorizationChecker;
    }

    public MatchingChecker getMatchingChecker() {
        return matchingChecker;
    }

    public void setMatchingChecker(final MatchingChecker matchingChecker) {
        this.matchingChecker = matchingChecker;
    }

    public ProfileStorageDecision getProfileStorageDecision() {
        return profileStorageDecision;
    }

    public void setProfileStorageDecision(final ProfileStorageDecision profileStorageDecision) {
        this.profileStorageDecision = profileStorageDecision;
    }

    public AjaxRequestResolver getAjaxRequestResolver() {
        return ajaxRequestResolver;
    }

    public void setAjaxRequestResolver(final AjaxRequestResolver ajaxRequestResolver) {
        this.ajaxRequestResolver = ajaxRequestResolver;
    }

    @Override
    public String toString() {
        return toNiceString(this.getClass(), "clientFinder", this.clientFinder, "authorizationChecker", this.authorizationChecker, "matchingChecker", this.matchingChecker,
                "profileStorageDecision", this.profileStorageDecision, "errorUrl", getErrorUrl(), "ajaxRequestResolver", this.ajaxRequestResolver);
    }
}