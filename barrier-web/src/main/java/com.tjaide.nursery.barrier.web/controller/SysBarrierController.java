/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.log.annotation.SysLog;
import com.tjaide.nursery.barrier.web.dto.RoleDTO;
import com.tjaide.nursery.barrier.web.entity.SysBarrier;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import com.tjaide.nursery.barrier.web.service.SysBarrierService;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author maxinqiong
 * @date 2017/11/5
 */
@RestController
@AllArgsConstructor
@RequestMapping("/barrier")
@Api(value = "barrier", tags = "道闸管理模块")
public class SysBarrierController {
    private final SysBarrierService sysBarrierService;

    /**
     * 通过ID查询
     *
     * @param id ID
     * @return
     */
    @GetMapping("/{id}")
    public R getById(@PathVariable Integer id) {
        return R.ok(sysBarrierService.getById(id));
    }

    /**
     * 添加
     *
     * @param
     * @return success、false
     */
    @SysLog("添加")
    @PostMapping
    public R save(@Valid @RequestBody SysBarrier barrier) {
        return R.ok(sysBarrierService.saveOrUpdate(barrier));
    }

    /**
     * 修改
     *
     * @return success/false
     */
    @SysLog("修改")
    @PutMapping
    public R update(@Valid @RequestBody SysBarrier barrier) {
        return R.ok(sysBarrierService.saveOrUpdate(barrier));
    }

    /**
     * 删除
     *
     * @param id
     * @return
     */
    @SysLog("删除")
    @DeleteMapping("/{id}")
    public R removeById(@PathVariable Integer id) {
        return R.ok(sysBarrierService.removeById(id));
    }


    /**
     * 分页查询信息
     *
     * @param page 分页对象
     * @return 分页对象
     */
    @GetMapping("/page")
    public R getBBarrierPage(Page page) {
        return R.ok(sysBarrierService.page(page, Wrappers.emptyWrapper()));
    }
}
