package com.tjaide.nursery.barrier.web.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.tjaide.nursery.barrier.web.entity.SysUserRelation;
import com.tjaide.nursery.barrier.web.vo.SysUserRelationVO;

public interface SysUserRelationService extends IService<SysUserRelation> {
    /**
     * 保存用户关系信息
     *
     * @param sysUserRelation
     * @return success/fail
     */
    Boolean saveOrUpdateRelation(SysUserRelation sysUserRelation);


    SysUserRelationVO getRelation(Integer userId,Integer memberId);
    /**
     * 获取关联关系
     *
     * @param sysUserRelation
     * @return success/fail
     */
    IPage getrelations(Page page, Integer id);
}
