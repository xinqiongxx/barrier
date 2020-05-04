/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.controller;

import com.tjaide.nursery.barrier.common.core.util.R;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;
import java.util.Random;

@RestController
@Configuration
@RequestMapping("/file")
@Api(value = "file", tags = "文件")
public class SysFileController {
    @Value("${path.imgPath}")
    private String realPath;



    @PostMapping("/load")
    public R uploadFile(HttpServletRequest request) throws IOException {
        ServletInputStream is = request.getInputStream();
        File file1 = new File(realPath);
        if(!file1.exists()) {
            file1.mkdirs();
        }

        realPath.concat("user");
        String newFileName = new Date().getTime()+""+new Random().nextInt()+".png";

        File file = new File(realPath, newFileName);

        FileOutputStream fos=new FileOutputStream(file);
        byte[] c = new byte[1024];
        int nRead = 0;
        while ((nRead = is.read(c)) != -1) {
            fos.write(c,0,nRead);
        }
        fos.flush();
        fos.close();
        is.close();
        return R.ok(newFileName);
    }

    @GetMapping("/showImg")
    public void showImg(@RequestParam("path") String path, HttpServletRequest request, HttpServletResponse response) throws IOException {

        File file = new File(realPath, path);

        InputStream is = new FileInputStream(file);

        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=" + path);
        ServletOutputStream out = response.getOutputStream();
        byte[] content = new byte[1024];
        int length = 0;
        while ((length = is.read(content)) != -1) {
            out.write(content, 0, length);
        }
        out.flush();
        is.close();
        out.close();
    }

}
