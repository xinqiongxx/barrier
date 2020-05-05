package com.tjaide.nursery.barrier.common.core.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.security.Principal;
import java.util.List;

/**
 * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShiroUser implements Serializable {
    private static final long serialVersionUID = -1748602382963711884L;

    /**
     * 登录ID
     */
    private String userId;

    /**
     * 登录名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 盐
     */
    private String salt;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 删除标识
     */
    private String lockFlag;

    /**
     * 盐
     */
    private String name;

    /**
     * 部门ID
     */
    private List<Integer> depts;

    /**
     * 角色ID
     */
    private List<Integer> roles;

    /**
     * 租户ID
     */
    private Integer tenantId;


    /**
     * 获取代理对象
     */
    private Principal principal;
}
