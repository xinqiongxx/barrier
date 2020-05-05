/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjaide.nursery.barrier.web.entity.SysUserDept;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * 用户部门表 Mapper 接口
 * </p>
 *
 * @author maxinqiong
 * @since 2017-10-29
 */
public interface SysUserDeptMapper extends BaseMapper<SysUserDept> {
    /**
     * 根据用户Id删除该用户的部门关系
     *
     * @param userId 用户ID
     * @return boolean
     * @author maxinqiong
     * @date 2017年12月7日 16:31:38
     */
    Boolean deleteByUserId(@Param("userId") String userId);
}
