package com.tjaide.nursery.barrier.web.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.service.*;
import com.tjaide.nursery.barrier.web.vo.UserVO;
import lombok.AllArgsConstructor;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 大屏页面数据支持

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月08日-21：00

 *
 * @author 86130
 */
@RestController
@RequestMapping("/dataData")
@AllArgsConstructor
public class DataController {
    private final SysDictService sysDictService;
    private final SysDictItemService sysDictItemService;
    private final SysFlatbedService flatbedService;
    private final SysBarrierService barrierService;
    private final SysPassProcessService passProcessService;

    /**
     * 查询基础数据
     */
    @GetMapping("/getBaseDatas")
    public R getBaseDatas() {
        Map<String,Object> res=passProcessService.getBaseDatas();
        /*res.put("data4",sysDictItemService.count(Wrappers.<SysDictItem>lambdaQuery().eq(SysDictItem::getType,"white_list")));
        res.put("data5",flatbedService.count());
        res.put("data6",barrierService.count());*/
        return R.ok(res);
    }



    /**
     * 查询最新进出记录
     */
    @GetMapping("/getLastPassProcess")
    public R getLastPassProcess() {
        return R.ok(passProcessService.findRecentPassVoList());
    }




    /**
     * 查询最近五天进出人数
     */
    @GetMapping("/getDateNum")
    public R getDateNum() {
        return R.ok(passProcessService.getDateNum());
    }


    /**
     * 查询今日流量情况
     */
    @GetMapping("/getflow")
    public R getflow() {
        return R.ok(passProcessService.getflow());
    }
}
