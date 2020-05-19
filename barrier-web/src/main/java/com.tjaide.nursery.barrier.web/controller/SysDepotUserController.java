/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.lang.UUID;
import cn.hutool.core.util.ZipUtil;
import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.core.exception.CheckedException;
import com.tjaide.nursery.barrier.common.core.util.R;
import com.tjaide.nursery.barrier.common.log.annotation.SysLog;
import com.tjaide.nursery.barrier.web.entity.*;
import com.tjaide.nursery.barrier.web.service.*;
import com.tjaide.nursery.barrier.web.util.FlatBedUtil;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.hssf.usermodel.DVConstraint;
import org.apache.poi.hssf.usermodel.HSSFDataValidation;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.XSSFDataValidation;
import org.apache.poi.xssf.usermodel.XSSFDataValidationConstraint;
import org.apache.poi.xssf.usermodel.XSSFDataValidationHelper;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.io.*;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

/**
 * @author maxinqiong
 * @date 2017/11/5
 */
@RestController
@RequestMapping("/depotuser")
@Api(value = "depotuser", tags = "底库用户管理模块")
public class SysDepotUserController {
    @Autowired
    private SysDepotUserService sysDepotUserService;
    @Autowired
    private SysDictItemService sysDictItemService;
    @Autowired
    private SysDeptService sysDeptService;
    @Autowired
    private SysUserRelationService sysUserRelationService;
    @Autowired
    private SysFlatbedService sysFlatbedService;


    @Value("${file.path}")
    private String filePath;

    private BASE64Decoder decoder = new BASE64Decoder();
    /**
     * 通过ID查询
     *
     * @param id ID
     * @return
     */
    @GetMapping("/{id}")
    public R getById(@PathVariable Integer id) {
        return R.ok(sysDepotUserService.getById(id));
    }

    /**
     * 添加
     *
     * @param
     * @return success、false
     */
    @SneakyThrows
    @SysLog("添加")
    @PostMapping
    public R save(@Valid @RequestBody SysDepotUser depotUser) {
        // 存储头像
        String photo = depotUser.getPhoto();
        depotUser.setPhoto("");
        sysDepotUserService.saveOrUpdate(depotUser);
        byte[] b = decoder.decodeBuffer(photo.replace("data:image/jpeg;base64,",""));
        ByteArrayInputStream bais = new ByteArrayInputStream(b);
        String fileName = depotUser.getId().toString();
        new File(filePath+File.separator+"reg").mkdirs();
        IoUtil.copy(bais,new FileOutputStream(new File(filePath+File.separator+"reg"+File.separator+ fileName +".jpeg")));
        depotUser.setPhoto("/api/image/view/reg/"+fileName);
        sysDepotUserService.saveOrUpdate(depotUser);
        return R.ok();
    }

    /**
     * 修改
     *
     * @return success/false
     */
    @SneakyThrows
    @SysLog("修改")
    @PutMapping
    public R update(@Valid @RequestBody SysDepotUser depotUser) {
        if(depotUser.getPhoto().startsWith("data")) {
            byte[] b = decoder.decodeBuffer(depotUser.getPhoto().replace("data:image/jpeg;base64,", ""));
            ByteArrayInputStream bais = new ByteArrayInputStream(b);
            String fileName = depotUser.getId().toString();
            IoUtil.copy(bais, new FileOutputStream(new File(filePath + File.separator + "reg" + File.separator + fileName + ".jpeg")));
            depotUser.setPhoto("/api/image/view/reg/" + fileName);
        }
        return R.ok(sysDepotUserService.saveOrUpdate(depotUser));
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
        sysDepotUserService.removeById(id);
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list();
        List<String> ids = new ArrayList<>();
        ids.add(id+"");
        ids.add(id+"A");
        List<CompletableFuture> resList = new ArrayList<>();
        sysFlatbeds.forEach( sysFlatbed -> {
            resList.add(CompletableFuture.supplyAsync(() -> sysFlatbed).thenAcceptAsync(e -> {
                if("0".equals(sysFlatbed.getOnlineStatus().toString())) {
                    FlatBedUtil.DeletePerson(sysFlatbed.getIpAddress(), sysFlatbed.getNumber(), ids);
                }
            }));
        });
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        return R.ok();
    }
    /**
     * 删除
     *
     * @param id
     * @return
     */
    @SysLog("删除")
    @DeleteMapping("/delRelation/{userId}/{memberId}")
    public R removeById(@PathVariable Integer userId,@PathVariable Integer memberId) {
        return R.ok(sysUserRelationService.remove(Wrappers.<SysUserRelation>lambdaQuery().eq(SysUserRelation::getUserId,userId)
                .eq(SysUserRelation::getMemberId,memberId)));
    }

