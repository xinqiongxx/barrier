/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.service.SysDepotUserService;
import com.tjaide.nursery.barrier.web.service.SysDeptRelationService;
import com.tjaide.nursery.barrier.web.service.SysDeptService;
import com.tjaide.nursery.barrier.web.service.SysDictItemService;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Decoder;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class AsyncServiceImpl {

    @Autowired
    private SysDeptRelationService sysDeptRelationService;
    @Autowired
    private SysDeptService sysDeptService;
    @Autowired
    private SysDepotUserService sysDepotUserService;
    @Autowired
    private SysDictItemService sysDictItemService;
    @Value("${file.path}")
    private String filePath;

    @Async
    public void syncDept() {
        if (sysDeptRelationService.count() == 0) {
            // 初始化部门分支
            for (SysDept sysDept : sysDeptService.list()) {
                sysDeptRelationService.insertDeptRelation(sysDept);
            }
        }
    }

    @SneakyThrows
    @Async
    public void savePhoto(String base64Img,String fileName){
        // "match fileName"
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] b = decoder.decodeBuffer(base64Img.replace("data:image/jpeg;base64,", ""));
        ByteArrayInputStream bais = new ByteArrayInputStream(b);
        new File(filePath+File.separator+"match").mkdirs();
        IoUtil.copy(bais, new FileOutputStream(new File(filePath + File.separator + "match" + File.separator + fileName + ".jpeg")));
    }

    @Async
    public void insertAttendance(SysPassProcess sysPassProcess,String deviceId,String base64,Integer type){
        Integer userId = sysPassProcess.getUserId();
        String typeName = "本人";
        if(type != -99){
            typeName = sysDictItemService.getOne(Wrappers.<SysDictItem>lambdaQuery().eq(SysDictItem::getValue,type).eq(SysDictItem::getType,"parent_type")).getLabel();
        }
        SysDepotUser sysDepotUser = sysDepotUserService.getById(userId);
        Map<String,Object> res = new HashMap<String,Object>();
        res.put("yeyjcqkxx_xm",sysDepotUser.getName());
        res.put("yeyjcqkxx_num",sysDepotUser.getCardId());
        res.put("yeyjcqkxx_photo",base64);
        res.put("yeyjcqkxx_parent",typeName);
        res.put("yeyjcqkxx_io",sysPassProcess.getEnterType());
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        res.put("yeyjcqkxx_time", sysPassProcess.getCreateTime().format(formatter2));
        res.put("yeyjcqkxx_device",deviceId);
        SysDept sysDept = sysDeptService.getOne(Wrappers.<SysDept>lambdaQuery().eq(SysDept::getParentId,-1));
        if(StrUtil.isNotEmpty(sysDept.getDeptCode())&&sysDept.getDeptCode().startsWith("http")) {
            HttpRequest httpRequest = HttpUtil.createPost(sysDept.getDeptCode());
            httpRequest.header("Content-Type", "application/json");
            httpRequest.body(JSONUtil.parseObj(res));
            HttpResponse httpResponse = httpRequest.execute();
            JSONObject jsonObject = JSONUtil.parseObj(httpResponse.body());
            if("0".equals(jsonObject.get("code").toString())){
                log.error("推送考勤"+jsonObject.get("message"));
            }else{
                log.error("推送考勤"+jsonObject.get("message"));
            }
        }

    }


}
