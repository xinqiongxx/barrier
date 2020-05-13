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
public class BarrierMetaObjectHandler implements MetaObjectHandler {

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
        if (metaObject.hasGetter(CREATETIME)&&StrUtil.isEmptyIfStr(getFieldValByName(CREATETIME,metaObject))) {
            setFieldValByName(CREATETIME, LocalDateTime.now(),metaObject);
        }
        // 更新时间
        if (metaObject.hasGetter(UPDATETIME)&&StrUtil.isEmptyIfStr(getFieldValByName(UPDATETIME,metaObject))) {
            setFieldValByName(UPDATETIME, LocalDateTime.now(),metaObject);
        }
        // 用户ID
        if (metaObject.hasGetter(OPERATORID)&&StrUtil.isEmptyIfStr(getFieldValByName(OPERATORID,metaObject))) {
            setFieldValByName(OPERATORID, Integer.parseInt(ShiroUtils.getUser().getUserId()),metaObject);
        }
        // 用户名
        if (metaObject.hasGetter(OPERATORNAME)&&StrUtil.isEmptyIfStr(getFieldValByName(OPERATORNAME,metaObject))) {
            setFieldValByName(OPERATORNAME, ShiroUtils.getUser().getName(),metaObject);
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
        if (metaObject.hasGetter(UPDATETIME)&&StrUtil.isEmptyIfStr(getFieldValByName(UPDATETIME,metaObject))) {
            setFieldValByName(UPDATETIME, LocalDateTime.now(),metaObject);
        }
        // 用户ID
        if (metaObject.hasGetter(OPERATORID)&&StrUtil.isEmptyIfStr(getFieldValByName(OPERATORID,metaObject))) {
            setFieldValByName(OPERATORID, Integer.parseInt(ShiroUtils.getUser().getUserId()),metaObject);
        }
        // 用户名
        if (metaObject.hasGetter(OPERATORNAME)&&StrUtil.isEmptyIfStr(getFieldValByName(OPERATORNAME,metaObject))) {
            setFieldValByName(OPERATORNAME, ShiroUtils.getUser().getName(),metaObject);
        }
    }
}
