package com.tjaide.nursery.barrier.web.config;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.tjaide.nursery.barrier.web.entity.SysFlatbed;
import com.tjaide.nursery.barrier.web.service.SysFlatbedService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AfterServiceStarted implements ApplicationRunner {


    @Autowired
    private SysFlatbedService sysFlatbedService;

    /**
     * 会在服务启动完成后立即执行
     */
    @Override
    public void run(ApplicationArguments args) throws Exception {
        sysFlatbedService.update(Wrappers.<SysFlatbed>lambdaUpdate().set(SysFlatbed::getOnlineStatus,0));
    }
}