/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.vo;

import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * <p>
 * 进出记录管理
 * </p>
 *
 * @author maxinqiong
 * @since 2020-05-04
 */
@Data
public class SysPassProcessExcel{

    private Integer userId;
    private Integer discernId;
    private String parentType;

    private String userName;

    private String discernName;

    private String deptName;

    private String createTimeStr;

    private String enterStr;


}
