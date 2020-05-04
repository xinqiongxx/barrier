package com.tjaide.nursery.barrier.common.qui.util;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tjaide.nursery.barrier.common.qui.wrapper.RequestWrapper;
import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Qui转换工具
 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年08月05日-14:29

 **/
@UtilityClass
public class QuiUtil {

    @SneakyThrows
    public Map<String, Object> refreshGridModel(Page page) {
        HashMap resultMap = new HashMap();
        if (ObjectUtil.isNotEmpty(page)) {
            resultMap.put("pager.totalRows", page.getTotal());
            resultMap.put("pager.pageNo", page.getCurrent());
            resultMap.put("rows", page.getRecords());
        }
        return resultMap;
    }

    public void reAttribute(HttpServletRequest request, Page page) {
        RequestWrapper requestWrapper = new RequestWrapper(request);
        if (!StrUtil.isEmpty(request.getParameter("pager.pageSize"))) {
            page.setSize(Integer.parseInt(request.getParameter("pager.pageSize")));
        }

        if (!StrUtil.isEmpty(request.getParameter("pager.pageNo"))) {
            page.setCurrent(Integer.parseInt(request.getParameter("pager.pageNo")));
        }
        if ("asc".equals(request.getParameter("direction"))) {
            if(StrUtil.isNotEmpty(request.getParameter("gridsort"))){
                page.setAsc(request.getParameter("gridsort").split(","));
            }else if(StrUtil.isNotEmpty(request.getParameter("sort"))){
                page.setAsc(request.getParameter("sort").split(","));
            }
        } else {
            if (StrUtil.isNotEmpty(request.getParameter("gridsort"))){
                page.setDesc(request.getParameter("gridsort").split(","));
            }else if(StrUtil.isNotEmpty(request.getParameter("sort"))){
                page.setAsc(request.getParameter("sort").split(","));
            }
        }
        requestWrapper.removeParamte("direction");
        requestWrapper.removeParamte("sort");
    }
}