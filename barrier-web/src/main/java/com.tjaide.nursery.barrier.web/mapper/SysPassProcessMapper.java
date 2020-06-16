/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.web.dto.SysPassProcessDTO;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessExcel;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
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
    Integer getCountByCreateDate(@Param("type") Integer type, @Param("start_time") String start_time, @Param("end_time") String end_time);
    Integer getCountByUserTypeCreateDate(@Param("userType") Integer userType, @Param("start_time") String start_time, @Param("end_time") String end_time);
    IPage<SysPassProcessVo> getPage(Page page, @Param("query") SysPassProcessDTO sysPassProcessDTO);

    List<SysPassProcessExcel> getProcess(@Param("query") SysPassProcessDTO sysPassProcessDTO);
}
