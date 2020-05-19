/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.vo;

import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.entity.SysUserRelation;
import lombok.Data;


/**
 * @author maxinqiong
 * @date 2017/10/29
 */
@Data
public class SysUserRelationVO extends SysUserRelation {
    private static final long serialVersionUID = 1L;


    private SysDepotUser user;
    /**
     * 成员
     */
    private SysDepotUser member;

    private String relationName;

}
