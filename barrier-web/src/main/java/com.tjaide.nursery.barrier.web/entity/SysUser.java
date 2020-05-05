package com.tjaide.nursery.barrier.web.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel(value = "用户")
public class SysUser {
    //@TableId(value = "user_id", type = IdType.UUID)
    /**
     * 用户ID
     */
    @TableId(value = "user_id")
    @ApiModelProperty(value = "主键id")
    private String userId;

    /**
     * 用户昵称
     */
    @ApiModelProperty(value = "用户昵称")
    private String name;

    /**
     * 登录名
     */
    @ApiModelProperty(value = "用户名")
    private String username;

    /**
     * 密码
     */
    @ApiModelProperty(value = "密码")
    private String password;

    /**
     * 盐加密用
     */
    @JsonIgnore
    @ApiModelProperty(value = "随机盐")
    private String salt;


    /**
     * 手机号
     */
    @ApiModelProperty(value = "手机号")
    private String phone;

    /**
     * 头像
     */
    @ApiModelProperty(value = "头像地址")
    private String avatar;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    @ApiModelProperty(value = "修改时间")
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;

    /**
     * 锁定状态 0 正常 1锁定
     */
    @ApiModelProperty(value = "锁定标记")
    private String lockFlag;

    /**
     * 删除状态 0 正常 1删除
     */
    @TableLogic
    @ApiModelProperty(value = "删除标记,1:已删除,0:正常")
    private String delFlag;

    /**
     * 租户ID
     */
    @ApiModelProperty(value = "用户所属租户id")
    private Integer tenantId;

    @ApiModelProperty(value = "邮箱")
    private String email;



}