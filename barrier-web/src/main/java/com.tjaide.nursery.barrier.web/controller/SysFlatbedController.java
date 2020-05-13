/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.log.annotation.SysLog;
import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import com.tjaide.nursery.barrier.web.entity.SysFlatbed;
import com.tjaide.nursery.barrier.web.service.SysDepotUserService;
import com.tjaide.nursery.barrier.web.service.SysFlatbedService;
import com.tjaide.nursery.barrier.web.util.FlatBedUtil;
import io.swagger.annotations.Api;
import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.apache.http.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

/**
 * @author maxinqiong
 * @date 2017/11/5
 */
@RestController
@RequestMapping("/flatbed")
@Api(value = "flatbed", tags = "平板管理模块")
public class SysFlatbedController {
    @Autowired
    private SysFlatbedService sysFlatbedService;
    @Autowired
    private SysDepotUserService sysDepotUserService;

    @Value("${file.path}")
    private String filePath;

    /**
     * 通过ID查询
     *
     * @param id ID
     * @return
     */
    @GetMapping("/{id}")
    public R getById(@PathVariable Integer id) {
        return R.ok(sysFlatbedService.getById(id));
    }

    /**
     * 添加
     *
     * @param
     * @return success、false
     */
    @SysLog("添加")
    @PostMapping
    public R save(@Valid @RequestBody SysFlatbed flatbed) {
        flatbed.setProcess("暂未同步");
        return R.ok(sysFlatbedService.saveOrUpdate(flatbed));
    }

    /**
     * 修改
     *
     * @return success/false
     */
    @SysLog("修改")
    @PutMapping
    public R update(@Valid @RequestBody SysFlatbed flatbed) {
        return R.ok(sysFlatbedService.saveOrUpdate(flatbed));
    }

    /**
     * 删除
     *
     * @param id
     * @return
     */
    @SysLog("删除")
    @DeleteMapping("/{id}")
    public R removeById(@PathVariable Integer id) {
        return R.ok(sysFlatbedService.removeById(id));
    }


    /**
     * 分页查询信息
     *
     * @param page 分页对象
     * @return 分页对象
     */
    @GetMapping("/page")
    public R getFlatbedPage(Page page) {
        return R.ok(sysFlatbedService.page(page, Wrappers.emptyWrapper()));
    }

    /**
     * 获取角色列表
     *
     * @return 角色列表
     */
    @GetMapping("/list")
    public R listFlatbeds() {
        return R.ok(sysFlatbedService.list(Wrappers.emptyWrapper()));
    }


    /**
     * 获取PAD人数
     * @param id
     * @return
     */
    @GetMapping("/number/{id}")
    public R getPeopleNumber(@PathVariable Integer id) {
        SysFlatbed sysFlatbed = sysFlatbedService.getById(id);
        return R.ok(FlatBedUtil.SearchPersonNum(sysFlatbed.getIpAddress(),sysFlatbed.getNumber()));
    }


    /**
     * 清空pad名单
     * @param id
     * @return
     */
    @DeleteMapping("/clear/{id}")
    public R clearPad(@PathVariable Integer id) {
        SysFlatbed sysFlatbed = sysFlatbedService.getById(id);
        sysFlatbed.setProcess("正准备清空");
        sysFlatbedService.updateById(sysFlatbed);
        List<String> ids = new ArrayList<>();
        sysDepotUserService.list(Wrappers.emptyWrapper()).forEach(sysDepotUser -> {
            ids.add(sysDepotUser.getId()+"");
            ids.add(sysDepotUser.getId()+"A");
        });
        sysFlatbedService.update(Wrappers.<SysFlatbed>lambdaUpdate().set(SysFlatbed::getProcess,"清空中").eq(SysFlatbed::getId,id));
        Map<String,Object> res = FlatBedUtil.DeletePerson(sysFlatbed.getIpAddress(),sysFlatbed.getNumber(),ids);
        sysFlatbedService.update(Wrappers.<SysFlatbed>lambdaUpdate().set(SysFlatbed::getProcess,"完成清空").eq(SysFlatbed::getId,id));
        return R.ok(res);
    }


