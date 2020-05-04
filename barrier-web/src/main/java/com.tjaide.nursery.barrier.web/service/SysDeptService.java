/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.web.dto.DeptTree;
import com.tjaide.nursery.barrier.web.entity.SysDept;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 部门管理 服务类
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
public interface SysDeptService extends IService<SysDept> {


    /**
     * 通过用户ID，查询角色信息
     *
     * @param userId
     * @return
     */
    List<SysDept> findDeptsByUserId(String userId);

    /**
     * 查询部门树菜单
     *
     * @return 树
     */
    List<DeptTree> selectTree();

    /**
     * 查询班级学院树菜单
     *
     * @return 树
     */
    List<Map<String, Object>> selectClassTree();

    /**
     * 添加信息部门
     *
     * @param sysDept
     * @return
     */
    Boolean saveDept(SysDept sysDept);

    /**
     * 删除部门
     *
     * @param id 部门 ID
     * @return 成功、失败
     */
    Boolean removeDeptById(String id);

    /**
     * 更新部门
     *
     * @param sysDept 部门信息
     * @return 成功、失败
     */
    Boolean updateDeptById(SysDept sysDept);

    /**
     * 根据条件MAP查询集合
     *
     * @param selectMap 条件MAP
     * @return 部门集合
     */
    List<SysDept> selectByMap(Map<String, Object> selectMap);

    /***
     * @Description: 查询部门信息 包括已经删除的
     * @Param:
     * @param id
     * @return:
     * @Author: 马鑫琼
     * @Date: 2019/8/19 16:16
     */

    SysDept getByAllId(String id);


    /***
     * @Description: 查询所有部门
     * @Param:
     * @param id
     * @return:
     * @Author: 马鑫琼
     * @Date: 2019/8/19 16:16
     */

    List<SysDept> getList(String deptName);


}
