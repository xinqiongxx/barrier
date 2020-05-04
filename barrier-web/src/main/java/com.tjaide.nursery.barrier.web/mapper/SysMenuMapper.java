/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjaide.nursery.barrier.web.entity.SysMenu;
import com.tjaide.nursery.barrier.web.vo.MenuVO;

import java.util.List;

/**
 * <p>
 * 菜单权限表 Mapper 接口
 * </p>
 *
 * @author maxinqiong
 * @since 2017-10-29
 */
public interface SysMenuMapper extends BaseMapper<SysMenu> {


    /**
     * 通过角色编号查询菜单
     *
     * @param roleId 角色ID
     * @return
     */
    List<MenuVO> listMenusByRoleId(Integer roleId);

    /**
     * 通过角色ID查询权限
     *
     * @param roleIds Ids
     * @return
     */
    List<String> listPermissionsByRoleIds(String roleIds);
}
