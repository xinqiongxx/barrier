/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.web.entity;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.img.ImgUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.SneakyThrows;

import javax.imageio.ImageIO;
import javax.sql.rowset.serial.SerialBlob;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.sql.Blob;
import java.time.LocalDateTime;

/**
 * <p>
 * 底库用户表
 * </p>
 *
 * @author maxinqiong
 * @since 2020-05-04
 */
@Data
@ApiModel(value = "底库用户表")
@EqualsAndHashCode(callSuper = true)
public class SysDepotUser extends Model<SysDepotUser> {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "id")
    private Integer id;
    @ApiModelProperty(value = "姓名")
    private String name;
    @ApiModelProperty(value = "底库类型（0白名单1黑名单）")
    private Integer depotType;
    @ApiModelProperty(value = "底库详细")
    private Integer depotId;
    @ApiModelProperty(value = "班级/部门ID")
    private Integer deptId;
    @ApiModelProperty(value = "人员类型（1学生2教职工3家长9未知）")
    private Integer userType;
    @ApiModelProperty(value = "照片")
    //@TableField(el="photo, typeHandler=com.tjaide.nursery.barrier.common.data.handler.BlobTypeHandler")
    private String photo;
    @ApiModelProperty(value = "备注")
    private String remark;
    @ApiModelProperty(value = "民族")
    private String nation;
    @ApiModelProperty(value = "证件类型")
    private Integer certificateType;
    @ApiModelProperty(value = "证号")
    private String cardId;
    @ApiModelProperty(value = "出生日期")
    private String birthday;
    @ApiModelProperty(value = "电话")
    private String phone;
    @ApiModelProperty(value = "地址")
    private String address;
    @ApiModelProperty(value = "操作人")
    @TableField(value = "operator_id", fill = FieldFill.INSERT_UPDATE)
    private Integer operatorId;
    @ApiModelProperty(value = "操作人姓名")
    @TableField(value = "operator_name", fill = FieldFill.INSERT_UPDATE)
    private String operatorName;
    @ApiModelProperty(value = "性别1男生2女生")
    private Integer gender;
    @ApiModelProperty(value = "创建时间")
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    @TableLogic
    @ApiModelProperty(value = "删除标记,1:已删除,0:正常")
    private String delFlag;
    @ApiModelProperty(value = "用户所属租户id")
    private Integer tenantId;

    // /api/image/view/{type}/{name}
    public String getPhotoBase64(String filePath){

        if(StrUtil.isNotEmpty(this.photo)&&this.photo.startsWith("/")) {
            String[] names = this.photo.split("/");
            String type = names[names.length - 2];
            String name = names[names.length - 1];
            File file = new File(filePath+File.separator+type+File.separator+name+".jpeg");
            File fileTemp = new File(filePath+File.separator+type+File.separator+name+"_temp.jpeg");
            try {
                if (file.length() > 1024 * 800) {
                    if(fileTemp.exists()){
                        setPhoto("data:image/jpeg;base64,"+Base64.encode(fileTemp));
                        return this.photo;
                    }
                    // 压缩图片
                    ImgUtil.scale(file, fileTemp, 0.5f);
                    BufferedImage image = ImageIO.read(fileTemp);
                    if(image.getWidth() > image.getHeight()) {
                        ImgUtil.write(ImgUtil.rotate(ImageIO.read(fileTemp), 90), fileTemp);
                    }
                    //file.delete();
                    //fileTemp.renameTo(file);
                    setPhoto("data:image/jpeg;base64,"+Base64.encode(fileTemp));
                    return this.photo;
                }
            }catch(Exception e){

            }
            setPhoto("data:image/jpeg;base64,"+Base64.encode(file));
        }
        return this.photo;
    }

    @SneakyThrows
    public static void main(String[] args) {
        File file = new File("/Users/gougou/Desktop/import/2020-06-09/2.jpg");
        File fileTemp = new File("/Users/gougou/Desktop/import/2020-06-09/2_temp.jpeg");;
            if (file.length() > 1024 * 800) {
                // 压缩图片
                ImgUtil.scale(file, fileTemp, 0.5f);
                BufferedImage image1 = ImageIO.read(file);
                BufferedImage image = ImageIO.read(fileTemp);
                if(image.getWidth() > image.getHeight()) {
                    ImgUtil.write(ImgUtil.rotate(ImageIO.read(fileTemp), 90), fileTemp);
                }
            }
    }

}
