/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.web.dto.SysPassProcessDTO;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.mapper.SysPassProcessMapper;
import com.tjaide.nursery.barrier.web.service.SysDepotUserService;
import com.tjaide.nursery.barrier.web.service.SysPassProcessService;
import com.tjaide.nursery.barrier.web.service.SysUserRelationService;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessExcel;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    private final SysDepotUserService sysDepotUserService;

    @Override
    public List<SysPassProcessVo> findRecentPassVoList(){
        List<SysPassProcessVo> list=baseMapper.findRecentPassVoList();
        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
        for(SysPassProcessVo process:list){
        String currentTime = df.format(process.getCreateTime());
            if(!process.getUserId().toString().equals( process.getDiscernId().toString())){
                process.setParentType(sysUserRelationService.getRelation(process.getUserId(),process.getDiscernId()).getRelationName());
                process.setDeptName(sysDepotUserService.getDept(process.getUserId()));
            }else{
                process.setParentType("本人");
                process.setDeptName(sysDepotUserService.getDept(process.getDiscernId()));
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
        //学生
        Integer data1=baseMapper.getCountByUserTypeCreateDate(1,start_time,end_time);
        //家长
        //Integer data2=baseMapper.getCountByUserTypeCreateDate(3,start_time,end_time1);
        //教职工
        Integer data2=baseMapper.getCountByUserTypeCreateDate(2,start_time,end_time);
       // Integer data4=baseMapper.getCountByUserTypeCreateDate(null,start_time,end_time);
        res.put("data1",data1);
        res.put("data2",data2);
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
            Integer enter = baseMapper.getCountByCreateDate(9,start_time,end_time);
            Integer leave = baseMapper.getCountByCreateDate(1,start_time,end_time);
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
        for(int i=0;i<24;i++){
            int h=i*2;
            int h1=(i*2)+2;
            String hour1=i>9?(i+""):("0"+i);
            //String hour1=h>9?(h+""):("0"+h);
           // String hour2=(h1<=9)?("0"+h1):(h1>9&&h1<24)?(h1+""):"23";
            String start_time=date1+" "+hour1+":00:00";
            String end_time=date1+" "+hour1+":59:59";
            Integer flow = baseMapper.getCountByCreateDate(9,start_time,end_time);
            Integer flow1 = baseMapper.getCountByCreateDate(1,start_time,end_time);
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

    @Override
    public IPage getPage(Page page, SysPassProcessDTO sysPassProcessdto) {
        if(ObjectUtil.isNotNull(sysPassProcessdto.getStartTime())){
            String startlocalTime = sysPassProcessdto.getStartTime();
            sysPassProcessdto.setStartTime(startlocalTime+" 00:00:00");
            if(ObjectUtil.isNotNull(sysPassProcessdto.getEndTime())){
                String endlocalTime = sysPassProcessdto.getEndTime();
                sysPassProcessdto.setEndTime(endlocalTime+" 23:59:59");
            }else{
                sysPassProcessdto.setEndTime(startlocalTime+" 23:59:59");
            }
        }else{
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
            String localTime = sdf.format(new Date());
            sysPassProcessdto.setStartTime(localTime+" 00:00:00");
            sysPassProcessdto.setEndTime(localTime+" 23:59:59");
        }
        IPage<SysPassProcessVo> ipage=baseMapper.getPage(page, sysPassProcessdto);
        List<SysPassProcessVo> list =  ipage.getRecords();
        for(SysPassProcessVo process:list){
            if(!process.getUserId().toString().equals( process.getDiscernId().toString())){
                process.setParentType(sysUserRelationService.getRelation(process.getUserId(),process.getDiscernId()).getRelationName());
                process.setDeptName(sysDepotUserService.getDept(process.getUserId()));
            }else{
                process.setParentType("本人");
                process.setDeptName(sysDepotUserService.getDept(process.getDiscernId()));
            }
        }
        ipage.setRecords(list);
        return ipage;
    }

    @Override
    public List<SysPassProcessExcel> getProcess(SysPassProcessDTO sysPassProcessDTO) {
        /*if(StrUtil.isNotEmpty(sysPassProcessDTO.getStartTime())){
            String localTime = sysPassProcessDTO.getStartTime();
            sysPassProcessDTO.setStartTime(localTime+" 00:00:00");
            sysPassProcessDTO.setEndTime(localTime+" 23:59:59");
        }*/
        List<SysPassProcessExcel> list = baseMapper.getProcess(sysPassProcessDTO);
        for(SysPassProcessExcel process:list){
            if(!process.getUserId().toString().equals( process.getDiscernId().toString())){
                process.setParentType(sysUserRelationService.getRelation(process.getUserId(),process.getDiscernId()).getRelationName());
                process.setDeptName(sysDepotUserService.getDept(process.getUserId()));
            }else{
                process.setParentType("本人");
                process.setDeptName(sysDepotUserService.getDept(process.getDiscernId()));
            }
        }
        return list;
    }


}