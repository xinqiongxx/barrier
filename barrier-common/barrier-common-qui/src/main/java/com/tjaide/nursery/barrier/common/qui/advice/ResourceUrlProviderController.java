/**
 * Copyright (C), 2018-2018, 天津市爱德科技发展有限公司
 * FileName: ResourceUrlProviderController
 * Author:   maxinqiong
 * Date:     2018-11-06 11:18
 * Description: 静态资源MD5处理
 * History:
 * <author>          <time>          <version>          <desc>
 * 马鑫琼           2018-12-21           1.0              静态文件URL处理
 */
package com.tjaide.nursery.barrier.common.qui.advice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

/**
 * 〈静态资源MD5处理〉
 *
 * @author maxinqiong
 * @create 2018-11-06
 * @since 1.0.0
 */
@ControllerAdvice
public class ResourceUrlProviderController {

    @Autowired
    private ResourceUrlProvider resourceUrlProvider;

    @ModelAttribute("urls")
    public ResourceUrlProvider urls() {
        return this.resourceUrlProvider;

    }

}