package com.tjaide.nursery.barrier.common.shiro.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * shiro的配置文件

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-14:11

 **/
@Data
@Component
@ConfigurationProperties(value = "shiro")
public class ShiroConfigurationProperties implements Serializable {

    public static final String PREFIX = "shiro";

    @NestedConfigurationProperty
    private ShiroCasProperties cas = new ShiroCasProperties();

    private String loginUrl;

    private String successUrl;

    private String unauthorizedUrl;

    private List<String> anon;

    private List<String> authc;

    private List<String> user;

    private Map<String, String> other;

}
