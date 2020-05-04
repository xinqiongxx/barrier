/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import com.tjaide.nursery.barrier.web.entity.SysDept;
import com.tjaide.nursery.barrier.web.service.SysDeptRelationService;
import com.tjaide.nursery.barrier.web.service.SysDeptService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class AsyncServiceImpl {

    private SysDeptRelationService sysDeptRelationService;
    private SysDeptService sysDepstService;

    /**
     * @param studentId
     * @param studentnum
     */
    @Async
    public void syncDept() {
        if (sysDeptRelationService.count() == 0) {
            // 初始化部门分支
            for (SysDept sysDept : sysDepstService.list()) {
                sysDeptRelationService.insertDeptRelation(sysDept);
            }
        }
    }


}
