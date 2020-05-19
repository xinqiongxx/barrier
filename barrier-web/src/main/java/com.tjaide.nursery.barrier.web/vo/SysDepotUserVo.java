package com.tjaide.nursery.barrier.web.vo;

import com.tjaide.nursery.barrier.web.entity.SysDepotUser;
import lombok.Data;

import java.util.List;


/**
 * 用户返回数据
 * 构建组：barrier
 * 作者：maxinqiong
 * 邮箱：xinqiongxx@163.com
 * 日期：2020年05月19日-23:10
 * 版权：天津市爱德科技发展有限公司
 **/
@Data
public class SysDepotUserVo extends SysDepotUser {

    String parentName;

    List<SysDepotUser> parents;
}
