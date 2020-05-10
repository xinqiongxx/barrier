/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.vo;

import com.tjaide.nursery.barrier.web.entity.SysDept;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @author maxinqiong
 * @date 2017/10/29
 */
@Data
public class SelectVo implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    private String value;
    /**
     * 名称
     */
    private String key;

}
