/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.web.dto.RoleDTO;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import com.tjaide.nursery.barrier.web.vo.RoleVO;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author maxinqiong
 * @since 2017-10-29
 */
public interface SysRoleService extends IService<SysRole> {

    /**
     * 通过用户ID，查询角色信息
     *
     * @param userId
     * @return
     */
    List<SysRole> findRolesByUserId(String userId);

    /**
     * 通过角色ID，删除角色
     *
     * @param id
     * @return
     */
    Boolean removeRoleById(Integer id);

    /***
    * @Description:  添加or修改角色
    * @Param:
     * @param roleDto
    * @return:
    * @Author: 马鑫琼
    * @Date: 2019/9/4 17:25
    */
    R saveOrUpdateRole(RoleDTO roleDto);

    /***
    * @Description:  获取角色详细
    * @Param:
     * @param id
    * @return:
    * @Author: 马鑫琼
    * @Date: 2019/9/4 17:27
    */
    RoleVO getRoleById(Serializable id);
}
