/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.exception.CheckedException;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.core.util.ShiroUtils;
import com.tjaide.nursery.barrier.common.log.annotation.SysLog;
import com.tjaide.nursery.barrier.web.dto.UserDTO;
import com.tjaide.nursery.barrier.web.entity.SysUser;
import com.tjaide.nursery.barrier.web.service.SysUserService;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.*;
import java.util.List;
import java.util.Map;

/**
 * @author maxinqiong
 * @date 2018/12/16
 */
@RestController
@AllArgsConstructor
@RequestMapping("/user")
@Api(value = "user", tags = "用户管理模块")
public class SysUserController {
    private final SysUserService userService;

    /**
     * 获取当前用户全部信息
     *
     * @return 用户信息
     */
    @GetMapping(value = {"/info"})
    public R info() {
        String username = ShiroUtils.getUser().getUsername();
        SysUser user = userService.getOne(Wrappers.<SysUser>query()
                .lambda().eq(SysUser::getUsername, username));
        if (user == null) {
            return R.failed(null, "获取当前用户信息失败");
        }
        return R.ok(userService.findUserInfo(user));
    }


    /**
     * 通过ID查询用户信息
     *
     * @param id ID
     * @return 用户信息
     */
    @GetMapping("/{id}")
    public R user(@PathVariable String id) {
        return R.ok(userService.selectUserVoById(id));
    }

    /**
     * 根据用户名查询用户信息
     *
     * @param username 用户名
     * @return
     */
    @GetMapping("/details/{username}")
    public R userByName(@PathVariable String username) {
        SysUser condition = new SysUser();
        condition.setUsername(username);
        return R.ok(userService.getOne(new QueryWrapper<>(condition)));
    }

    /**
     * 删除用户信息
     *
     * @param id ID
     * @return R
     */
    @SysLog("删除用户信息")
    @DeleteMapping("/{id}")
    public R userDel(@PathVariable String id) {
        SysUser sysUser = userService.getById(id);
        return R.ok(userService.deleteUserById(sysUser));
    }

    /**
     * 添加用户
     *
     * @param userDto 用户信息
     * @return success/false
     */
    @SysLog("添加用户")
    @PostMapping
    public R user(@RequestBody UserDTO userDto) {
        return R.ok(userService.saveUser(userDto));
    }

    /**
     * 更新用户信息
     *
     * @param userDto 用户信息
     * @return R
     */
    @SysLog("更新用户信息")
    @PutMapping
    public R updateUser(@Valid @RequestBody UserDTO userDto) {
        return R.ok(userService.updateUser(userDto));
    }

    /**
     * 分页查询用户
     *
     * @param page    参数集
     * @param userDTO 查询参数列表
     * @return 用户集合
     */
    @GetMapping("/page")
    public R getUserPage(Page page, UserDTO userDTO) {
        return R.ok(userService.getUsersWithRolePage(page, userDTO));
    }

    /**
     * 修改个人信息
     *
     * @param userDto userDto
     * @return success/false
     */
    @SysLog("修改个人信息")
    @PutMapping("/edit")
    public R updateUserInfo(@Valid @RequestBody UserDTO userDto) {
        return userService.updateUserInfo(userDto);
    }


    /*** 导入用户
     * @Description:
     * @Param:
     * @param file
     * @return:
     * @Author: 马鑫琼
     * @Date: 2019/8/12 17:23
     */
    @SysLog("导入用户信息")
    @PostMapping("/readExcel")
    public R readExcel(@RequestParam("file") MultipartFile file) {
        ExcelReader reader = null;
        try {
            reader = ExcelUtil.getReader(file.getInputStream());
            List<Map<String, Object>> readAll = reader.readAll();
            R r = userService.importByExcel(readAll);
            return r;
        } catch (CheckedException e) {
            e.printStackTrace();
            return R.failed(e.getErrors());
        } catch (IOException e) {
            e.printStackTrace();
            return R.failed();
        }
    }

    /***
     * @Description: 下载模板
     * @Param:
     * @param request
     * @param response
     * @return:
     * @Author: 马鑫琼
     * @Date: 2019/8/12 17:44
     */
    @PostMapping("/downloadTemple")
    public void download(HttpServletRequest request, HttpServletResponse response) {
        try {
            String filePath = ResourceUtils.getURL("classpath:").getPath() + File.separator+"templates" + File.separator+"user"+ File.separator;
            String newname = "importUser.xlsx";

            File file = new File(filePath + newname);
            String contenttype = "application/x-xls";
            if (file.exists()) {
                FileInputStream fis = null;
                BufferedInputStream bis = null;
                try {
                    if (StringUtils.isNotEmpty(contenttype)) {
                        response.setContentType(contenttype);// 设置强制下载不打开
                    } else {
                        response.setContentType("application/octet-stream");// 设置强制下载不打开
                    }
                    response.addHeader("Content-Disposition", "attachment;fileName=" + java.net.URLEncoder.encode(newname, "UTF-8"));// 设置文件名
                    byte[] buffer = new byte[20 * 1024];
                    fis = new FileInputStream(file);
                    bis = new BufferedInputStream(fis);
                    OutputStream os = response.getOutputStream();
                    int i = bis.read(buffer);
                    while (i != -1) {
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    os.flush();
                    os.close();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (fis != null) {
                        try {
                            fis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @SysLog("重置用户密码")
    @PostMapping("/resetPassword/{userid}")
    public R resetPassword(@PathVariable String userid) {
        UserDTO userDTO = new UserDTO();

        SysUser user = userService.getById(userid);
        BeanUtils.copyProperties(user, userDTO);

        userDTO.setUserId(userid);
        userDTO.setPassword("111111");
        Boolean ret = userService.updateUser(userDTO);
        if (ret) {
            return R.ok();
        }
        return R.failed("重置密码失败");
    }

    @SysLog("更新密码")
    @PostMapping("/passwordAge")
    public R passwordAge(@RequestBody UserDTO userDTO) {
        return userService.chagePassword(userDTO);
    }


}
