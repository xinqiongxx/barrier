/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.web.entity.SysUserDept;
import com.tjaide.nursery.barrier.web.mapper.SysUserDeptMapper;
import com.tjaide.nursery.barrier.web.service.SysUserDeptService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户角色表 服务实现类
 * </p>
 *
 * @author maxinqiong
 * @since 2017-10-29
 */
@Service
public class SysUserDeptServiceImpl extends ServiceImpl<SysUserDeptMapper, SysUserDept> implements SysUserDeptService {

    /**
     * 根据用户Id删除该用户的部门关系
     *
     * @param userId 用户ID
     * @return boolean
     * @author 马鑫琼
     * @date 2017年12月7日 16:31:38
     */
    @Override
    public Boolean deleteByUserId(String userId) {
        return baseMapper.deleteByUserId(userId);
    }
}
