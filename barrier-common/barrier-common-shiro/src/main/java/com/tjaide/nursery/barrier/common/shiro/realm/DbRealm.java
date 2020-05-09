/**
 * Copyright (C), 2018-2019, 天津市爱德科技发展有限公司
 * FileName: DbRealm
 * Author:   Administrator
 * Date:     2019/3/24 16:18
 * Description: 用户信息
 * History:
 * Administrator        2019/3/24 16:18         1.0              <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.tjaide.nursery.barrier.common.shiro.realm;


import cn.hutool.core.util.ObjectUtil;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.shiro.service.UserDetailsService;
import com.tjaide.nursery.barrier.common.shiro.util.LoginException;
import lombok.SneakyThrows;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Class 认证Realm
 *
 * @author 86130
 * Created on 2019/8/3
 */
public class DbRealm extends AuthorizingRealm {

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * 设置授权信息
     *
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        ShiroUser shiroUser = (ShiroUser) principals.fromRealm(this.getName()).iterator().next();
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        //info.addRoles(shiroUser.getRoles());
        shiroUser.getRoles().forEach(roleId -> {
            info.addStringPermissions(userDetailsService.loadPermissions(roleId));
        });
        return info;
    }

    /**
     * 设置认证信息
     *
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String username = (String) authenticationToken.getPrincipal();
        ShiroUser user = userDetailsService.loadUser(username);
        if(ObjectUtil.isEmpty(user)){
            throw new LoginException("用户名不存在");
        }
        if("1".equals(user.getLockFlag())){
            throw new LoginException("用户已锁定，请联系60638284");
        }
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                user,
                user.getPassword(),
                ByteSource.Util.bytes(user.getSalt()),
                getName()
        );
        return authenticationInfo;
    }
}
