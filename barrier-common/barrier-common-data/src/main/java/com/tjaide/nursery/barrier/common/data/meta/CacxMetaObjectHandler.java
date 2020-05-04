/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.common.data.meta;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.tjaide.nursery.barrier.common.core.util.ShiroUtils;
import org.apache.ibatis.reflection.MetaObject;

import java.time.LocalDateTime;

/**
 * 填充器
 * 构建组：dcmx
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年07月20日-13:40

 *
 * @author 86130
 */
public class CacxMetaObjectHandler implements MetaObjectHandler {

    /**
     * Field 创建时间
     */
    private static final String CREATETIME = "createTime";

    /**
     * Field 更新时间
     */
    private static final String UPDATETIME = "updateTime";


    /**
     * Field 创建者ID
     */
    private static final String OPERATORID = "operatorId";


    /**
     * Field 创建者名字
     */
    private static final String OPERATORNAME = "operatorName";

    /**
     * 自动填充插入
     *
     * @param metaObject of type MetaObject
     */
    @Override
    public void insertFill(MetaObject metaObject) {


        // 创建时间
        if (metaObject.hasGetter(CREATETIME) && StrUtil.isEmptyIfStr(metaObject.getValue(CREATETIME))) {
            metaObject.setValue(CREATETIME, LocalDateTime.now());
        }
        // 更新时间
        if (metaObject.hasGetter(UPDATETIME) && StrUtil.isEmptyIfStr(metaObject.getValue(UPDATETIME))) {
            metaObject.setValue(UPDATETIME, LocalDateTime.now());
        }
        // 用户ID
        if (metaObject.hasGetter(OPERATORID) && StrUtil.isEmptyIfStr(metaObject.getValue(OPERATORID))) {
            metaObject.setValue(OPERATORID, ShiroUtils.getUser().getUserId());
        }
        // 用户名
        if (metaObject.hasGetter(OPERATORNAME) && StrUtil.isEmptyIfStr(metaObject.getValue(OPERATORNAME))) {
            metaObject.setValue(OPERATORNAME, ShiroUtils.getUser().getName());
        }
    }

    /**
     * 更新时候自动填充
     *
     * @param metaObject of type MetaObject
     */
    @Override
    public void updateFill(MetaObject metaObject) {
        // 更新时间
        if (metaObject.hasGetter(UPDATETIME) && StrUtil.isEmptyIfStr(metaObject.getValue(UPDATETIME))) {
            metaObject.setValue(UPDATETIME, LocalDateTime.now());
        }
        // 用户ID
        if (metaObject.hasGetter(OPERATORID) && StrUtil.isEmptyIfStr(metaObject.getValue(OPERATORID))) {
            metaObject.setValue(OPERATORID, ShiroUtils.getUser().getUserId());
        }
        // 用户名
        if (metaObject.hasGetter(OPERATORNAME) && StrUtil.isEmptyIfStr(metaObject.getValue(OPERATORNAME))) {
            metaObject.setValue(OPERATORNAME, ShiroUtils.getUser().getName());
        }
    }
}
