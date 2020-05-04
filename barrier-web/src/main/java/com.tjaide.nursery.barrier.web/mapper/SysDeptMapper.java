/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjaide.nursery.barrier.common.data.datascope.DataScope;
import com.tjaide.nursery.barrier.web.entity.SysDept;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 部门管理 Mapper 接口
 * </p>
 *
 * @author wangjun
 * @since 2018-01-20
 */
public interface SysDeptMapper extends BaseMapper<SysDept> {
    /**
     * 通过用户ID，查询部门信息
     *
     * @param userId
     * @return
     */
    List<SysDept> listDeptByUserId(String userId);

    /**
     * 根据部门ID查询下面的所有班级
     *
     * @param deptId
     * @return List
     */
    List<SysDept> findClassInfoById(String deptId);

    SysDept getByAllId(String id);


    List<SysDept> getList(@Param("query") String deptName, DataScope dataScope);
}
