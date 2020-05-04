package com.tjaide.nursery.barrier.common.shiro.config;

import org.pac4j.core.context.WebContext;
import org.pac4j.core.http.callback.CallbackUrlResolver;
import org.pac4j.core.http.url.UrlResolver;
import org.pac4j.core.util.CommonHelper;

public class CasCallbackUrlResolver implements CallbackUrlResolver {

    @Override
    public String compute(final UrlResolver urlResolver, final String url, final String clientName, final WebContext context) {
        String newUrl = urlResolver.compute(url, context);
        if (newUrl != null) {
            if (!newUrl.endsWith("/")) {
                newUrl += "/";
            }
            // newUrl += clientName;
        }
        return newUrl;
    }

    @Override
    public boolean matches(final String clientName, final WebContext context) {
        final String path = context.getPath();
        if (path != null) {
            final int pos = path.lastIndexOf("/");
            final String name;
            if (pos >= 0) {
                name = path.substring(pos + 1);
            } else {
                name = path;
            }
            return CommonHelper.areEqualsIgnoreCaseAndTrim(name, clientName);
        }
        return false;
    }
}
