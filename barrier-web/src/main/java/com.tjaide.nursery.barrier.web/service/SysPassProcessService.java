/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.web.dto.SysPassProcessDTO;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessExcel;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;

import java.util.List;
import java.util.Map;


public interface SysPassProcessService extends IService<SysPassProcess> {

 List<SysPassProcessVo> findRecentPassVoList();
 Map<String,Object> getBaseDatas();
 Map<String,Object> getDateNum();
 Map<String,Object> getflow();
 IPage getPage(Page page, SysPassProcessDTO sysPassProcessdto);

 List<SysPassProcessExcel> getProcess(SysPassProcessDTO sysPassProcessDTO);
}
