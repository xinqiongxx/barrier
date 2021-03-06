/*
 * Copyright (c) 2018-2025, Tjaide Group All rights reserved.
 */

package com.tjaide.nursery.barrier.common.data.mybatis;

import com.baomidou.mybatisplus.core.injector.ISqlInjector;
import com.baomidou.mybatisplus.core.parser.ISqlParser;
import com.baomidou.mybatisplus.extension.injector.LogicSqlInjector;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.tenant.TenantSqlParser;
import com.tjaide.nursery.barrier.common.data.datascope.DataScopeInterceptor;
import com.tjaide.nursery.barrier.common.data.meta.BarrierMetaObjectHandler;
import com.tjaide.nursery.barrier.common.data.tenant.CacxTenantHandler;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author maxinqiong
 * @date 2017/10/29
 */
@Configuration
@ConditionalOnBean(DataSource.class)
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
@MapperScan("com.tjaide.nursery.barrier.**.mapper")
public class MybatisPlusConfig {

    /**
     * 创建租户维护处理器对象
     *
     * @return 处理后的租户维护处理器
     */
    @Bean
    @ConditionalOnMissingBean
    public CacxTenantHandler cacxTenantHandler() {
        return new CacxTenantHandler();
    }

    /**
     * 分页插件
     *
     * @param tenantHandler 租户处理器
     * @return PaginationInterceptor
     */
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnProperty(name = "mybatisPlus.tenantEnable", havingValue = "true", matchIfMissing = true)
    public PaginationInterceptor paginationInterceptor(CacxTenantHandler tenantHandler) {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        List<ISqlParser> sqlParserList = new ArrayList<>();
        TenantSqlParser tenantSqlParser = new TenantSqlParser();
        tenantSqlParser.setTenantHandler(tenantHandler);
        sqlParserList.add(tenantSqlParser);
        paginationInterceptor.setSqlParserList(sqlParserList);
//      paginationInterceptor.setDialectType("sqlserver");
        return paginationInterceptor;
    }

    /**
     * 数据权限插件
     *
     * @param dataSource 数据源
     * @return DataScopeInterceptor
     */
    @Bean
    @ConditionalOnMissingBean
    public DataScopeInterceptor dataScopeInterceptor(DataSource dataSource) {
        return new DataScopeInterceptor(dataSource);
    }

    /**
     * 逻辑删除插件
     *
     * @return LogicSqlInjector
     */
    @Bean
    @ConditionalOnMissingBean
    public ISqlInjector sqlInjector() {
        return new LogicSqlInjector();
    }


    /**
     * 自动填充器
     *
     * @return 自定义的自动填充器
     */
    @Bean
    @ConditionalOnMissingBean
    public BarrierMetaObjectHandler dcmxMetaObjectHandler() {
        return new BarrierMetaObjectHandler();
    }
}
