/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.mapper.SysDeptRelationMapper;
import com.tjaide.nursery.barrier.web.mapper.SysPassProcessMapper;
import com.tjaide.nursery.barrier.web.service.SysDeptRelationService;
import com.tjaide.nursery.barrier.web.service.SysPassProcessService;
import com.tjaide.nursery.barrier.web.service.SysUserRelationService;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * <p>
 * 道闸管理 服务实现类
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
@Slf4j
@Service
@AllArgsConstructor
public class SysPassProcessServiceImpl extends ServiceImpl<SysPassProcessMapper, SysPassProcess> implements SysPassProcessService {

    private final SysUserRelationService sysUserRelationService;

    @Override
    public List<SysPassProcessVo> findRecentPassVoList(){
        List<SysPassProcessVo> list=baseMapper.findRecentPassVoList();
        for(SysPassProcessVo process:list){
            if(ObjectUtil.isNotNull(process.getUserId())){
                process.setParentType(sysUserRelationService.getRelation(process.getUserId(),process.getDiscernId()).getRelationName());
            }else{
                process.setParentType("本人");
            }
        }
        return list;
    }

    @Override
    public Map<String,Object> getBaseDatas(){
        Map<String,Object> res=new HashMap<>();
        String date1=getDateAdd(0);
        String start_time = date1+" 00:00:00";
        String end_time = date1+" 23:59:59";
        Integer data1=baseMapper.getCountByUserTypeCreateDate(1,start_time,end_time);
        Integer data2=baseMapper.getCountByUserTypeCreateDate(3,start_time,end_time);
        Integer data3=baseMapper.getCountByUserTypeCreateDate(2,start_time,end_time);
        Integer data4=baseMapper.getCountByUserTypeCreateDate(null,start_time,end_time);
        res.put("data1",data1);
        res.put("data2",data2);
        res.put("data3",data3);
        res.put("data4",data4);
        return res;
    }

    @Override
    public Map<String,Object> getDateNum(){
        Map<String,Object> res=new HashMap<>();
        //获取最近五天数据
        List<String> datelist=new ArrayList<>();
        List<Integer> data1=new ArrayList<>();
        List<Integer> data2=new ArrayList<>();
        for(int i=0;i<5;i++){
            String date1=getDateAdd(i);
            datelist.add(date1.substring(5,10));
            String start_time = date1+" 00:00:00";
            String end_time = date1+" 23:59:59";
            Integer enter = baseMapper.getCountByCreateDate(1,start_time,end_time);
            Integer leave = baseMapper.getCountByCreateDate(2,start_time,end_time);
            data1.add(enter);
            data2.add(leave);
        }
        res.put("datelist",datelist);
        res.put("data1",data1);
        res.put("data2",data2);
        return res;
    }

    private  String getDateAdd(int days){
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, -days);
        return sf.format(c.getTime());
    }


    @Override
    public Map<String,Object> getflow(){
        Map<String,Object> res=new HashMap<>();
        String date1=getDateAdd(0);
        //获取最近五天数据
        List<String> data1=new ArrayList<>();
        List<Integer> data2=new ArrayList<>();
        List<Integer> data3=new ArrayList<>();
        for(int i=0;i<12;i++){
            int h=i*2;
            String hour1=i>9?(i+""):("0"+i);
            String hour2=h>9?(h+""):("0"+h);
            String start_time=date1+" "+hour1+":00:00";
            String end_time=date1+" "+hour2+":59:59";
            Integer flow = baseMapper.getCountByCreateDate(1,start_time,end_time);
            Integer flow1 = baseMapper.getCountByCreateDate(2,start_time,end_time);
            String datestr=hour1+":00";
            data1.add(datestr);
            data2.add(flow);
            data3.add(flow1);
        }
        res.put("data1",data1);
        res.put("data2",data2);
        res.put("data3",data3);
        return res;
    }
}