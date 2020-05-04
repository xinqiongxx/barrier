package com.tjaide.nursery.barrier.common.qui.wrapper;

import cn.hutool.core.util.ObjectUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Map;

/**
 * QUIrequest重写
 * <pre>
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年08月14日-13:16

 * </pre>
 **/

public class RequestWrapper extends HttpServletRequestWrapper {
    private Map<String, String[]> params;

    public RequestWrapper(HttpServletRequest request) {
        super(request);
        params = request.getParameterMap();
    }

    @Override
    public Map getParameterMap() {
        return params;
    }

    @Override
    public String getParameter(String name) {
        return ObjectUtil.isEmpty(params.get(name))?null:(String)params.get(name)[0];
    }

    @Override
    public Enumeration getParameterNames() {
        return Collections.enumeration(params.keySet());
    }

    @Override
    public String[] getParameterValues(String name) {
        return params.get(name);
    }

    public String removeParamte(String name){
        return ObjectUtil.isEmpty(params.get(name))?null:(String)params.get(name)[0];
    }

}
