/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * <p>
 * 部门管理
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-22
 */
@Data
@ApiModel(value = "部门")
@EqualsAndHashCode(callSuper = true)
public class SysDept extends Model<SysDept> {

    private static final long serialVersionUID = 1L;

    @TableId(value = "dept_id")
    @ApiModelProperty(value = "部门id")
    private String deptId;
    /**
     * 部门名称
     */
    @NotBlank(message = "部门名称不能为空")
    @ApiModelProperty(value = "部门名称")
    private String deptName;
    /**
     * 部门编码
     */
    @NotBlank(message = "部门名称不能为空")
    @NotNull(message = "部门编码")
    private String deptCode;
    /**
     * 排序
     */
    @NotNull(message = "排序值不能为空")
    @ApiModelProperty(value = "排序值")
    private Integer sort;
    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    /**
     * 修改时间
     */
    @ApiModelProperty(value = "修改时间")
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    /**
     * 父级部门id
     */
    @ApiModelProperty(value = "父级部门id")
    private String parentId;
    /**
     * 是否删除  1：已删除  0：正常
     */
    @TableLogic
    @ApiModelProperty(value = "删除标记,1:已删除,0:正常")
    private String delFlag;
    /**
     * 租户ID
     */
    @ApiModelProperty(value = "用户所属租户id")
    private Integer tenantId;
    /**
     * 租户ID
     */
    @ApiModelProperty(value = "部门类型")
    private String deptType;
}
