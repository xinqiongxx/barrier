/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.vo;

import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
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
public class SysPassProcessVo extends SysPassProcess {

    /**
     * 关联用户信息
     */
   private SysDepotUser user;


}
