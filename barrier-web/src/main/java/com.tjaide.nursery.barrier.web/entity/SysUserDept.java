/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.entity;

import com.baomidou.mybatisplus.extension.activerecord.Model;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 用户部门表
 * </p>
 *
 * @author maxinqiong
 * @since 2017-10-29
 */
@Data
@ApiModel(value = "用户部门")
@EqualsAndHashCode(callSuper = true)
public class SysUserDept extends Model<SysUserDept> {

    private static final long serialVersionUID = 1L;
    /**
     * 用户ID
     */
    @ApiModelProperty(value = "用户id")
    private String userId;
    /**
     * 部门ID
     */
    @ApiModelProperty(value = "部门id")
    private Integer deptId;

}
