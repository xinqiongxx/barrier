/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 进出用户管理 服务类
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
public interface SysDepotUserService extends IService<SysDepotUser> {

    R importByExcel(List<Map<String, Object>> mapList, Integer depotId, Integer depotType);

    R updatePhoto(String filePath);

    IPage relationPage(Page page, SysDepotUser sysDepotUser, Integer id);
}
