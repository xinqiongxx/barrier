/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.log.annotation.SysLog;
import com.tjaide.nursery.barrier.web.entity.SysDepot;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.service.SysDepotService;
import com.tjaide.nursery.barrier.web.service.SysDepotUserService;
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
@RequestMapping("/depotuser")
@Api(value = "depotuser", tags = "底库用户管理模块")
public class SysDepotUserController {
    private final SysDepotUserService sysDepotUserService;

    /**
     * 通过ID查询
     *
     * @param id ID
     * @return
     */
    @GetMapping("/{id}")
    public R getById(@PathVariable Integer id) {
        return R.ok(sysDepotUserService.getById(id));
    }

    /**
     * 添加
     *
     * @param
     * @return success、false
     */
    @SysLog("添加")
    @PostMapping
    public R save(@Valid @RequestBody SysDepotUser depotUser) {
        return R.ok(sysDepotUserService.saveOrUpdate(depotUser));
    }

    /**
     * 修改
     *
     * @return success/false
     */
    @SysLog("修改")
    @PutMapping
    public R update(@Valid @RequestBody SysDepotUser depotUser) {
        return R.ok(sysDepotUserService.saveOrUpdate(depotUser));
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
        return R.ok(sysDepotUserService.removeById(id));
    }


    /**
     * 分页查询信息
     *
     * @param page 分页对象
     * @return 分页对象
     */
    @GetMapping("/page")
    public R getRolePage(Page page) {
        return R.ok(sysDepotUserService.page(page, Wrappers.emptyWrapper()));
    }
}
