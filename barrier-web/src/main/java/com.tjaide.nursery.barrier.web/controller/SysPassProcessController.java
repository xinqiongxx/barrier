/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.log.annotation.SysLog;
import com.tjaide.nursery.barrier.web.dto.SysPassProcessDTO;
import com.tjaide.nursery.barrier.web.entity.SysFlatbed;
import com.tjaide.nursery.barrier.web.entity.SysPassProcess;
import com.tjaide.nursery.barrier.web.service.SysFlatbedService;
import com.tjaide.nursery.barrier.web.service.SysPassProcessService;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessExcel;
import com.tjaide.nursery.barrier.web.vo.SysPassProcessVo;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.shiro.crypto.hash.Hash;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author maxinqiong
 * @date 2017/11/5
 */
@RestController
@AllArgsConstructor
@RequestMapping("/passProcess")
@Api(value = "passProcess", tags = "平板管理模块")
public class SysPassProcessController {
    private final SysPassProcessService sysPassProcessService;

    /**
     * 通过ID查询
     *
     * @param id ID
     * @return
     */
    @GetMapping("/{id}")
    public R getById(@PathVariable Integer id) {
        return R.ok(sysPassProcessService.getById(id));
    }

    /**
     * 添加
     *
     * @param
     * @return success、false
     */
    @SysLog("添加")
    @PostMapping
    public R save(@Valid @RequestBody SysPassProcess passProcess) {
        return R.ok(sysPassProcessService.saveOrUpdate(passProcess));
    }

    /**
     * 修改
     *
     * @return success/false
     */
    @SysLog("修改")
    @PutMapping
    public R update(@Valid @RequestBody SysPassProcess passProcess) {
        return R.ok(sysPassProcessService.saveOrUpdate(passProcess));
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
        return R.ok(sysPassProcessService.removeById(id));
    }


    /**
     * 分页查询信息
     *
     * @param page 分页对象
     * @return 分页对象
     */
    @GetMapping("/page")
    public R getRolePage(Page page, SysPassProcessDTO sysPassProcessDTO) {
        return R.ok(sysPassProcessService.getPage(page, sysPassProcessDTO));
    }

    @SneakyThrows
    @PostMapping("/download")
    public void download(HttpServletResponse response, SysPassProcessDTO sysPassProcessDTO) {
        String filename = URLEncoder.encode("考勤记录","UTF8");
        if(StrUtil.isNotEmpty(sysPassProcessDTO.getStartTime())){
            String localTime = sysPassProcessDTO.getStartTime();
            filename = URLEncoder.encode(localTime+"考勤记录","UTF8");
        }
        ExcelWriter writer = ExcelUtil.getWriter(true);
        Map<String,String> headerMap = new HashMap<>();
        headerMap.put("userId","用户编码");
        headerMap.put("discernId","识别编码");
        headerMap.put("parentType","关系");
        headerMap.put("userName","考勤用户");
        headerMap.put("discernName","识别用户");
        headerMap.put("deptName","班级/部门");
        headerMap.put("createTimeStr","考勤时间");
        headerMap.put("enterStr","进/出园");
        writer.setHeaderAlias(headerMap);
        List<SysPassProcessExcel> lists = sysPassProcessService.getProcess(sysPassProcessDTO);
        writer.write(lists, true);
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        response.setHeader("Content-Disposition","attachment;filename="+ filename+".xlsx");
        OutputStream out = response.getOutputStream();
        writer.flush(out, true);
        writer.close();
        IoUtil.close(out);
    }
}
