/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 进出记录管理 服务类
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
public interface SysPassProcessService extends IService<SysPassProcess> {

 List<SysPassProcessVo> findRecentPassVoList();
 Map<String,Object> getBaseDatas();
 Map<String,Object> getDateNum();
 Map<String,Object> getflow();

}
