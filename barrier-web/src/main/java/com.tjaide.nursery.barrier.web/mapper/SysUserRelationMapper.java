/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.web.entity.SysUserRelation;
import com.tjaide.nursery.barrier.web.vo.SysUserRelationVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author maxinqiong
 * @since 2018-02-12
 */
public interface SysUserRelationMapper extends BaseMapper<SysUserRelation> {


    /**
     * 分页查询用户信息（含角色）
     *
     * @param page      分页
     * @param userDTO   查询参数
     * @param dataScope
     * @return list
     */
    IPage<List<SysUserRelationVO>> getrelations(Page page, @Param("id") Integer id);
    SysUserRelationVO getRelation(@Param("user_id") Integer user_id,@Param("member_id") Integer member_id);
}
