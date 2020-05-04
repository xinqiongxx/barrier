/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * <p>
 * 道闸管理
 * </p>
 *
 * @author maxinqiong
 * @since 2020-05-04
 */
@Data
@ApiModel(value = "道闸")
@EqualsAndHashCode(callSuper = true)
public class SysBarrier extends Model<SysBarrier> {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "id")
    private Integer id;
    @ApiModelProperty(value = "名称")
    private String name;
    @ApiModelProperty(value = "编号")
    private String number;
    @ApiModelProperty(value = "描述")
    private String description;
    @ApiModelProperty(value = "进入平板")
    private String enterFlatbed;
    @ApiModelProperty(value = "离开平板")
    private String leaveFlatbed;
    @ApiModelProperty(value = "操作人")
    private Integer operatorId;
    @ApiModelProperty(value = "操作人姓名")
    private String operatorName;
    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 是否删除  1：已删除  0：正常
     */
    @TableLogic
    @ApiModelProperty(value = "删除标记,1:已删除,0:正常")
    private String delFlag;

}
