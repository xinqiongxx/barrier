/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tjaide.nursery.barrier.common.core.exception.CheckedException;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.shiro.util.PasswordUtil;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.mapper.SysDepotUserMapper;
import com.tjaide.nursery.barrier.web.service.SysDepotUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public R importByExcel(List<Map<String, Object>> mapList) {
       /* List<String> errinfo = new ArrayList<>();
        boolean ifError = false;

        for (int i = 0; i < mapList.size(); i++) {
            Map<String, Object> map = mapList.get(i);
            //姓名 性别 人员类型  班级部门 证件类型  证件号 图片编号（导入图片名称关联）
            map.put("name", map.remove("姓名"));
            map.put("gender", map.remove("性别"));
            map.put("userType", map.remove("人员类型"));
            map.put("deptId", map.remove("班级部门"));
            map.put("userType", map.remove("证件类型"));
            map.put("userType", map.remove("人员类型"));

            SysUser userNew = BeanUtil.toBean(map, SysUser.class);
            if (StringUtils.isEmpty(userNew.getUsername())) {
                ifError = true;
                errinfo.add("第" + (i + 1) + "行,用户名不可以为空。");
                continue;
            }
            if (StringUtils.isEmpty(userNew.getName())) {
                ifError = true;
                errinfo.add("第" + (i + 1) + "行,姓名不可以为空。");
                continue;
            }
            if (null != this.getOne(Wrappers.<SysUser>lambdaQuery().eq(SysUser::getUsername, userNew.getUsername()))) {
                ifError = true;
                errinfo.add("第" + (i + 1) + "行,用户已经存在。");
                continue;
            }
            userNew.setDelFlag("0");
            userNew.setLockFlag("0");
            boolean ret = this.saveOrUpdate(userNew);
            if (!ret) {
                ifError = true;
                errinfo.add("第" + (i + 1) + "行,导入用户异常。");
                continue;
            }
            map.put("deptName", map.remove("部门"));
            String deptNames = ObjectUtil.isNull(map.get("deptName")) ? "" : map.get("deptName").toString();
            SysUserDept deptNew = new SysUserDept();
            deptNew.setUserId(userNew.getUserId());
            for (int j = 0; j < deptNames.split(",").length; j++) {
                String str = deptNames.split(",")[j];
                SysDept deptMap = sysDeptService.getOne(Wrappers.<SysDept>lambdaQuery().eq(SysDept::getDeptName, str));
                if (ObjectUtil.isNull(deptMap)) {
                    ifError = true;
                    errinfo.add("第" + (i + 1) + "行，第" + (j + 1) + "个,部门有误。");
                    continue;
                } else {
                    deptNew.setDeptId(deptMap.getDeptId());
                    ret = sysUserDeptService.save(deptNew);
                    if (!ret) {
                        ifError = true;
                        errinfo.add("第" + (i + 1) + "行,导入用户部门关系异常。");
                        continue;
                    }
                }
            }
            map.put("roleNames", map.remove("角色"));
            String roleNames = ObjectUtil.isNull(map.get("roleNames")) ? "" : map.get("roleNames").toString();
            if ("" == roleNames) {
                ifError = true;
                errinfo.add("第" + (i + 1) + "行,角色不能为空。");
                continue;
            } else {
                SysUserRole roleNew = new SysUserRole();
                roleNew.setUserId(userNew.getUserId());
                for (int j = 0; j < roleNames.split(",").length; j++) {
                    String str = roleNames.split(",")[j];
                    SysRole roleMap = sysRoleService.getOne(Wrappers.<SysRole>lambdaQuery().eq(SysRole::getRoleName, str));
                    if (null == roleMap) {
                        ifError = true;
                        errinfo.add("第" + (i + 1) + "行，第" + (j + 1) + "个,角色有误。");
                        continue;
                    } else {
                        roleNew.setRoleId(roleMap.getRoleId());
                        ret = sysUserRoleService.save(roleNew);
                        if (!ret) {
                            ifError = true;
                            errinfo.add("第" + (i + 1) + "行,导入用户角色关系异常。");
                            continue;
                        }
                    }
                }
            }
        }
        if (ifError) {
            throw new CheckedException(errinfo, "导入失败");
        }*/
        return R.ok("导入成功");
    }

}
