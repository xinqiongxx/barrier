package com.tjaide.nursery.barrier.common.shiro.service;

import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;

import java.util.Set;

/**
 * @author 86130
 */
public interface UserDetailsService {
    /**
     * 通过登录用户查询用户对象
     *
     * @param loginname
     * @return
     */
    ShiroUser loadUser(String loginname);


    /**
     * 用户角色查询对应的权限
     *
     * @param loginname
     * @return
     */
    Set<String> loadRoles(String loginname);

    /**
     * 用户角色查询对应的权限
     *
     * @param roleid
     * @return
     */
    Set<String> loadPermissions(Integer role_id);
}
