/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.ObjectUtil;
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
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
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
                        map.put("photo", map.remove("图片编号（导入图片名称关联）"));
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
                            if (ObjectUtil.isEmpty(map.get("certificatType"))) {
                                errinfo.add("第" + (key + 1) + "行,证件类型不可以为空。");
                                continue;
                            }
                            if (ObjectUtil.isEmpty(map.get("cardId"))) {
                                errinfo.add("第" + (key + 1) + "行,证件号不可以为空。");
                                continue;
                            }
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
                        } else {
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
                        SysDepotUser sysDepotUser = baseMapper.selectOne(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getCardId,map.get("cardId")));
                        boolean ret = false;
                        if (ObjectUtil.isNotEmpty(sysDepotUser)) {
                            userNew.setId(sysDepotUser.getId());
                            ret = this.updateById(userNew);
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
    public R updatePhoto(String path,String filePath) {
        File contentsFile = new File(path);
        List<File>  resFiles = readfile(contentsFile.listFiles());
        int tempInt = resFiles.size() / 30 + 1;
        AtomicReference<Integer> error = new AtomicReference<>(0);
        List<File> oldList = new ArrayList<>();
        List<CompletableFuture> resList = new ArrayList<>();
        for (int i = 1; i <= resFiles.size(); i++) {
            oldList.add(resFiles.get(i-1));
            if ( i % tempInt == 0 || (i == resFiles.size()  && i % tempInt != 0)) {
                List<File> finalOldMap = oldList;
                resList.add(CompletableFuture.supplyAsync(() -> finalOldMap).thenAcceptAsync(e -> {
                    e.forEach(file -> {
                        String fileName = FileUtil.mainName(file);
                        List<SysDepotUser> lists = this.list(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getPhoto, fileName));
                        SysDepotUser one;
                        if (lists.size() > 0) {
                            one = lists.get(0);
                        } else {
                            one = this.getOne(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getCardId, fileName));
                        }
                        if(ObjectUtil.isNotEmpty(one)) {
                            String uuid = one.getId().toString();
                            new File(filePath+File.separator+"reg").mkdirs();
                            try {
                                IoUtil.copy(new FileInputStream(file),new FileOutputStream(new File(filePath+File.separator+"reg"+File.separator+uuid+".jpeg")));
                            } catch (FileNotFoundException ex) {
                                ex.printStackTrace();
                            }
                            one.setPhoto("/api/image/view/reg/"+uuid);
                            boolean ret = this.updateById(one);
                        }else{
                            error.getAndSet(error.get() + 1);
                        }
                    });
                }));
                oldList = new ArrayList<>();
            }
        }
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        return R.ok("更新照片，成功更新"+(resFiles.size() - error.get())+",未匹配照片数"+error.get());
    }

    @Override
    public List<SysDepotUser> enterDepotUser() {
        return baseMapper.enterDepotUser();
    }

    @Override
    public List<Integer> getGraduation() {
        return baseMapper.getGraduation();
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

}
