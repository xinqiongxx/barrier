/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.io.IoUtil;
import com.tjaide.nursery.barrier.web.entity.SysDept;
import com.tjaide.nursery.barrier.web.service.SysDeptRelationService;
import com.tjaide.nursery.barrier.web.service.SysDeptService;
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

@Slf4j
@Service
public class AsyncServiceImpl {

    @Autowired
    private SysDeptRelationService sysDeptRelationService;
    @Autowired
    private SysDeptService sysDepstService;
    @Value("${file.path}")
    private String filePath;

    @Async
    public void syncDept() {
        if (sysDeptRelationService.count() == 0) {
            // 初始化部门分支
            for (SysDept sysDept : sysDepstService.list()) {
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


}
