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
 * 底库用户表
 * </p>
 *
 * @author maxinqiong
 * @since 2020-05-04
 */
@Data
@ApiModel(value = "底库用户表")
@EqualsAndHashCode(callSuper = true)
public class SysDepotUser extends Model<SysDepotUser> {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "id")
    private Integer id;
    @ApiModelProperty(value = "姓名")
    private String name;
    @ApiModelProperty(value = "底库id")
    private Integer depotId;
    @ApiModelProperty(value = "人员类型（1学生2教职工3家长9未知）")
    private Integer userType;
    @ApiModelProperty(value = "照片")
    private String photo;
    @ApiModelProperty(value = "备注")
    private String remark;
    @ApiModelProperty(value = "民族")
    private String nation;
    @ApiModelProperty(value = "证件类型")
    private String certificateType;
    @ApiModelProperty(value = "身份证号")
    private String cardId;
    @ApiModelProperty(value = "出生日期")
    private LocalDateTime birthday;
    @ApiModelProperty(value = "电话")
    private String phone;
    @ApiModelProperty(value = "籍贯")
    private String hometown;
    @ApiModelProperty(value = "地址")
    private String address;
    @ApiModelProperty(value = "操作人")
    private Integer operatorId;
    @ApiModelProperty(value = "操作人姓名")
    private String operatorName;
    @ApiModelProperty(value = "性别1男生2女生")
    private Integer gender;
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
