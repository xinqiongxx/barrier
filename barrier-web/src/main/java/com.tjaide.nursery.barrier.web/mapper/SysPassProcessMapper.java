/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;

import java.util.List;

/**
 * <p>
 * 进出记录管理 Mapper 接口
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
public interface SysPassProcessMapper extends BaseMapper<SysPassProcess> {

    List<SysPassProcessVo> findRecentPassVoList();
}
