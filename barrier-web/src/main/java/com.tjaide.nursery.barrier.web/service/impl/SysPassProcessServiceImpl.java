/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.mapper.SysPassProcessMapper;
import com.tjaide.nursery.barrier.web.service.SysPassProcessService;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 道闸管理 服务实现类
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
@Slf4j
@Service
@AllArgsConstructor
public class SysPassProcessServiceImpl extends ServiceImpl<SysPassProcessMapper, SysPassProcess> implements SysPassProcessService {

    public List<SysPassProcessVo> findRecentPassVoList(){
        return baseMapper.findRecentPassVoList();
    }
}
