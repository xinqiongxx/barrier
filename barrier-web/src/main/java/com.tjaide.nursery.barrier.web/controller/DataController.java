package com.tjaide.nursery.barrier.web.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.web.entity.SysDict;
import com.tjaide.nursery.barrier.web.entity.SysDictItem;
import com.tjaide.nursery.barrier.web.entity.SysRole;
import com.tjaide.nursery.barrier.web.service.*;
import com.tjaide.nursery.barrier.web.vo.UserVO;
import lombok.AllArgsConstructor;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 大屏页面数据支持

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月08日-21：00

 *
 * @author 86130
 */
@ApiIgnore
@Controller
@RequestMapping("/data")
@AllArgsConstructor
public class DataController {
    private final SysDictService sysDictService;
    private final SysDictItemService sysDictItemService;
    private final SysUserService userService;
    /**
     * 统一的页面显示
     *
     * @param content 目录
     * @param file    文件
     * @return 跳转页面地址
     */
    @RequestMapping(value = "/{content}/{file}")
    public String forward(@PathVariable("content") String content, @PathVariable("file") String file, Model model) {
        return content + "/" + file;
    }

    /***
     * @Description: 字典项管理
     */
    @RequestMapping(value = "/dict/item/{id}")
    public String dictitem(@PathVariable("id") String id, Model model) {
        model.addAttribute("id", id);
        return "dict/dictitem";
    }

    @RequestMapping(value = "/dict/edit/{id}")
    public String dictedit(@PathVariable("id") Integer id, Model model) {
        SysDict dict = sysDictService.getById(id);
        model.addAttribute("dataMap", dict);
        return "dict/add";
    }

    // 添加字典项
    @RequestMapping(value = "/dict/additem/{id}")
    public String dictadditem(@PathVariable("id") Integer id, Model model) {

        SysDict dict = sysDictService.getOne(Wrappers.<SysDict>lambdaQuery().eq(SysDict::getId, id));
        model.addAttribute("dataMap", dict);
        return "dict/additem";
    }

    // 编辑字典项
    @RequestMapping(value = "/dict/edititem/{id}")
    public String dictedititem(@PathVariable("id") Integer id, Model model) {
        SysDictItem dictItem = sysDictItemService.getOne(Wrappers.<SysDictItem>lambdaQuery().eq(SysDictItem::getId, id));
        model.addAttribute("dataMap", dictItem);
        return "dict/edititem";
    }


    @RequestMapping(value = "/index/information")
    public String userInformation(Model model) {
        ShiroUser su = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
        UserVO userVo = userService.selectUserVoById(su.getUserId());
        List<SysRole> roleList = userVo.getRoleList();
        String roleName = "";
        String roleId = "";
        for (SysRole sysRole : roleList) {
            if ("" == roleName) {
                roleName = sysRole.getRoleName();
                roleId = sysRole.getRoleId().toString();
            } else {
                roleName = roleName + ("," + sysRole.getRoleName());
                roleId = roleId + ("," + sysRole.getRoleId());
            }
        }
        model.addAttribute("roleId", roleId);
        model.addAttribute("roleName", roleName);
        model.addAttribute("dataMap", userVo);
        return "/index/information";
    }
}
