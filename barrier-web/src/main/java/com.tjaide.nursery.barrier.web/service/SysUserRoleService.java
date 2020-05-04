/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.web.entity.SysUserRole;

/**
 * <p>
 * 用户角色表 服务类
 * </p>
 *
 * @author maxinqiong
 * @since 2017-10-29
 */
public interface SysUserRoleService extends IService<SysUserRole> {

    /**
     * 根据用户Id删除该用户的角色关系
     *
     * @param userId 用户ID
     * @return boolean
     * @author 马鑫琼
     * @date 2017年12月7日 16:31:38
     */
    Boolean deleteByUserId(String userId);
}
