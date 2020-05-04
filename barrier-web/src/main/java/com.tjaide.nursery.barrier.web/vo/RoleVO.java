/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.vo;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author maxinqiong
 * @date 2017/10/29
 */
@Data
public class RoleVO implements Serializable {
    private static final long serialVersionUID = 1L;


    private Integer roleId;

    private String roleName;

    private String roleCode;

    private String roleDesc;

    private Integer dsType;

    private String dsScope;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;

    private String delFlag;

    private Integer tenantId;

}
