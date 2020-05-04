/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import com.tjaide.nursery.barrier.web.vo.RoleVO;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author wangjun
 * @since 2017-10-29
 */
public interface SysRoleMapper extends BaseMapper<SysRole> {
    /**
     * 通过用户ID，查询角色信息
     *
     * @param userId
     * @return
     */
    List<SysRole> listRolesByUserId(String userId);

    /***
    * @Description:  获取角色详细
    * @Param:
     * @param id
    * @return:  
    * @Author: 孙灵顺
    * @Date: 2019/9/4 17:30
    */
    RoleVO getRoleById(Serializable id);

}
