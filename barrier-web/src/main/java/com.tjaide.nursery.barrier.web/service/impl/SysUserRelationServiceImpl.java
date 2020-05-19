/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.vo.SysUserRelationVO;
import com.tjaide.nursery.barrier.web.mapper.SysUserRelationMapper;
import com.tjaide.nursery.barrier.web.service.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


/**
 * @author maxinqiong
 * @date 2017/10/31
 */
@Slf4j
@Service
@AllArgsConstructor
public class SysUserRelationServiceImpl extends ServiceImpl<SysUserRelationMapper, SysUserRelation> implements SysUserRelationService {
    private final SysDepotUserService sysDepotUserService;

    /**
     * 保存用户关系信息
     *
     * @param sysUserRelation
     * @return success/fail
     */
    @Override
    public  Boolean saveOrUpdateRelation(SysUserRelation sysUserRelation){
        //查是否是学生
        SysDepotUser user=sysDepotUserService.getById(sysUserRelation.getUserId());
        if (user.getUserType()==1) {
            sysUserRelation.setIfStudent(1);
        }else{
            sysUserRelation.setIfStudent(0);
        }
        //查是否已有
        SysUserRelation relation=baseMapper.selectOne(Wrappers.<SysUserRelation>lambdaQuery().eq(SysUserRelation::getUserId,sysUserRelation.getUserId())
                .eq(SysUserRelation::getMemberId,sysUserRelation.getMemberId()));
        int ret=0;
        if(ObjectUtil.isNotNull(relation)){
          ret =baseMapper.update(sysUserRelation,Wrappers.<SysUserRelation>lambdaQuery().eq(SysUserRelation::getUserId,sysUserRelation.getUserId())
                    .eq(SysUserRelation::getMemberId,sysUserRelation.getMemberId()));
        }else{
           ret=baseMapper.insert(sysUserRelation);
        }
        return ret>0;
    }

    @Override
    public  SysUserRelationVO getRelation(Integer userId,Integer memberId){
        SysUserRelationVO ret=baseMapper.getRelation(userId,memberId);
        return ret;
    }

    /**
     * 保存用户关系信息
     *
     * @param sysUserRelation
     * @return success/fail
     */
    @Override
    public  IPage getrelations(Page page, Integer id){
        return baseMapper.getrelations(page,id);
    }

}