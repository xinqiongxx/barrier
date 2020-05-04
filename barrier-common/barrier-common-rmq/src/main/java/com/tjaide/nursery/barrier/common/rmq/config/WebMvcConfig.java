/**
 * Copyright (C), 2018-2019, 天津市爱德科技发展有限公司
 * FileName: WebMvcConfig
 * Author:   maxinqiong
 * Date:     2019-01-09 9:39
 * Description: MVC Config
 * History:
 * <author>          <time>          <version>          <desc>
 * 作者姓名           修改时间           版本号              描述
 */
package com.tjaide.nursery.barrier.common.rmq.config;

import com.tjaide.nursery.barrier.common.rmq.RmqConfigProperties;
import com.tjaide.tools.utils.kafka.web.MQWebContextListener;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 〈一句话功能简述〉<br>
 * 〈MVC Config〉
 *
 * @author maxinqiong
 * @create 2019-01-09
 * @since 1.0.0
 */
@Configuration
@AllArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {


    private final RmqConfigProperties rmqConfigProperties;

    @Bean
    public InitParameterConfiguringServletContextInitializer initParamsInitializer() {
        return new InitParameterConfiguringServletContextInitializer(rmqConfigProperties.getParams());
    }


    @Bean
    MQWebContextListener mqWebContextListener() {
        return new MQWebContextListener();
    }


}