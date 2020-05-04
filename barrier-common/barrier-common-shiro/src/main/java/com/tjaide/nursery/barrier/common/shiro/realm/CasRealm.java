package com.tjaide.nursery.barrier.common.shiro.realm;

import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.shiro.service.UserDetailsService;
import io.buji.pac4j.realm.Pac4jRealm;
import io.buji.pac4j.subject.Pac4jPrincipal;
import io.buji.pac4j.token.Pac4jToken;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.jasig.cas.client.authentication.AttributePrincipal;
import org.jasig.cas.client.authentication.AttributePrincipalImpl;
import org.pac4j.cas.profile.CasProxyProfile;
import org.pac4j.core.profile.CommonProfile;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Field;
import java.util.List;

/**
 * CAS认证域

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-23:57

 **/
public class CasRealm extends Pac4jRealm {


    private static Logger logger = LogManager.getLogger(CasRealm.class);

    private String clientName;

    @Autowired
    private UserDetailsService userDetailsService;


    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    /**
     * 认证
     *
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        final Pac4jToken pac4jToken = (Pac4jToken) authenticationToken;
        final List<CommonProfile> commonProfileList = pac4jToken.getProfiles();
        final CommonProfile commonProfile = commonProfileList.get(0);
        logger.info("单点登录返回的信息" + commonProfile.toString());
        final Pac4jPrincipal principal = new Pac4jPrincipal(commonProfileList, getPrincipalNameAttribute());
        ShiroUser shiroUser = userDetailsService.loadUser(commonProfile.getId());
        if (commonProfile instanceof CasProxyProfile) {
            CasProxyProfile cpp = (CasProxyProfile) commonProfile;
            try {
                Field f = cpp.getClass().getDeclaredField("attributePrincipal");
                f.setAccessible(true);
                AttributePrincipalImpl attributePrincipal = (AttributePrincipalImpl) f.get(cpp);
                Field f1 = attributePrincipal.getClass().getDeclaredField("proxyGrantingTicket");
                f1.setAccessible(true);
                System.out.println("attributePrincipal：=======================" + f1.get(attributePrincipal));
                shiroUser.setPrincipal((AttributePrincipal) f.get(cpp));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        final PrincipalCollection principalCollection = new SimplePrincipalCollection(shiroUser, getName());
        return new SimpleAuthenticationInfo(principalCollection, commonProfileList.hashCode());
    }

    /**
     * 授权/验权
     *
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo authInfo = new SimpleAuthorizationInfo();
        authInfo.addStringPermission("user");
        return authInfo;
    }
}