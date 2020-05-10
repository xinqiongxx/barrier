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
 * 学生家长关系表
 * </p>
 *
 * @author maxinqiong
 * @since 2020-05-04
 */
@Data
@ApiModel(value = "学生家长关系表")
@EqualsAndHashCode(callSuper = true)
public class SysUserRelation extends Model<SysUserRelation> {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "userId")
    private Integer userId;
    @ApiModelProperty(value = "家长id")
    private Integer memberId;
    @ApiModelProperty(value = "关系1父亲2母亲3外婆4奶奶5外公6爷爷7姐姐哥哥8其他亲戚")
    private Integer relationType;
    @ApiModelProperty(value = "备注")
    private String remark;
    @ApiModelProperty(value = "是否学生")
    private Integer ifStudent;
}
