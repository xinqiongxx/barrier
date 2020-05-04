/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.common.log.service;


import com.tjaide.nursery.barrier.common.log.entity.SysLog;

/**
 * @author maxinqiong
 * @date 2018/6/28
 */
public interface SysLogService {
    /**
     * 保存日志
     *
     * @param sysLog 日志实体
     */
    Boolean saveLog(SysLog sysLog);
}
