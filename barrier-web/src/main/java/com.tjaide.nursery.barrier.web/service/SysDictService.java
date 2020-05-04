/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */
package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.web.entity.SysDict;

/**
 * 字典表
 *
 * @author maxinqiong
 * @date 2019/03/19
 */
public interface SysDictService extends IService<SysDict> {

    /**
     * 根据ID 删除字典
     *
     * @param id
     * @return
     */
    R removeDict(Integer id);

    /**
     * 更新字典
     *
     * @param sysDict 字典
     * @return
     */
    R updateDict(SysDict sysDict);
}
