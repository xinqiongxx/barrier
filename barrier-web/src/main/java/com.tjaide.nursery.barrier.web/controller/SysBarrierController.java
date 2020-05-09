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
import com.tjaide.nursery.barrier.web.entity.SysFlatbed;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import com.tjaide.nursery.barrier.web.service.SysBarrierService;
import com.tjaide.nursery.barrier.web.service.SysFlatbedService;
import com.tjaide.nursery.barrier.web.util.FlatBedUtil;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    private final SysFlatbedService sysFlatbedService;

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
    public R getBarrierPage(Page page) {
        return R.ok(sysBarrierService.page(page, Wrappers.emptyWrapper()));
    }


    /**
     * 开闸
     *
     * @return
     */
    @PostMapping("/open/{id}/{type}")
    public R openBarrier(@PathVariable Integer id,@PathVariable String type) {
        SysBarrier sysBarrier = sysBarrierService.getById(id);
        SysFlatbed sysFlatbed = null;
        if("enter".equals(type)) {
            sysFlatbed = sysFlatbedService.getById(sysBarrier.getEnterFlatbed());
        }else {
            sysFlatbed = sysFlatbedService.getById(sysBarrier.getLeaveFlatbed());
        }
        if("1".equals(sysFlatbed.getOnlineStatus().toString())){
            return R.failed("平板不在线");
        }
        return R.ok(FlatBedUtil.OpenDoor(sysFlatbed.getIpAddress(),sysFlatbed.getNumber()));
    }


    @PostMapping("/openAll")
    public R openBarrierAll() {
        List<SysBarrier> sysBarriers = sysBarrierService.list();
        sysBarriers.forEach(sysBarrier -> {
            SysFlatbed  sysFlatbedEnter = sysFlatbedService.getById(sysBarrier.getEnterFlatbed());
            if("0".equals(sysFlatbedEnter.getOnlineStatus().toString())) {
                FlatBedUtil.OpenDoor(sysFlatbedEnter.getIpAddress(), sysFlatbedEnter.getNumber());
            }
            SysFlatbed  sysFlatbedLeave = sysFlatbedService.getById(sysBarrier.getLeaveFlatbed());
            if("0".equals(sysFlatbedLeave.getOnlineStatus().toString())) {
                FlatBedUtil.OpenDoor(sysFlatbedLeave.getIpAddress(), sysFlatbedLeave.getNumber());
            }
        });
        return R.ok();
    }

}
