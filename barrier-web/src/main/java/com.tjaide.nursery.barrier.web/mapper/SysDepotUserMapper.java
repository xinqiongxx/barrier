/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.web.entity.SysBarrier;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import io.swagger.models.auth.In;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import com.tjaide.nursery.barrier.web.vo.SysUserRelationVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 道闸管理 Mapper 接口
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
public interface SysDepotUserMapper extends BaseMapper<SysDepotUser> {
    List<SysDepotUser> enterDepotUser();

    List<Integer> getGraduation();

    SysDepotUser getUserById(@Param("user_id") Integer user_id);

    IPage<List<SysDepotUser>> relationPage(Page page, @Param("query") SysDepotUser sysDepotUser,@Param("id") Integer id);
}
