/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.core.exception.CheckedException;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.core.util.ShiroUtils;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.mapper.SysDepotUserMapper;
import com.tjaide.nursery.barrier.web.service.SysDepotUserService;
import com.tjaide.nursery.barrier.web.service.SysDeptService;
import com.tjaide.nursery.barrier.web.service.SysDictItemService;
import com.tjaide.nursery.barrier.web.service.SysUserRelationService;
import com.tjaide.nursery.barrier.web.util.WebSocketServer;
import com.tjaide.nursery.barrier.web.vo.SysDepotUserVo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

/**
 * <p>
 * 底库管理 服务实现类
 * </p>
 *
 * @author maxinqiong
 * @since 2018-01-20
 */
@Slf4j
@Service
@AllArgsConstructor
public class SysDepotUserServiceImpl extends ServiceImpl<SysDepotUserMapper, SysDepotUser> implements SysDepotUserService {

    private final SysDeptService sysDeptService;
    private final SysDictItemService sysDictItemService;
    private final SysUserRelationService sysUserRelationService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public R importByExcel(List<Map<String, Object>> mapList, Integer depotId, Integer depotType) {
        List<String> errinfo = new ArrayList<>();
        SysDept sysDept = sysDeptService.getOne(Wrappers.<SysDept>lambdaQuery().eq(SysDept::getParentId,"-1"));
        List<SysDictItem> deptNameList= sysDictItemService.list(Wrappers
                .<SysDictItem>query().lambda()
                .eq(SysDictItem::getType, "class_type"));
        // 查询证件类型
        List<SysDictItem> certificateType = sysDictItemService.list(Wrappers
                .<SysDictItem>query().lambda()
                .eq(SysDictItem::getType, "certificate_type"));
        int tempInt = mapList.size() / 30 + 1;
        Map<Integer,Map<String,Object>> oldMap = new HashMap<>();
        List<CompletableFuture> resList = new ArrayList<>();
        ShiroUser shiroUser = ShiroUtils.getUser();
        AtomicReference<Integer> updateNum = new AtomicReference<>(0);
        for (int i = 1; i <= mapList.size(); i++) {
            Map<String,Object> beforeMap = mapList.get(i-1);
            beforeMap.put("operatorId",shiroUser.getUserId());
            beforeMap.put("operatorName",shiroUser.getName());
            oldMap.put(i-1,beforeMap);
            if ( i % tempInt == 0 || (i == mapList.size()  && i % tempInt != 0)) {
                Map<Integer,Map<String,Object>>  finalOldMap = oldMap;
                resList.add(CompletableFuture.supplyAsync(() -> finalOldMap).thenAcceptAsync(e -> {
                    for(Integer key : finalOldMap.keySet()){
                        Map<String, Object> map = finalOldMap.get(key);
                        //姓名 性别 人员类型  班级部门 证件类型  证件号 图片编号（导入图片名称关联）
                        map.put("name", map.remove("姓名"));
                        map.put("gender", map.remove("性别"));
                        map.put("userType", map.remove("人员类型"));
                        map.put("deptId", map.remove("班级/部门"));
                        map.put("certificatType", map.remove("证件类型"));
                        map.put("cardId", map.remove("证件号"));
                        map.put("id", map.remove("人员编号"));
                        if (ObjectUtil.isEmpty(map.get("name"))) {
                            errinfo.add("第" + (key + 1) + "行,姓名不可以为空。");
                            continue;
                        }
                        if (ObjectUtil.isEmpty(map.get("gender"))) {
                            errinfo.add("第" + (key + 1) + "行,性别不可以为空。");
                            continue;
                        }
                        if (ObjectUtil.isEmpty(map.get("userType"))) {
                            errinfo.add("第" + (key + 1) + "行,人员类型不可以为空。");
                            continue;
                        }
                        if (ObjectUtil.isEmpty(map.get("deptId"))) {
                            errinfo.add("第" + (key + 1) + "行,班级部门不可以为空。");
                            continue;
                        }
                        String oldDeptId = map.get("deptId").toString();
                        // 人员类型
                        // {"学生", "教职工","家长","未知"}
                        if ("学生".equals(map.get("userType").toString())) {
                            map.put("userType", 1);
                            if (ObjectUtil.isEmpty(map.get("certificatType"))) {
                                errinfo.add("第" + (key + 1) + "行,证件类型不可以为空。");
                                continue;
                            }
                            if (ObjectUtil.isEmpty(map.get("cardId"))) {
                                errinfo.add("第" + (key + 1) + "行,证件号不可以为空。");
                                continue;
                            }
                            deptNameList.forEach(sysDictItem -> {
                                if (sysDictItem.getLabel().equals(map.get("deptId").toString())) {
                                    map.put("deptId", sysDictItem.getValue());
                                }
                            });
                            if (oldDeptId.equals(map.get("deptId").toString())) {
                                errinfo.add("第" + (key + 1) + "行,班级部门不符合规范，学生/家长请选择班级");
                                continue;
                            }

                        } else if ("教职工".equals(map.get("userType").toString())) {
                            map.put("userType", 2);
//                            if (ObjectUtil.isEmpty(map.get("certificatType"))) {
//                                errinfo.add("第" + (key + 1) + "行,证件类型不可以为空。");
//                                continue;
//                            }
//                            if (ObjectUtil.isEmpty(map.get("cardId"))) {
//                                errinfo.add("第" + (key + 1) + "行,证件号不可以为空。");
//                                continue;
//                            }
                            // 部门
                            if (sysDept.getDeptName().equals(map.get("deptId").toString())) {
                                map.put("deptId", sysDept.getDeptId());
                            }
                            if (oldDeptId.equals(map.get("deptId").toString())) {
                                errinfo.add("第" + (key + 1) + "行,班级部门不符合规范，教职工/未知请选择学校部门");
                                continue;
                            }
                        } else if ("家长".equals(map.get("userType").toString())) {
                            map.put("userType", 3);
                            deptNameList.forEach(sysDictItem -> {
                                if (sysDictItem.getLabel().equals(map.get("deptId").toString())) {
                                    map.put("deptId", sysDictItem.getValue());
                                }
                            });
                            if (oldDeptId.equals(map.get("deptId").toString())) {
                                errinfo.add("第" + (key + 1) + "行,班级部门不符合规范，学生/家长请选择班级");
                                continue;
                            }
                        } else if ("未知".equals(map.get("userType").toString())) {
                            map.put("userType", 9);
                            // 部门
                            if (sysDept.getDeptName().equals(map.get("deptId").toString())) {
                                map.put("deptId", sysDept.getDeptId());
                            }
                            if (oldDeptId.equals(map.get("deptId").toString())) {
                                errinfo.add("第" + (key + 1) + "行,班级部门不符合规范，教职工/未知请选择学校部门");
                                continue;
                            }
                        } else {
                            errinfo.add("第" + (key + 1) + "行,人员类型不符合规范。");
                            continue;
                        }
                       // 查询赋值
                        // 性别 0男 1女
                        if ("男".equals(map.get("gender").toString())) {
                            map.put("gender", 0);
                        } else if ("女".equals(map.get("gender").toString())) {
                            map.put("gender", 1);
                        } else if ("未知".equals(map.get("gender").toString())) {
                            map.put("gender", 2);
                        }else {
                            errinfo.add("第" + (key + 1) + "行,性别不符合规范。");
                            continue;
                        }


                        // 证件类型
                        String oldCertificatType = map.get("certificatType").toString();
                        certificateType.forEach(sysDictItem -> {
                            if (sysDictItem.getLabel().equals(map.get("certificatType").toString())) {
                                map.put("certificatType", sysDictItem.getValue());
                            }
                        });
                        if (oldCertificatType.equals(map.get("certificatType").toString())) {
                            errinfo.add("第" + (key + 1) + "行,证件类型不符合规范。");
                            continue;
                        }
                        SysDepotUser userNew = BeanUtil.toBean(map, SysDepotUser.class);
                        userNew.setDepotType(depotType);
                        userNew.setDepotId(depotId);
                        userNew.setDelFlag("0");
                        userNew.setTenantId(1);
                        userNew.setCreateTime(LocalDateTime.now());
                        // 人员编号 不写的话自动创建 存在则更新
                        SysDepotUser sysDepotUser = baseMapper.selectOne(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getId,map.get("id")));
                        boolean ret = false;
                        if (ObjectUtil.isNotEmpty(sysDepotUser)) {
                            userNew.setId(sysDepotUser.getId());
                            ret = this.saveOrUpdate(userNew);
                            updateNum.getAndSet(updateNum.get() + 1);
                        }else{
                            ret = this.save(userNew);
                        }
                        if (!ret) {
                            errinfo.add("第" + (key + 1) + "行,导入用出入人员异常。");
                            continue;
                        }
                    }

                }));
                oldMap = new HashMap<>();
            }
        }
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        if (errinfo.size() > 0) {
            throw new CheckedException(errinfo, "导入失败");
        }
        return R.ok("导入成功,新增了"+(mapList.size() - updateNum.get())+"人,更新已有用户"+updateNum.get()+"人");
    }

    @Override
    @Transactional
    public R updatePhoto(String path,String filePath) {
        File contentsFile = new File(path);
        AtomicInteger studentNum = new AtomicInteger();
        AtomicInteger teacherNum = new AtomicInteger();
        AtomicInteger parentNum = new AtomicInteger();
        // 学校
        List<CompletableFuture> resList = new ArrayList<>();
        String operatorId = ShiroUtils.getUser().getUserId();
        String operatorName = ShiroUtils.getUser().getName();
        File[] school = contentsFile.listFiles();

        List<File>  resFiles = readfile(contentsFile.listFiles());
        DecimalFormat df = new DecimalFormat("0.0000");
        Map<String,Object> res = new HashMap<>();
        res.put("data",df.format(0.2+0.8*Double.valueOf(studentNum.get()+teacherNum.get()+parentNum.get()) / resFiles.size()));
        WebSocketServer.sendInfo(JSONUtil.toJsonStr(res), "upload");
        if(school.length == 1&&school[0].isDirectory()){
            // 更新学校 schoolname
            sysDeptService.update(Wrappers.<SysDept>lambdaUpdate().eq(SysDept::getParentId,-1).set(SysDept::getDeptName,school[0].getName()));
            // 下级目录
            File[] classes = school[0].listFiles();
            List<SysDictItem> lists = sysDictItemService.getAllItem("class_type");
            AtomicReference<Integer> value = new AtomicReference<>(lists.size());
            for(File classOne:classes){
                resList.add(CompletableFuture.supplyAsync(() -> classOne).thenAcceptAsync(e -> {
                    // 创建班级下所有学生
                    String classname = classOne.getName();
                    SysDictItem sysDictItem = sysDictItemService.getOne(Wrappers.<SysDictItem>lambdaQuery().eq(SysDictItem::getLabel, classname).eq(SysDictItem::getType, "class_type"));
                    Integer deptId = 1;
                    Integer userType = 9;
                    if (!"教职工".equals(classname)) {
                        if (ObjectUtil.isEmpty(sysDictItem)) {
                            sysDictItem = new SysDictItem();
                            sysDictItem.setLabel(classname);
                            sysDictItem.setDescription("导入创建");
                            sysDictItem.setDictId(95);
                            sysDictItem.setSort(-1);
                            sysDictItem.setType("class_type");
                            sysDictItem.setValue("0");
                            sysDictItemService.save(sysDictItem);
                        } else {
                            sysDictItem.setLabel(classname);
                            sysDictItem.setDescription("导入创建");
                        }
                        sysDictItem.setValue(sysDictItem.getId()+"");
                        sysDictItemService.updateDictItem(sysDictItem);
                        deptId = Integer.parseInt(sysDictItem.getValue());
                        userType = 1;
                    } else {
                        userType = 2;
                    }
                    // 创建学生
                    File[] students =  classOne.listFiles();
                    for (File student : students) {
                        SysDepotUser sysDepotUser = new SysDepotUser();
                        sysDepotUser.setDepotId(-1);
                        sysDepotUser.setDepotType(0);
                        sysDepotUser.setDeptId(deptId);
                        sysDepotUser.setGender(2);
                        sysDepotUser.setName(student.getName().split("\\.")[0]);
                        sysDepotUser.setUserType(userType);
                        sysDepotUser.setCertificateType(0);
                        sysDepotUser.setCardId("暂无");
                        sysDepotUser.setAddress("");
                        sysDepotUser.setOperatorId(Integer.parseInt(operatorId));
                        sysDepotUser.setOperatorName(operatorName);
                        sysDepotUser.setTenantId(1);

                        this.save(sysDepotUser);
                        if (userType == 2) {
                            teacherNum.getAndIncrement();
                            res.put("data",df.format(0.2+0.8*Double.valueOf(studentNum.get()+teacherNum.get()+parentNum.get()) / resFiles.size()));
                            WebSocketServer.sendInfo(JSONUtil.toJsonStr(res), "upload");
                            String uuid = sysDepotUser.getId().toString();
                            new File(filePath + File.separator + "reg").mkdirs();
                            try {
                                IoUtil.copy(new FileInputStream(student), new FileOutputStream(new File(filePath + File.separator + "reg" + File.separator + uuid + ".jpeg")));
                            } catch (FileNotFoundException ex) {
                                ex.printStackTrace();
                            }
                            sysDepotUser.setPhoto("/api/image/view/reg/" + uuid);
                            this.updateById(sysDepotUser);
                        } else {
                            studentNum.getAndIncrement();
                            res.put("data",df.format(0.2+0.8*Double.valueOf(studentNum.get()+teacherNum.get()+parentNum.get()) / resFiles.size()));
                            WebSocketServer.sendInfo(JSONUtil.toJsonStr(res), "upload");
                            File[] photo = student.listFiles();
                            if(ObjectUtil.isEmpty(photo)){
                                continue;
                            }
                            for (File file : photo) {
                               String fileName = FileUtil.getName(file).split("\\.")[0];
                                if(fileName.indexOf("-") > -1){
                                    // 添加家长
                                    String parentname = fileName.split("-")[1];
                                    String peoplename = student.getName()+"("+parentname+")";
                                    SysDictItem parentDictItem = sysDictItemService.getOne(Wrappers.<SysDictItem>lambdaQuery().eq(SysDictItem::getLabel,parentname).eq(SysDictItem::getType,"parent_type"));
                                    SysDepotUser sysDepotUserParent = new SysDepotUser();
                                    sysDepotUserParent.setDepotId(-1);
                                    sysDepotUserParent.setDepotType(0);
                                    sysDepotUserParent.setDeptId(deptId);
                                    sysDepotUserParent.setGender(2);
                                    sysDepotUserParent.setName(peoplename);
                                    sysDepotUserParent.setCertificateType(0);
                                    sysDepotUserParent.setCardId("暂无");
                                    sysDepotUserParent.setUserType(3);
                                    sysDepotUserParent.setAddress("");
                                    sysDepotUserParent.setOperatorId(Integer.parseInt(operatorId));
                                    sysDepotUserParent.setOperatorName(operatorName);
                                    sysDepotUserParent.setTenantId(1);
                                    this.save(sysDepotUserParent);
                                    parentNum.getAndIncrement();
                                    res.put("data",df.format(0.2+0.8*Double.valueOf(studentNum.get()+teacherNum.get()+parentNum.get()) / resFiles.size()));
                                    WebSocketServer.sendInfo(JSONUtil.toJsonStr(res), "upload");
                                    String uuid = sysDepotUserParent.getId().toString();
                                    SysUserRelation sysUserRelation = new SysUserRelation();
                                    sysUserRelation.setMemberId(sysDepotUserParent.getId());
                                    sysUserRelation.setRelationType(Integer.parseInt(ObjectUtil.isEmpty(parentDictItem)?"-1":parentDictItem.getValue()));
                                    sysUserRelation.setUserId(sysDepotUser.getId());
                                    sysUserRelationService.saveOrUpdateRelation(sysUserRelation);

                                    new File(filePath + File.separator + "reg").mkdirs();
                                    try {
                                        IoUtil.copy(new FileInputStream(file), new FileOutputStream(new File(filePath + File.separator + "reg" + File.separator + uuid + ".jpeg")));
                                    } catch (FileNotFoundException ex) {
                                        ex.printStackTrace();
                                    }
                                    sysDepotUserParent.setPhoto("/api/image/view/reg/" + uuid);
                                    this.updateById(sysDepotUserParent);
                                }else {
                                    // 添加学生
                                    String uuid = sysDepotUser.getId().toString();
                                    new File(filePath + File.separator + "reg").mkdirs();
                                    try {
                                        IoUtil.copy(new FileInputStream(file), new FileOutputStream(new File(filePath + File.separator + "reg" + File.separator + uuid + ".jpeg")));
                                    } catch (FileNotFoundException ex) {
                                        ex.printStackTrace();
                                    }
                                    sysDepotUser.setPhoto("/api/image/view/reg/" + uuid);
                                    this.updateById(sysDepotUser);
                                }

                            }
                        }
                    }
                }));
            }

            CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
            all.join();
            WebSocketServer.sendInfo("{\"msg\":\"完成\"}", "upload");
            return R.ok("更新照片，成功更新学生:"+studentNum+"，教师："+teacherNum+"，家长："+parentNum);
        }else{
            return R.failed("压缩包目录不符合学校->班级->学生");
        }
//        List<File>  resFiles = readfile(contentsFile.listFiles());
//        int tempInt = resFiles.size() / 30 + 1;
//        AtomicReference<Integer> error = new AtomicReference<>(0);
//        List<String> errorFiles = new ArrayList<>();
//        List<File> oldList = new ArrayList<>();
//        Map<Integer,List<SysUserRelation>> relationMap = new HashMap<>();
//        for (int i = 1; i <= resFiles.size(); i++) {
//            oldList.add(resFiles.get(i-1));
//            if ( i % tempInt == 0 || (i == resFiles.size()  && i % tempInt != 0)) {
//                // 多个班级
//                List<File> finalOldMap = oldList;
//                resList.add(CompletableFuture.supplyAsync(() -> finalOldMap).thenAcceptAsync(e -> {
//                    for (File file : e) {
//                        String fileName = FileUtil.mainName(file);
//                        String names[] = FileUtil.getAbsolutePath(file).replace(path + File.separator, "").split(File.separator);
//                        if (names.length != 4) {
//                            errorFiles.add(fileName);
//                            continue;
//                        }else{
//                            SysDepotUser sysDepotUser = new SysDepotUser();
//                            String schoolname = names[0];
//                            String classname = names[1];
//                            String peoplename = names[2];
//                            Integer deptId = -1;
//                            Integer userType = 9;
//                            // 创建班级
//                            //synchronized (this) {
//                                SysDictItem sysDictItem = sysDictItemService.getOne(Wrappers.<SysDictItem>lambdaQuery().eq(SysDictItem::getLabel, classname).eq(SysDictItem::getType, "class_type"));
//                                List<SysDictItem> lists = sysDictItemService.getAllItem("class_type");
//                                if (!"教职工".equals(classname)) {
//                                    if (ObjectUtil.isEmpty(sysDictItem)) {
//                                        sysDictItem = new SysDictItem();
//                                        sysDictItem.setLabel(classname);
//                                        sysDictItem.setDescription("导入创建");
//                                        sysDictItem.setDictId(95);
//                                        sysDictItem.setSort(lists.size());
//                                        sysDictItem.setType("class_type");
//                                        sysDictItem.setValue(lists.size() + "");
//                                    } else {
//                                        sysDictItem.setLabel(classname);
//                                        sysDictItem.setDescription("导入创建");
//                                    }
//                                    sysDictItemService.saveOrUpdate(sysDictItem);
//                                    deptId = Integer.parseInt(sysDictItem.getValue());
//                                } else {
//                                    userType = 2;
//                                }
//                            //}
//
//
//                            SysDictItem parentDictItem = null;
//                            if(fileName.indexOf("-") > -1){
//                                // 添加家长
//                                String parentname = fileName.split("-")[1];
//                                peoplename = peoplename+"("+parentname+")";
//                                userType = 3;
//                                parentDictItem = sysDictItemService.getOne(Wrappers.<SysDictItem>lambdaQuery().eq(SysDictItem::getLabel,parentname).eq(SysDictItem::getType,"parent_type"));
//
//                            }else{
//                                // 添加学生
//                                userType = 1;
//                            }
//
//
//                            sysDepotUser.setDepotId(0);
//                            sysDepotUser.setDepotType(-1);
//                            sysDepotUser.setDeptId(deptId);
//                            sysDepotUser.setGender(0);
//                            sysDepotUser.setName(peoplename);
//                            sysDepotUser.setUserType(userType);
//                            sysDepotUser.setAddress("");
//                            sysDepotUser.setOperatorId(Integer.parseInt(operatorId));
//                            sysDepotUser.setOperatorName(operatorName);
//                            this.save(sysDepotUser);
//                            if(userType == 3){
//                                SysUserRelation sysUserRelation = new SysUserRelation();
//                                sysUserRelation.setMemberId(sysDepotUser.getId());
//                                sysUserRelation.setRelationType(Integer.parseInt(ObjectUtil.isEmpty(parentDictItem)?"-1":parentDictItem.getValue()));
//
//                                if(ObjectUtil.isNotEmpty(relationMap.get(sysDepotUser.getId()))){
//                                    relationMap.get(sysDepotUser.getId()).add(sysUserRelation);
//                                }else{
//                                    List<SysUserRelation> list = new ArrayList<>();
//                                    list.add(sysUserRelation);
//                                    relationMap.put(sysDepotUser.getId(),list);
//                                }
//                            }
//                            String uuid = sysDepotUser.getId().toString();
//                            new File(filePath+File.separator+"reg").mkdirs();
//                            try {
//                                IoUtil.copy(new FileInputStream(file),new FileOutputStream(new File(filePath+File.separator+"reg"+File.separator+uuid+".jpeg")));
//                            } catch (FileNotFoundException ex) {
//                                ex.printStackTrace();
//                            }
//                            sysDepotUser.setPhoto("/api/image/view/reg/"+uuid);
//                            this.updateById(sysDepotUser);
//                        }
////                        List<SysDepotUser> lists = this.list(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getPhoto, fileName));
////                        SysDepotUser one;
////                        if (lists.size() > 0) {
////                            one = lists.get(0);
////                        } else {
////                            one = this.getOne(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getCardId, fileName));
////                        }
////                        if(ObjectUtil.isNotEmpty(one)) {
////                            String uuid = one.getId().toString();
////                            new File(filePath+File.separator+"reg").mkdirs();
////                            try {
////                                IoUtil.copy(new FileInputStream(file),new FileOutputStream(new File(filePath+File.separator+"reg"+File.separator+uuid+".jpeg")));
////                            } catch (FileNotFoundException ex) {
////                                ex.printStackTrace();
////                            }
////                            one.setPhoto("/api/image/view/reg/"+uuid);
////                            boolean ret = this.updateById(one);
////                        }else{
////                            error.getAndSet(error.get() + 1);
////                        }
//                    }
//                }));
//                oldList = new ArrayList<>();
//            }
//        }
//        R.ok("更新照片，成功更新"+(resFiles.size() - error.get())+",未匹配照片数"+error.get());
    }

    @Override
    public List<SysDepotUser> enterDepotUser() {
        return baseMapper.enterDepotUser();
    }

    @Override
    public List<Integer> getGraduation(boolean isRemoveTeacher) {
        return baseMapper.getGraduation(isRemoveTeacher);
    }

    private static List<File> readfile(File[] files) {
        List<File> resFile = new ArrayList<>();
        if (files == null) {// 如果目录为空，直接退出
            return null;
        }
        for (File f : files) {
            if (f.isFile()) {
                resFile.add(f);
            }else if (f.isDirectory()) {
                if(f.getPath().indexOf("__MACOSX")>-1){
                    continue;
                }
                resFile.addAll(readfile(f.listFiles()));
            }
        }
        return resFile;
    }


    @Override
    public IPage relationPage(Page page, SysDepotUser sysDepotUser, Integer id){
        return baseMapper.relationPage(page,sysDepotUser,id);
    }

    @Override
    public IPage getpage(Page page, SysDepotUser sysDepotUser){
        IPage ipage=baseMapper.userPage(page,sysDepotUser);
        List<SysDepotUserVo> list=ipage.getRecords();
        for(SysDepotUserVo userVo:list){
            String parentName="";
            for(SysDepotUser user:userVo.getParents()){
                parentName+=ObjectUtil.isNotEmpty(parentName)?","+user.getName():user.getName();
            }
            userVo.setParentName(parentName);
        }
        ipage.setRecords(list);
        return ipage;
    }



    @Override
    public String getDept(Integer user_id){
        SysDepotUser user=baseMapper.getUserById(user_id);
        //人员类型（1学生2教职工3家长9未知）
        String deptName="";
        if(user.getUserType()==1){
            SysDictItem dictName= sysDictItemService.getOne(Wrappers
                    .<SysDictItem>query().lambda()
                    .eq(SysDictItem::getType, "class_type")
            .eq(SysDictItem::getValue,user.getDeptId()));
            deptName=ObjectUtil.isEmpty(dictName)?"已毕业":dictName.getLabel();
        }else if(user.getUserType()==2){
            SysDept dept=sysDeptService.getOne(Wrappers
                    .<SysDept>query().lambda()
                    .eq(SysDept::getDeptId,user.getDeptId()));
            deptName=ObjectUtil.isEmpty(dept)?"已注销":dept.getDeptName();
        }
        return deptName;
    }

    @Override
    public List<LinkedHashMap<String,Object>> userList() {
        return baseMapper.userList();
    }

}