    /**
     * 分页查询信息
     *
     * @param page 分页对象
     * @return 分页对象
     */
    @GetMapping("/page")
    public R getRolePage(Page page,SysDepotUser sysDepotUser) {
        return R.ok(sysDepotUserService.getpage(page,sysDepotUser));
    }

    /**
     * 分页查询信息
     *
     * @param page 分页对象
     * @return 分页对象
     */
    @GetMapping("/relation/page/{id}")
    public R getRelationPage(Page page,SysDepotUser sysDepotUser,@PathVariable Integer id) {
        return R.ok(sysDepotUserService.relationPage(page, sysDepotUser,id));
    }

    /**
     * 分页查询信息
     *
     * @param page 分页对象
     * @return 分页对象
     */
    @GetMapping("/getrelations/{id}")
    public R getrelations(Page page,@PathVariable Integer id) {
        return R.ok(sysUserRelationService.getrelations(page, id));
    }

    /**
     * 添加关系表
     *
     * @param
     * @return success、false
     */
    @PostMapping("/saverelation")
    public R saverelation(@RequestBody SysUserRelation sysUserRelation) {
        return R.ok(sysUserRelationService.saveOrUpdateRelation(sysUserRelation));
    }
    /**
     * 导入用户照片
     * @return
     */
    @SneakyThrows
    @SysLog("导入用户照片")
    @PostMapping("/photo")
    public R photo(@RequestParam("file") MultipartFile file,@RequestParam("name") String name) {
        String path = filePath+File.separator+"import"+File.separator+DateUtil.format(new Date(),"yyyy-MM-dd");
        File outFileDe = new File(path);
        if(!outFileDe.exists()){
            outFileDe.mkdirs();
        }
        String pathFile =path+File.separator+File.separator+DateUtil.date().getTime();
        File zipFile = new File(pathFile+".zip");
        IoUtil.copy(file.getInputStream(),new FileOutputStream(zipFile));
        ZipUtil.unzip(zipFile);
        zipFile.delete();
        return sysDepotUserService.updatePhoto(pathFile,filePath);
    }

    @SysLog("导入用户信息")
    @PostMapping("/readExcel")
    public R readExcel(@RequestParam("file") MultipartFile file,@RequestParam("depotId") Integer depotId,@RequestParam("depotType") Integer depotType) {
        ExcelReader reader = null;
        try {
            reader = ExcelUtil.getReader(file.getInputStream());
            List<Map<String, Object>> readAll = reader.readAll();
            return sysDepotUserService.importByExcel(readAll,depotId,depotType);
        } catch (CheckedException e) {
            e.printStackTrace();
            return R.failed(e.getErrors());
        } catch (IOException e) {
            e.printStackTrace();
            return R.failed();
        }
    }

    @SysLog("清除毕业人员")
    @DeleteMapping("/clearGraduation")
    public R clearGraduation(){
        // 查询毕业人员
        List<Integer> graduationIds = sysDepotUserService.getGraduation();
        sysDepotUserService.removeByIds(graduationIds);
        List<SysFlatbed> sysFlatbeds = sysFlatbedService.list();
        List<String> ids = new ArrayList<>();
        graduationIds.forEach(id -> {
            ids.add(id+"");
            ids.add(id+"A");
        });
        List<CompletableFuture> resList = new ArrayList<>();
        sysFlatbeds.forEach( sysFlatbed -> {
            resList.add(CompletableFuture.supplyAsync(() -> sysFlatbed).thenAcceptAsync(e -> {
                if("0".equals(sysFlatbed.getOnlineStatus().toString())) {
                    FlatBedUtil.DeletePerson(sysFlatbed.getIpAddress(), sysFlatbed.getNumber(), ids);
                }
            }));
        });
        CompletableFuture all = CompletableFuture.allOf(resList.toArray(new CompletableFuture[resList.size()]));
        all.join();
        return R.ok();
    }


