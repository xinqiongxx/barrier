/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.common.data.datascope.DataScope;
import com.tjaide.nursery.barrier.web.dto.DeptTree;
import com.tjaide.nursery.barrier.web.entity.SysDept;
import com.tjaide.nursery.barrier.web.entity.SysDeptRelation;
import com.tjaide.nursery.barrier.web.mapper.SysDeptMapper;
import com.tjaide.nursery.barrier.web.service.SysDeptRelationService;
import com.tjaide.nursery.barrier.web.service.SysDeptService;
import com.tjaide.nursery.barrier.web.vo.TreeUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * <p>
 * 部门管理 服务实现类
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
@Slf4j
@Service
@AllArgsConstructor
public class SysDeptServiceImpl extends ServiceImpl<SysDeptMapper, SysDept> implements SysDeptService {
    private final SysDeptRelationService sysDeptRelationService;

    /**
     * 通过用户ID，查询角色信息
     *
     * @param userId
     * @return
     */
    @Override
    public List findDeptsByUserId(String userId) {
        return baseMapper.listDeptByUserId(userId);
    }

    /**
     * 添加信息部门
     *
     * @param dept 部门
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean saveDept(SysDept dept) {
        SysDept sysDept = new SysDept();
        BeanUtils.copyProperties(dept, sysDept);
        //sysDept.setDeptId(sysDept.getDeptCode());
        this.saveOrUpdate(sysDept);
        sysDeptRelationService.insertDeptRelation(sysDept);
        return Boolean.TRUE;
    }


    /**
     * 删除部门
     *
     * @param id 部门 ID
     * @return 成功、失败
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean removeDeptById(String id) {
        //级联删除部门
        List<Integer> idList = sysDeptRelationService
                .list(Wrappers.<SysDeptRelation>query().lambda()
                        .eq(SysDeptRelation::getAncestor, id))
                .stream()
                .map(SysDeptRelation::getDescendant)
                .collect(Collectors.toList());

        if (CollUtil.isNotEmpty(idList)) {
            this.removeByIds(idList);
        }

        //删除部门级联关系
        sysDeptRelationService.deleteAllDeptRealtion(id);

        this.removeById(id);

        return Boolean.TRUE;
    }

    /**
     * 更新部门
     *
     * @param sysDept 部门信息
     * @return 成功、失败
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean updateDeptById(SysDept sysDept) {
        //更新部门状态
        this.saveOrUpdate(sysDept);
//        this.updateById(sysDept);
        //更新部门关系
        SysDeptRelation relation = new SysDeptRelation();
        relation.setAncestor(sysDept.getParentId());
        relation.setDescendant(sysDept.getDeptId());
        sysDeptRelationService.updateDeptRealtion(relation);

        return Boolean.TRUE;
    }


    /**
     * 根据条件MAP查询集合
     *
     * @param selectMap 条件MAP
     * @return 部门集合
     */
    @Override
    public List<SysDept> selectByMap(Map<String, Object> selectMap) {
        return baseMapper.selectByMap(selectMap);
    }

    @Override
    public SysDept getByAllId(String id) {
        return baseMapper.getByAllId(id);
    }

    @Override
    public List<SysDept> getList(String deptName) {
        return baseMapper.getList(deptName, new DataScope());
    }

    /**
     * 查询全部部门树
     *
     * @return 树
     */
    @Override
    public List<DeptTree> selectTree() {
        return getDeptTree(this.list(Wrappers.emptyWrapper()), 0);
    }


    /**
     * 构建部门树
     *
     * @param depts 部门
     * @return
     */
    private List<DeptTree> getDeptTree(List<SysDept> depts, Integer root) {
        List<DeptTree> treeList = depts.stream()
                .filter(dept -> !dept.getDeptId().equals(dept.getParentId()))
                .sorted(Comparator.comparingInt(SysDept::getSort))
                .map(dept -> {
                    DeptTree node = new DeptTree();
                    node.setId(dept.getDeptId());
                    node.setParentId(dept.getParentId());
                    node.setName(dept.getDeptName());
                    return node;
                }).collect(Collectors.toList());
        return TreeUtil.build(treeList, root);
    }


    /**
     * 查询班级学院树
     *
     * @return 树
     */
    @Override
    public List<Map<String, Object>> selectClassTree() {
        List<Map<String, Object>> treeList = getChildDept(1);
        for (Map<String, Object> college : treeList) {
            List<Map<String, Object>> majorList = getChildDept(Integer.parseInt(college.get("value").toString()));
            if (majorList.isEmpty()) {
                continue;
            } else {
                for (Map<String, Object> major : majorList) {
                    List<Map<String, Object>> classList = getChildDept(Integer.parseInt(major.get("value").toString()));
                    if (classList.isEmpty()) {
                        continue;
                    } else {
                        major.put("children", classList);
                    }
                }
                college.put("children", majorList);
            }
        }
        return treeList;
    }

    private List<Map<String, Object>> getChildDept(int parent_id) {
        List<Map<String, Object>> treeList = this.list(Wrappers.<SysDept>lambdaQuery().eq(SysDept::getParentId, parent_id)).stream()
                .sorted(Comparator.comparingInt(SysDept::getSort))
                .map(dept -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("value", dept.getDeptId());
                    map.put("label", dept.getDeptName());
                    return map;
                }).collect(Collectors.toList());
        return treeList;
    }

}
