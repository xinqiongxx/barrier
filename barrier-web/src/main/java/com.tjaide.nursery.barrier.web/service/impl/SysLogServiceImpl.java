/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.common.log.entity.SysLog;
import com.tjaide.nursery.barrier.common.log.service.SysLogService;
import com.tjaide.nursery.barrier.web.mapper.SysLogMapper;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 日志表 服务实现类
 * </p>
 *
 * @author maxinqiong
 * @since 2017-11-20
 */
@Service
public class SysLogServiceImpl extends ServiceImpl<SysLogMapper, SysLog> implements SysLogService {


    @Override
    public Boolean saveLog(SysLog sysLog) {
        return this.save(sysLog);
    }
}
