package com.tjaide.nursery.barrier.common.shiro.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * shiro的配置文件

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-14:11

 **/
@Data
@Component
@ConfigurationProperties(value = "session")
public class SessionConfigurationProperties implements Serializable {

    public static final String PREFIX = "session";

    private String quseUrl;

    private String basicsUrl;

    private String adapterUrl;

    private String hdUrl;

    private String fileUrl;

    private String cooperationUrl;

    private String securityUrl;

    private String siteType;

}
