package com.tjaide.nursery.barrier.web.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.shiro.service.UserDetailsService;
import com.tjaide.nursery.barrier.web.entity.SysUser;
import com.tjaide.nursery.barrier.web.service.SysDeptService;
import com.tjaide.nursery.barrier.web.service.SysRoleService;
import com.tjaide.nursery.barrier.web.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * 用户登录实现类
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-15:23
 **/
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // 事务
    @Autowired
    @Lazy
    private SysUserService sysUserService;

    @Autowired
    @Lazy
    private SysRoleService sysRoleService;

    @Autowired
    @Lazy
    private SysDeptService sysDeptService;


    @Autowired
    @Lazy
    private AsyncServiceImpl asyncService;

    /**
     * 通过登录用户查询用户对象
     *
     * @param loginname
     * @return
     */
    @Override
    public ShiroUser loadUser(String loginname) {
        SysUser sysUser = sysUserService.getOne(Wrappers.<SysUser>lambdaQuery()
                .eq(SysUser::getUsername, loginname));
        if(ObjectUtil.isEmpty(sysUser)){
            return null;
        }
        ShiroUser user = new ShiroUser();
        BeanUtil.copyProperties(sysUser, user);
        user.setRoles(sysRoleService.findRolesByUserId(user.getUserId()).stream()
                .map(sysRole -> sysRole.getRoleId()).collect(Collectors.toList()));

        user.setDepts(sysDeptService.findDeptsByUserId(user.getUserId()).stream()
                .map(sysDept -> sysDept.getDeptId()).collect(Collectors.toList()));
        asyncService.syncDept();
        return user;
    }

    /**
     * 用户角色查询对应的权限
     *
     * @param loginname
     * @return
     */
    @Override
    public Set<String> loadRoles(String loginname) {
        return null;
    }

    /**
     * 用户角色查询对应的权限
     *
     * @param role_id
     * @return
     */
    @Override
    public Set<String> loadPermissions(Integer role_id) {
        return null;
    }
}
