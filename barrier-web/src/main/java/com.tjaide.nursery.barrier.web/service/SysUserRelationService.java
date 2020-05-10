package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.web.entity.SysUserRelation;

public interface SysUserRelationService extends IService<SysUserRelation> {
    /**
     * 保存用户关系信息
     *
     * @param sysUserRelation
     * @return success/fail
     */
    Boolean saveOrUpdateRelation(SysUserRelation sysUserRelation);
}
