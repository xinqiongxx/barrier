/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.common.log.event;

import com.tjaide.nursery.barrier.common.log.entity.SysLog;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author maxinqiong
 * 系统日志事件
 */
@Getter
@AllArgsConstructor
public class SysLogEvent {
    private final SysLog sysLog;
}
