package com.tjaide.nursery.barrier.common.shiro.config;

import lombok.Data;

import java.io.Serializable;

/**
 * Shiro整合CAS配置文件

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年08月04日-09:13

 **/
@Data
public class ShiroCasProperties implements Serializable {

    private boolean enabled;

    private String clientName;

    private String projectUrl;

    private String serverUrl;
}
