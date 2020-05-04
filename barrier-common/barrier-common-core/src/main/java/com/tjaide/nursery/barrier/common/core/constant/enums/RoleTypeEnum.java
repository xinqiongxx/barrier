/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.common.core.constant.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author maxinqiong
 * @date 2019/7/21
 * 系统内置角色
 */
@Getter
@AllArgsConstructor
public enum RoleTypeEnum {

    /**
     * 管理员
     */
    ADMIN(6, "ROLE_ADMIN", "管理员");


    /**
     * CODE
     */
    private Integer code;
    /**
     * SIGN
     */
    private String sign;
    /**
     * 描述
     */
    private String description;
}