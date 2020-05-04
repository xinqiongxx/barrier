/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.common.core.exception.CheckedException;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.web.dto.RoleDTO;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import com.tjaide.nursery.barrier.web.entity.SysRoleMenu;
import com.tjaide.nursery.barrier.web.mapper.SysRoleMapper;
import com.tjaide.nursery.barrier.web.mapper.SysRoleMenuMapper;
import com.tjaide.nursery.barrier.web.service.SysRoleService;
import com.tjaide.nursery.barrier.web.vo.RoleVO;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author maxinqiong
 * @since 2017-10-29
 */
@Service
@AllArgsConstructor
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {
    private SysRoleMenuMapper sysRoleMenuMapper;

    /**
     * 通过用户ID，查询角色信息
     *
     * @param userId
     * @return
     */
    @Override
    public List findRolesByUserId(String userId) {
        return baseMapper.listRolesByUserId(userId);
    }


    @Override
    public Boolean removeRoleById(Integer id) {
        sysRoleMenuMapper.delete(Wrappers
                .<SysRoleMenu>update().lambda()
                .eq(SysRoleMenu::getRoleId, id));
        return this.removeById(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public R saveOrUpdateRole(RoleDTO roleDto) {
        SysRole sysRole = new SysRole();
        BeanUtils.copyProperties(roleDto, sysRole);
        boolean ret = this.saveOrUpdate(sysRole);
        if(!ret){
            throw new CheckedException("更新角色信息失败");
        }
        return R.ok();
    }

    @Override
    public RoleVO getRoleById(Serializable id) {
        return baseMapper.getRoleById(id);
    }


}
