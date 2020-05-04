/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */
package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.web.entity.SysDictItem;

/**
 * 字典项
 *
 * @author maxinqiong
 * @date 2019/03/19
 */
public interface SysDictItemService extends IService<SysDictItem> {

    /**
     * 删除字典项
     *
     * @param id 字典项ID
     * @return
     */
    R removeDictItem(Integer id);

    /**
     * 更新字典项
     *
     * @param item 字典项
     * @return
     */
    R updateDictItem(SysDictItem item);
}
