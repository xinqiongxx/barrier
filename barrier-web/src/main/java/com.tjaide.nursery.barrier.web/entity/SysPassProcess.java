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
 * 进出记录管理
 * </p>
 *
 * @author maxinqiong
 * @since 2020-05-04
 */
@Data
@ApiModel(value = "进出记录")
@EqualsAndHashCode(callSuper = true)
public class SysPassProcess extends Model<SysPassProcess> {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "id")
    private Integer id;
    @ApiModelProperty(value = "进出类型1进2出")
    private Integer enterType;
    @ApiModelProperty(value = "照片")
    @TableField(el="sanp_pic, typeHandler=com.tjaide.nursery.barrier.common.data.handler.BlobTypeHandler")
    private String sanpPic;
    @ApiModelProperty(value = "照片")
    @TableField(el="registered_pic, typeHandler=com.tjaide.nursery.barrier.common.data.handler.BlobTypeHandler")
    private String registeredPic;
    @ApiModelProperty(value = "处理状态")
    private Integer status;
    @ApiModelProperty(value = "备注")
    private String remark;
    @ApiModelProperty(value = "用户id（底库用户）")
    private Integer userId;
    @ApiModelProperty(value = "识别id（底库用户）")
    private Integer discernId;
    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

}
