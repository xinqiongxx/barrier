/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.vo.SysDepotUserVo;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

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

    List<SysDepotUser> getParentsById(@Param("id") Integer id);

    List<Integer> getGraduation(@Param("isremove") boolean isRemoveTeacher);

    SysDepotUser getUserById(@Param("user_id") Integer user_id);

    IPage<List<SysDepotUser>> relationPage(Page page, @Param("query") SysDepotUser sysDepotUser,@Param("id") Integer id);

    IPage<List<SysDepotUserVo>> userPage(Page page, @Param("query") SysDepotUser sysDepotUser);

    List<LinkedHashMap<String,Object>> userList();
}
