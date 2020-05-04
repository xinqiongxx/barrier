/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.vo;

import com.tjaide.nursery.barrier.web.entity.SysDept;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author maxinqiong
 * @date 2017/10/29
 */
@Data
public class UserVO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    private String userId;
    /**
     * 用户名
     */
    private String username;
    /**
     * 用户昵称
     */
    private String name;
    /**
     * 密码
     */
    private String password;
    /**
     * 随机盐
     */
    private String salt;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;
    /**
     * 修改时间
     */
    private LocalDateTime updateTime;
    /**
     * 0-正常，1-删除
     */
    private String delFlag;

    /**
     * 锁定标记
     */
    private String lockFlag;
    /**
     * 简介
     */
    private String phone;
    /**
     * 头像
     */
    private String avatar;


    /**
     * 租户ID
     */
    private Integer tenantId;

    /**
     * 部门名称
     */
    private String deptName;

    /**
     * 部门名称
     */
    private String email;
    /**
     * 角色列表
     */
    private List<SysRole> roleList;
    /**
     * 部门列表
     */
    private List<SysDept> deptList;


}
