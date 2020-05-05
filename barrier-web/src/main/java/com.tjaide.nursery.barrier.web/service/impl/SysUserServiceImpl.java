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
import com.tjaide.nursery.barrier.web.service.*;
import com.tjaide.nursery.barrier.web.vo.UserVO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author maxinqiong
 * @date 2017/10/31
 */
@Slf4j
@Service
@AllArgsConstructor
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {
    private final SysMenuService sysMenuService;
    private final SysRoleService sysRoleService;
    private final SysDeptService sysDeptService;
    private final SysUserRoleService sysUserRoleService;
    private final SysUserDeptService sysUserDeptService;
    private final SysDeptRelationService sysDeptRelationService;
    /**
     * 保存用户信息
     *
     * @param userDto DTO 对象
     * @return success/fail
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean saveUser(UserDTO userDto) {
        SysUser sysUser = new SysUser();
        BeanUtils.copyProperties(userDto, sysUser);
        sysUser.setDelFlag(CommonConstants.STATUS_NORMAL);
        Map<String, Object> passwordMap = PasswordUtil.encryptSaltPassword(userDto.getPassword());
        sysUser.setSalt(passwordMap.get("salt").toString());
        sysUser.setPassword(passwordMap.get("password").toString());
        this.saveOrUpdate(sysUser);
        List<SysUserRole> userRoleList = userDto.getRole().stream().map(roleId -> {
            SysUserRole userRole = new SysUserRole();
            userRole.setUserId(sysUser.getUserId());
            userRole.setRoleId(roleId);
            return userRole;
        }).collect(Collectors.toList());
        List<SysUserDept> userDeptList = userDto.getDepts().stream().map(deptId -> {
            SysUserDept userDept = new SysUserDept();
            userDept.setUserId(sysUser.getUserId());
            userDept.setDeptId(deptId);
            return userDept;
        }).collect(Collectors.toList());
        return sysUserRoleService.saveBatch(userRoleList)&&sysUserDeptService.saveBatch(userDeptList);
    }

    /**
     * 通过查用户的全部信息
     *
     * @param sysUser 用户
     * @return
     */
    @Override
    public UserInfo findUserInfo(SysUser sysUser) {
        UserInfo userInfo = new UserInfo();
        userInfo.setSysUser(sysUser);

        return userInfo;
    }

    /**
     * 分页查询用户信息（含有角色信息）
     *
     * @param page    分页对象
     * @param userDTO 参数列表
     * @return
     */
    @Override
    public IPage getUsersWithRolePage(Page page, UserDTO userDTO) {
        return baseMapper.getUserVosPage(page, userDTO, new DataScope());
    }

    /**
     * 通过ID查询用户信息
     *
     * @param id 用户ID
     * @return 用户信息
     */
    @Override
    public UserVO selectUserVoById(String id) {
        return baseMapper.getUserVoById(id);
    }

    /**
     * 删除用户
     *
     * @param sysUser 用户
     * @return Boolean
     */
    @Override
    public Boolean deleteUserById(SysUser sysUser) {
        /*sysUserRoleService.deleteByUserId(sysUser.getUserId());*/
        this.removeById(sysUser.getUserId());
        return Boolean.TRUE;
    }

    @Override
    public R<Boolean> updateUserInfo(UserDTO userDto) {
        UserVO userVO = baseMapper.getUserVoByUsername(userDto.getUsername());
        SysUser sysUser = new SysUser();
        if (StrUtil.isNotBlank(userDto.getPassword())
                && StrUtil.isNotBlank(userDto.getNewpassword1())) {
            if (PasswordUtil.matches(userVO.getSalt(), userDto.getPassword(), userVO.getPassword())) {
                //Todo 先这样加密 后续再做处理
                Map<String, Object> passwordMap = PasswordUtil.encryptSaltPassword(userDto.getNewpassword1());
                sysUser.setSalt(passwordMap.get("salt").toString());
                sysUser.setPassword(passwordMap.get("password").toString());
            } else {
                log.warn("原密码错误，修改密码失败:{}", userDto.getUsername());
                return R.ok(Boolean.FALSE, "原密码错误，修改失败");
            }
        }
        sysUser.setPhone(userDto.getPhone());
        sysUser.setUserId(userVO.getUserId());
        sysUser.setAvatar(userDto.getAvatar());
        return R.ok(this.updateById(sysUser));
    }

    @Override
    public Boolean updateUser(UserDTO userDto) {
        SysUser sysUser = new SysUser();
        BeanUtils.copyProperties(userDto, sysUser);
        sysUser.setUpdateTime(LocalDateTime.now());

        if (StringUtils.isNotEmpty(userDto.getPassword()) && userDto.getPassword().length()< 35) {
            //Todo 先这样加密 后续再做处理
            Map<String, Object> passwordMap = PasswordUtil.encryptSaltPassword(userDto.getPassword());
            sysUser.setSalt(passwordMap.get("salt").toString());
            sysUser.setPassword(passwordMap.get("password").toString());
        }
        this.saveOrUpdate(sysUser);

        if (null != userDto.getRole() && userDto.getRole().size() > 0) {
            sysUserRoleService.remove(Wrappers.<SysUserRole>update().lambda()
                    .eq(SysUserRole::getUserId, userDto.getUserId()));
            userDto.getRole().forEach(roleId -> {
                SysUserRole userRole = new SysUserRole();
                userRole.setUserId(sysUser.getUserId());
                userRole.setRoleId(roleId);
                if (ObjectUtils.isNotEmpty(userRole.getRoleId())) {
                    userRole.insert();
                }
            });
        }
        if (ObjectUtil.isNotNull(userDto.getDepts()) && userDto.getDepts().size() > 0) {
            sysUserDeptService.remove(Wrappers.<SysUserDept>update().lambda()
                    .eq(SysUserDept::getUserId, userDto.getUserId()));
            userDto.getDepts().forEach(deptId -> {
                SysUserDept userDept = new SysUserDept();
                userDept.setUserId(sysUser.getUserId());
                userDept.setDeptId(deptId);
                if (ObjectUtils.isNotEmpty(userDept.getDeptId())) {
                    userDept.insert();
                }
            });
        }
        return Boolean.TRUE;
    }

    /**
     * 查询上级部门的用户信息
     *
     * @param username 用户名
     * @return R
     */
    @Override
    public List<SysUser> listAncestorUsers(String username) {
        /*SysUser sysUser = this.getOne(Wrappers.<SysUser>query().lambda()
                .eq(SysUser::getUsername, username));

        SysDept sysDept = sysDeptService.getById(sysUser.getDeptId());
        if (sysDept == null) {
            return null;
        }

        String parentId = sysDept.getParentId();
        return this.list(Wrappers.<SysUser>query().lambda()
                .eq(SysUser::getDeptId, parentId));*/
        return null;
    }

    /**
     * 获取当前用户的子部门信息
     *
     * @return 子部门列表
     */
    private List<String> getChildDepts() {
       /* String deptId = ShiroUtils.getUser().getDeptId();
        //获取当前部门的子部门
        return sysDeptRelationService
                .list(Wrappers.<SysDeptRelation>query().lambda()
                        .eq(SysDeptRelation::getAncestor, deptId))
                .stream()
                .map(SysDeptRelation::getDescendant)
                .collect(Collectors.toList());*/
       return null;
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public R importByExcel(List<Map<String, Object>> mapList) {
        List<String> errinfo = new ArrayList<>();
        boolean ifError = false;

        for (int i = 0; i < mapList.size(); i++) {
            Map<String, Object> map = mapList.get(i);
            map.put("username", map.remove("用户名"));
            map.put("name", map.remove("姓名"));
            map.put("email", map.remove("邮箱"));

            Map<String, Object> passwordMap = PasswordUtil.encryptSaltPassword("111111");
            map.put("salt", passwordMap.get("salt").toString());
            map.put("password", passwordMap.get("password").toString());

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
        }
        return R.ok("导入成功");
    }

    @Override
    public R resetPassword(String userid) {
        SysUser sysUser = new SysUser();
        sysUser.setUserId(userid);
        Map<String, Object> passwordMap = PasswordUtil.encryptSaltPassword("111111");
        sysUser.setSalt(passwordMap.get("salt").toString());
        sysUser.setPassword(passwordMap.get("password").toString());
        boolean ret = this.updateById(sysUser);
        if (ret) {
            return R.ok();
        } else {
            return R.failed("重置密码失败");
        }
    }

    @Override
    public R chagePassword(UserDTO userDto) {
        SecurityUtils.getSubject().getSession().getAttribute("user");
        ShiroUser su = (ShiroUser) SecurityUtils.getSubject().getPrincipal();

        SysUser sysUser = new SysUser();
        sysUser.setUserId(su.getUserId());
        Map<String, Object> passwordMap = PasswordUtil.encryptSaltPassword(userDto.getPassword());
        sysUser.setSalt(passwordMap.get("salt").toString());
        sysUser.setPassword(passwordMap.get("password").toString());
        SysUser luser = this.getOne(Wrappers.<SysUser>lambdaQuery()
                .eq(SysUser::getUserId, su.getUserId())
                .eq(SysUser::getPassword, sysUser.getPassword()));
        if(ObjectUtils.isEmpty(luser)){
            return R.failed("密码错误");
        }

        if (StringUtils.isNotEmpty(userDto.getNewpassword1())) {
            //Todo 先这样加密 后续再做处理
            passwordMap = PasswordUtil.encryptSaltPassword(userDto.getNewpassword1());
            sysUser.setSalt(passwordMap.get("salt").toString());
            sysUser.setPassword(passwordMap.get("password").toString());
        }

        boolean ret = this.updateById(sysUser);
        if (ret) {
            return R.ok();
        } else {
            return R.failed("重置密码失败");
        }
    }


}