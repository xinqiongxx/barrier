/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjaide.nursery.barrier.web.entity.SysDeptRelation;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author maxinqiong
 * @since 2018-02-12
 */
public interface SysDeptRelationMapper extends BaseMapper<SysDeptRelation> {
    /**
     * 删除部门关系表数据
     *
     * @param id 部门ID
     */
    void deleteDeptRelationsById(String id);

    /**
     * 删除部分关系表数据
     *
     * @param deptRelation
     */
    void deleteDeptRelations(SysDeptRelation deptRelation);

    /**
     * 更改部分关系表数据
     *
     * @param deptRelation
     */
    void updateDeptRelations(SysDeptRelation deptRelation);

}
