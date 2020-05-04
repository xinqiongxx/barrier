package com.tjaide.nursery.barrier.common.rmq.config;

import org.springframework.boot.web.servlet.ServletContextInitializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.util.Iterator;
import java.util.Map;

/**

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年09月04日-17:37

 **/
public class InitParameterConfiguringServletContextInitializer implements ServletContextInitializer {

    private final Map<String, String> parameters;

    public InitParameterConfiguringServletContextInitializer(Map<String, String> parameters) {
        this.parameters = parameters;
    }

    public void onStartup(ServletContext servletContext) throws ServletException {
        Iterator var2 = this.parameters.entrySet().iterator();

        while (var2.hasNext()) {
            Map.Entry<String, String> entry = (Map.Entry) var2.next();
            servletContext.setInitParameter((String) entry.getKey(), (String) entry.getValue());
        }

    }
}
