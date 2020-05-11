/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.ObjectUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.common.core.constant.CommonConstants;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.core.exception.CheckedException;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.data.datascope.DataScope;
import com.tjaide.nursery.barrier.common.shiro.util.PasswordUtil;
import com.tjaide.nursery.barrier.web.dto.UserDTO;
import com.tjaide.nursery.barrier.web.dto.UserInfo;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.mapper.SysUserMapper;
import com.tjaide.nursery.barrier.web.mapper.SysUserRelationMapper;
import com.tjaide.nursery.barrier.web.service.*;
import com.tjaide.nursery.barrier.web.vo.UserVO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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