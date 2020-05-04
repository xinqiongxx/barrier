/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.dto;

import com.tjaide.nursery.barrier.web.entity.SysRole;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * @author maxinqiong
 * @date 2017/11/5
 */
@Data
@ApiModel(value = "系统角色传输对象")
@EqualsAndHashCode(callSuper = true)
public class RoleDTO extends SysRole {
    /**
     * 角色ID
     */
    @ApiModelProperty(value = "应用id集合")
    private List<String> serviceIds;

}