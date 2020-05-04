/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.common.rmq;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * 消息队列配置
 *
 * @author maxinqiong
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "rmq")
public class RmqConfigProperties {

    /**
     * 启动参数
     */
    private Map<String, String> params = new HashMap<String, String>();
}