    /**
     * 同步名单
     * @param id
     * @return
     */
    @PostMapping("/sync/{id}")
    public R syncPad(@PathVariable Integer id) {
        SysFlatbed sysFlatbed = sysFlatbedService.getById(id);
        List<SysDepotUser> lists = sysDepotUserService.list(Wrappers.emptyWrapper());
        List<SysDepotUser> errors = FlatBedUtil.AddPersons(sysFlatbed,lists,filePath,sysFlatbedService);
        if(errors.size() > 0){
            return R.failed("同步失败（"+errors.size()+"）个人");
        }
        return R.ok();
    }

    /**
     * 清空pad名单
     * @return
     */
    @DeleteMapping("/clearAll")
    public R clearAll(){
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list();
        List<String> ids = new ArrayList<>();
        sysDepotUserService.list(Wrappers.emptyWrapper()).forEach(sysDepotUser -> {
            ids.add(sysDepotUser.getId()+"");
            ids.add(sysDepotUser.getId()+"A");
        });
        List<CompletableFuture> resList = new ArrayList<>();
        sysFlatbeds.forEach( sysFlatbed -> {
            resList.add(CompletableFuture.supplyAsync(() -> sysFlatbed).thenAcceptAsync(e -> {
                if("0".equals(sysFlatbed.getOnlineStatus().toString())) {
                    // FlatBedUtil.DeletePerson(sysFlatbed.getIpAddress(), sysFlatbed.getNumber(), ids);
                    FlatBedUtil.DeleteAllPerson(sysFlatbed.getIpAddress());
                }
            }));
        });
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        return R.ok();
    }

    /**
     * 清空pad名单
     * @return
     */
    @PostMapping("/syncAll")
    public R syncAll(){
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list();
        List<SysDepotUser> lists = sysDepotUserService.list(Wrappers.emptyWrapper());
        List<SysDepotUser> errors = new ArrayList<>();
        List<CompletableFuture> resList = new ArrayList<>();
        sysFlatbeds.forEach( sysFlatbed -> {
            resList.add(CompletableFuture.supplyAsync(() -> sysFlatbed).thenAcceptAsync(e -> {
                if("0".equals(sysFlatbed.getOnlineStatus().toString())) {
                    errors.addAll(FlatBedUtil.AddPersons(sysFlatbed, lists,filePath,sysFlatbedService));
                }
            }));
        });
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        if(errors.size() > 0){
            return R.failed("同步失败（"+errors.size()+"）个人");
        }
        return R.ok();
    }

    @PostMapping("/contrast")
    public R contrast(@RequestParam  String picinfo1,@RequestParam  String picinfo2){
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list(Wrappers.<SysFlatbed>lambdaQuery().eq(SysFlatbed::getOnlineStatus,"0"));
        if(sysFlatbeds.size() == 0){
            return R.failed("请最少保证一个在线平板");
        }else{
            return R.ok(FlatBedUtil.GetPictureSimilarity(sysFlatbeds.get(0).getIpAddress(),picinfo1,picinfo2));
        }
    }

    @PostMapping("/search")
    public R search(@RequestParam  String picinfo,@RequestParam  float MaxSimilarity,@RequestParam int MaxNum){
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list(Wrappers.<SysFlatbed>lambdaQuery().eq(SysFlatbed::getOnlineStatus,"0"));
        if(sysFlatbeds.size() == 0){
            return R.failed("请最少保证一个在线平板");
        }else{
            return R.ok(FlatBedUtil.GetPictureSearch(sysFlatbeds.get(0).getIpAddress(),picinfo,MaxSimilarity,MaxNum));
        }
    }

    @PostMapping("/people/{id}")
    public R people(@PathVariable String id){
        List<SysDepotUser> lists = sysDepotUserService.list(Wrappers.<SysDepotUser>lambdaQuery().eq(SysDepotUser::getId,id));
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list();
        List<SysDepotUser> errors = new ArrayList<>();
        List<CompletableFuture> resList = new ArrayList<>();
        sysFlatbeds.forEach( sysFlatbed -> {
            resList.add(CompletableFuture.supplyAsync(() -> sysFlatbed).thenAcceptAsync(e -> {
                if("0".equals(sysFlatbed.getOnlineStatus().toString())) {
                    errors.addAll(FlatBedUtil.AddPersons(sysFlatbed, lists,filePath,sysFlatbedService));
                }
            }));
        });
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        if(errors.size() > 0){
            return R.failed("同步失败（"+errors.size()+"）个人");
        }
        return R.ok();
    }

}
