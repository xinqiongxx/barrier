/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.log.annotation.SysLog;
import com.tjaide.nursery.barrier.web.entity.SysDept;
import com.tjaide.nursery.barrier.web.service.SysDeptService;
import com.tjaide.nursery.barrier.web.service.SysUserRoleService;
import com.tjaide.nursery.barrier.web.service.SysUserService;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;

/**
 * <p>
 * 部门管理 前端控制器
 * </p>
 *
 * @author wangjun
 * @since 2018-01-20
 */
@RestController
@AllArgsConstructor
@RequestMapping("/dept")
@Api(value = "dept", tags = "部门管理模块")
public class SysDeptController {
    private final SysDeptService sysDeptService;
    private final SysUserService userService;
    private final SysUserRoleService userRoleService;


    /***
     * @Description: 返回list
     * @Param:
     * @param
     * @return:
     * @Author: 孙灵顺
     * @Date: 2019/8/6 14:43
     */
    @GetMapping(value = "/list")
    public R getList(@RequestParam(value = "deptName", required = false) String deptName) {
        return R.ok(sysDeptService.getList(deptName));
    }


    /**
     * 通过ID查询
     *
     * @param id ID
     * @return SysDept
     */
    @GetMapping("/{id}")
    public R getById(@PathVariable String id) {
        return R.ok(sysDeptService.getById(id));
    }


    /**
     * 返回树形菜单集合
     *
     * @return 树形菜单
     */
    @GetMapping(value = "/tree")
    public R getTree() {
        return R.ok(sysDeptService.selectTree());
    }


    /**
     * 添加
     *
     * @param sysDept 实体
     * @return success/false
     */
    @SysLog("添加部门")
    @PostMapping
    public R save(@Valid @RequestBody SysDept sysDept) {
        return R.ok(sysDeptService.saveDept(sysDept));
    }

    /**
     * 删除
     *
     * @param id ID
     * @return success/false
     */
    @SysLog("删除部门")
    @DeleteMapping("/{id}")
    public R removeById(@PathVariable String id) {
        return R.ok(sysDeptService.removeDeptById(id));
    }

    /**
     * 编辑
     *
     * @param sysDept 实体
     * @return success/false
     */
    @SysLog("编辑部门")
    @PutMapping
    public R update(@Valid @RequestBody SysDept sysDept) {
        sysDept.setUpdateTime(LocalDateTime.now());
        return R.ok(sysDeptService.updateDeptById(sysDept));
    }



}
