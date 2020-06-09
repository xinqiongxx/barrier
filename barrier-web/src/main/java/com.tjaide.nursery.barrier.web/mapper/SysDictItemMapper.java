/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */
package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjaide.nursery.barrier.web.entity.SysDictItem;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 字典项
 *
 * @author maxinqiong
 * @date 2019/03/19
 */
public interface SysDictItemMapper extends BaseMapper<SysDictItem> {

    List<SysDictItem> getAllItem(@Param("type") String type);
}
