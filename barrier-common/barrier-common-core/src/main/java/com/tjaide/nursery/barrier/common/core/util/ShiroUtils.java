package com.tjaide.nursery.barrier.common.core.util;

import com.tjaide.nursery.barrier.common.core.entity.ShiroUser;
import lombok.experimental.UtilityClass;
import org.apache.shiro.SecurityUtils;

/**
 * 兼容secrutyutils

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月03日-15:05

 **/
@UtilityClass
public class ShiroUtils {

    public ShiroUser getUser() {
        return (ShiroUser) SecurityUtils.getSubject().getPrincipal();
    }
}