    /**
     * 下载规范的模版
     * @param response 响应
     */
    @SneakyThrows
    @PostMapping("/download")
    public void download(HttpServletResponse response) {
        ExcelWriter writer = ExcelUtil.getWriter(true);
        Sheet sheet = writer.getSheet();
        //姓名 性别 人员类型  班级部门 证件类型  证件号 图片编号（导入图片名称关联）
        String[] gender = {"男", "女"};
        CellRangeAddressList genderRegions = new CellRangeAddressList(1, 1000000, 1, 1);
        String[] userType = {"学生", "教职工","家长","未知"};
        CellRangeAddressList userTypeRegions = new CellRangeAddressList(1, 1000000, 2, 2);
        // 查询班级
        SysDept sysDept = sysDeptService.getOne(Wrappers.<SysDept>lambdaQuery().eq(SysDept::getParentId,"-1"));
        List<String> deptNameList= sysDictItemService.list(Wrappers
                .<SysDictItem>query().lambda()
                .eq(SysDictItem::getType, "class_type")).stream().map(sysDictItem -> {
            return sysDictItem.getLabel();
        }).collect(Collectors.toList());
        deptNameList.add(sysDept.getDeptName());
        CellRangeAddressList deptNameRegions = new CellRangeAddressList(1, 1000000, 3, 3);
        // 查询证件类型
        String[] certificateType = sysDictItemService.list(Wrappers
                .<SysDictItem>query().lambda()
                .eq(SysDictItem::getType, "certificate_type")).stream().map(sysDictItem -> {
                    return sysDictItem.getLabel();
        }).collect(Collectors.toList()).toArray(new String[0]);
        CellRangeAddressList certificateTypeRegions = new CellRangeAddressList(1, 1000000, 4, 4);
        XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper((XSSFSheet)sheet);
        XSSFDataValidation gendervalidation = (XSSFDataValidation) dvHelper.createValidation((XSSFDataValidationConstraint) dvHelper
                .createExplicitListConstraint(gender), genderRegions);
        XSSFDataValidation userTypevalidation = (XSSFDataValidation) dvHelper.createValidation((XSSFDataValidationConstraint) dvHelper
                .createExplicitListConstraint(userType), userTypeRegions);
        XSSFDataValidation deptNamevalidation = (XSSFDataValidation) dvHelper.createValidation((XSSFDataValidationConstraint) dvHelper
                .createExplicitListConstraint(deptNameList.toArray(new String[0])), deptNameRegions);
        XSSFDataValidation certificateTypevalidation = (XSSFDataValidation) dvHelper.createValidation((XSSFDataValidationConstraint) dvHelper
                .createExplicitListConstraint(certificateType), certificateTypeRegions);
        gendervalidation.setSuppressDropDownArrow(true);
        gendervalidation.setShowErrorBox(true);
        userTypevalidation.setSuppressDropDownArrow(true);
        userTypevalidation.setShowErrorBox(true);
        deptNamevalidation.setSuppressDropDownArrow(true);
        deptNamevalidation.setShowErrorBox(true);
        certificateTypevalidation.setSuppressDropDownArrow(true);
        certificateTypevalidation.setShowErrorBox(true);

        sheet.addValidationData(gendervalidation);
        sheet.addValidationData(userTypevalidation);
        sheet.addValidationData(deptNamevalidation);
        sheet.addValidationData(certificateTypevalidation);

        Map<String, Object> row1 = new LinkedHashMap<>();
        row1.put("姓名", "");
        row1.put("性别", "");
        row1.put("人员类型", "");
        row1.put("班级/部门", "");
        row1.put("证件类型", "");
        row1.put("证件号", "");
        row1.put("图片编号（导入图片名称关联）", "");

        sheet.setColumnWidth(3,7000);
        sheet.setColumnWidth(5,10000);
        sheet.setColumnWidth(6,20000);
        ArrayList<Map<String, Object>> rows = CollUtil.newArrayList(row1);
        writer.write(rows, true);
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8");
        response.setHeader("Content-Disposition","attachment;filename=test.xlsx");
        OutputStream out = response.getOutputStream();
        writer.flush(out, true);
        writer.close();
        IoUtil.close(out);
    }
}
