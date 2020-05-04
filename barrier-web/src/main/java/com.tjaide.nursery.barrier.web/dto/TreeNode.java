/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.dto;

import cn.hutool.core.collection.CollUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author maxinqiong
 * @date 2017年11月9日23:33:45
 */
@Data
@ApiModel(value = "树形节点")
public class TreeNode {
    @ApiModelProperty(value = "当前节点id")
    protected Serializable id;
    @ApiModelProperty(value = "父节点id")
    protected Serializable parentId;
    @ApiModelProperty(value = "子节点列表")
    protected List<TreeNode> children;

    protected String backgroundPosition = "-128px -32px";

    public void add(TreeNode node) {
        if (CollUtil.isEmpty(this.children)) {
            this.children = new ArrayList<>();
        }
        children.add(node);
    }
}