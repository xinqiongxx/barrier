/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.dto;

import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * <p>
 * 进出记录管理
 * </p>
 *
 * @author maxinqiong
 * @since 2020-05-04
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class SysPassProcessDTO extends SysPassProcess {

    @ApiModelProperty(value = "姓名")
    private String name;

    @ApiModelProperty(value = "開始時間")
    private String startTime;

    @ApiModelProperty(value = "結束時間")
    private String endTime;

    @ApiModelProperty(value = "人员类型")
    private Integer userType;

}
