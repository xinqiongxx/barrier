/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : barrier

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 08/06/2020 14:08:33
*/
USE barrier
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_barrier
-- ----------------------------
DROP TABLE IF EXISTS `sys_barrier`;
CREATE TABLE `sys_barrier` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '编号',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `operator_id` int DEFAULT NULL COMMENT '创建人',
  `operator_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建人姓名',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '0' COMMENT '删除标志',
  `enter_flatbed` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '进入平板',
  `leave_flatbed` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '离开平板',
  `tenant_id` int DEFAULT NULL COMMENT '租户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='道闸表';

-- ----------------------------
-- Table structure for sys_depot_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_depot_user`;
CREATE TABLE `sys_depot_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '姓名',
  `depot_id` int DEFAULT NULL COMMENT '底库ID详细',
  `depot_type` int DEFAULT NULL COMMENT '底库type',
  `dept_id` int DEFAULT NULL COMMENT '部门ID',
  `user_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '人员类型（1学生2教职工3家长9未知）',
  `photo` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '照片',
  `gender` int DEFAULT NULL COMMENT '性别1男生2女生',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `nation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '民族(字典)',
  `certificate_type` int DEFAULT NULL COMMENT '证件类型',
  `card_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '证件号码',
  `birthday` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '出生日期',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `create_time` datetime DEFAULT NULL,
  `operator_id` int DEFAULT NULL,
  `operator_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '0' COMMENT '删除标志',
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用底库表';

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门名称',
  `sort` int DEFAULT NULL COMMENT '排序',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '是否删除  -1：已删除  0：正常',
  `parent_id` int DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `dept_type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '部门类型（1办公部门2教学部门3学院4专业5班级）',
  `dept_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '编号',
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='部门管理';

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` VALUES (1, '西青区某幼儿园', 1, '2018-01-22 19:00:23', '2020-06-08 14:04:16', '0', -1, 1, '0', 'YEY-001');
INSERT INTO `sys_dept` VALUES (2, '管理部门', 0, '2020-05-05 06:09:25', '2020-05-05 06:09:25', '0', 1, NULL, '1', 'YEY-001');
INSERT INTO `sys_dept` VALUES (3, '教学部门', 1, '2020-05-05 06:09:36', '2020-05-05 06:09:36', '0', 1, NULL, '2', 'YEY-001');
INSERT INTO `sys_dept` VALUES (4, '后勤部门', 0, '2020-05-05 06:09:44', '2020-05-05 06:09:44', '0', 2, NULL, '1', 'YEY-001');
COMMIT;

-- ----------------------------
-- Table structure for sys_dept_relation
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept_relation`;
CREATE TABLE `sys_dept_relation` (
  `ancestor` int NOT NULL COMMENT '祖先节点',
  `descendant` int NOT NULL COMMENT '后代节点',
  PRIMARY KEY (`ancestor`,`descendant`) USING BTREE,
  KEY `idx1` (`ancestor`) USING BTREE,
  KEY `idx2` (`descendant`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='部门关系表';

-- ----------------------------
-- Records of sys_dept_relation
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept_relation` VALUES (2, 2);
INSERT INTO `sys_dept_relation` VALUES (2, 4);
INSERT INTO `sys_dept_relation` VALUES (3, 3);
INSERT INTO `sys_dept_relation` VALUES (4, 4);
COMMIT;

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编号',
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型',
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注信息',
  `system` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '0-否|1-是',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '删除标记',
  `tenant_id` int NOT NULL DEFAULT '0' COMMENT '所属租户',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sys_dict_del_flag` (`del_flag`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8 COMMENT='字典表';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict` VALUES (94, 'dict_type', '字典类型', '2020-05-05 03:17:06', '2020-05-05 03:17:06', NULL, '1', '0', 1);
INSERT INTO `sys_dict` VALUES (95, 'class_type', '班级类别', '2020-05-05 03:26:43', '2020-05-05 04:32:07', '按照学校信息调整班级', '0', '0', 1);
INSERT INTO `sys_dict` VALUES (96, 'black_list', '黑名单底库', '2020-05-05 03:27:26', '2020-05-05 04:32:22', '人员识别黑名单', '0', '0', 1);
INSERT INTO `sys_dict` VALUES (97, 'white_list', '白名单底库', '2020-05-05 03:28:01', '2020-05-05 04:32:29', '人员识别白名单', '0', '0', 1);
INSERT INTO `sys_dict` VALUES (98, 'gate_type', '门闸类型', '2020-05-05 03:30:04', '2020-05-05 04:32:37', '门闸位置类型', '0', '0', 1);
INSERT INTO `sys_dict` VALUES (99, 'certificate_type', '证件类型', '2020-05-05 12:08:51', '2020-05-05 12:08:51', NULL, '0', '0', 1);
INSERT INTO `sys_dict` VALUES (100, 'nation_type', '民族', '2020-05-06 09:59:36', '2020-05-07 07:07:11', NULL, '0', '0', 1);
INSERT INTO `sys_dict` VALUES (101, 'parent_type', '家长类型', '2020-05-07 11:23:48', '2020-05-07 11:23:48', NULL, '0', '0', 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_item
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_item`;
CREATE TABLE `sys_dict_item` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编号',
  `dict_id` int NOT NULL,
  `value` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据值',
  `label` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名',
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型',
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述',
  `sort` int NOT NULL COMMENT '排序（升序）',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '删除标记',
  `tenant_id` int NOT NULL DEFAULT '0' COMMENT '所属租户',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sys_dict_value` (`value`) USING BTREE,
  KEY `sys_dict_label` (`label`) USING BTREE,
  KEY `sys_dict_del_flag` (`del_flag`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='字典项';

-- ----------------------------
-- Records of sys_dict_item
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_item` VALUES (1, 94, '1', '系统类', 'dict_type', '系统类', 1, '2020-05-05 16:22:46', '2020-06-08 14:06:07', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (2, 94, '0', '业务类', 'dict_type', '业务类', 0, '2020-05-05 16:23:01', '2020-06-08 14:06:09', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (3, 98, 'dorm_in', '进宿舍', 'gate_type', '进宿舍', 0, '2020-05-05 16:30:43', '2020-06-08 14:06:20', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (4, 98, 'dorm_out', '出宿舍', 'gate_type', '出宿舍', 1, '2020-05-05 16:30:59', '2020-06-08 14:06:23', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (5, 98, 'school_in', '进学校', 'gate_type', '进学校', 2, '2020-05-05 16:31:19', '2020-06-08 14:06:25', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (6, 98, 'school_out', '出学校', 'gate_type', '出学校', 3, '2020-05-05 16:31:37', '2020-06-08 14:06:28', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (7, 97, '0', '教师库', 'white_list', '教师库', 0, '2020-05-05 16:32:05', '2020-06-08 14:06:30', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (8, 97, '1', '学生库', 'white_list', '学生库', 1, '2020-05-05 16:32:23', '2020-06-08 14:06:31', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (9, 97, '2', '家长库', 'white_list', '家长库', 2, '2020-05-05 16:32:40', '2020-06-08 14:06:31', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (10, 96, '0', '违纪库', 'black_list', '违纪库', 0, '2020-05-05 17:03:36', '2020-06-08 14:06:33', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (11, 95, '0', '小班', 'class_type', '小班', 0, '2020-05-05 17:03:57', '2020-06-08 14:06:34', NULL, '1', 1);
INSERT INTO `sys_dict_item` VALUES (12, 95, '1', '中班', 'class_type', '中班', 0, '2020-05-05 17:04:06', '2020-06-08 14:06:35', NULL, '1', 1);
INSERT INTO `sys_dict_item` VALUES (13, 95, '2', '大班', 'class_type', '大班', 0, '2020-05-05 17:04:26', '2020-06-08 14:06:35', NULL, '1', 1);
INSERT INTO `sys_dict_item` VALUES (14, 99, '0', '身份证', 'certificate_type', '身份证', 0, '2020-05-06 01:09:10', '2020-06-08 14:06:36', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (15, 99, '1', '护照', 'certificate_type', '护照', 0, '2020-05-06 01:09:16', '2020-06-08 14:06:37', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (16, 100, '1', '汉族', 'nation_type', '汉族', 0, '2020-05-06 22:59:45', '2020-06-08 14:06:38', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (17, 100, '2', '蒙古族', 'nation_type', '蒙古族', 0, '2020-05-06 22:59:54', '2020-06-08 14:06:40', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (18, 101, '0', '爸爸', 'parent_type', '爸爸', 0, '2020-05-08 00:23:59', '2020-06-08 14:06:41', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (19, 101, '1', '妈妈', 'parent_type', '妈妈', 0, '2020-05-08 00:24:06', '2020-06-08 14:06:42', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (20, 101, '2', '爷爷', 'parent_type', '爷爷', 0, '2020-05-08 00:24:14', '2020-06-08 14:06:46', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (21, 101, '3', '奶奶', 'parent_type', '奶奶', 0, '2020-05-08 00:24:21', '2020-06-08 14:06:48', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (22, 101, '4', '姥爷', 'parent_type', '姥爷', 0, '2020-05-08 00:24:33', '2020-06-08 14:06:49', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (23, 101, '5', '姥姥', 'parent_type', '姥姥', 0, '2020-05-08 00:24:41', '2020-06-08 14:06:50', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (24, 99, '2', '职工号', 'certificate_type', '职工号', 0, '2020-05-13 11:44:39', '2020-06-08 14:06:50', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (25, 99, '3', '其他', 'certificate_type', '其他', 0, '2020-05-13 12:47:44', '2020-06-08 14:06:51', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (26, 95, '0', '小班', 'class_type', '小班', 0, '2020-06-02 12:01:58', '2020-06-08 14:06:52', NULL, '1', 1);
INSERT INTO `sys_dict_item` VALUES (27, 97, '-1', '默认白名单', 'white_list', '默认库', -1, '2020-06-03 12:05:00', '2020-06-08 14:06:53', NULL, '0', 1);
INSERT INTO `sys_dict_item` VALUES (28, 101, '-1', '其他', 'parent_type', '其他', 0, '2020-05-13 12:47:44', '2020-06-08 14:06:56', NULL, '0', 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_flatbed
-- ----------------------------
DROP TABLE IF EXISTS `sys_flatbed`;
CREATE TABLE `sys_flatbed` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
  `number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '编号',
  `ip_address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'IP地址',
  `pass_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '进出类型',
  `online_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '在线状态',
  `rtsp_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'rtsp地址',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `operator_id` int DEFAULT NULL COMMENT '操作人',
  `operator_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '操作人姓名',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '0' COMMENT '删除标志',
  `tenant_id` int DEFAULT NULL COMMENT '租户ID',
  `process` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '进度',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='平板';

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '1' COMMENT '日志类型',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '' COMMENT '日志标题',
  `service_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '服务ID',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remote_addr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '操作IP地址',
  `user_agent` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户代理',
  `request_uri` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '请求URI',
  `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '操作方式',
  `params` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '操作提交的数据',
  `time` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '执行时间',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0' COMMENT '删除标记',
  `exception` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '异常信息',
  `tenant_id` int DEFAULT '0' COMMENT '所属租户',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `sys_log_create_by` (`create_by`) USING BTREE,
  KEY `sys_log_request_uri` (`request_uri`) USING BTREE,
  KEY `sys_log_type` (`type`) USING BTREE,
  KEY `sys_log_create_date` (`create_time`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='日志表';

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `permission` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单权限标识',
  `path` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '前端URL',
  `parent_id` int DEFAULT NULL COMMENT '父菜单ID',
  `iconclass` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图标',
  `sort` int DEFAULT '1' COMMENT '排序值',
  `keep_alive` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '0-开启，1- 关闭',
  `type` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '菜单类型 （0菜单 1按钮）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '逻辑删除标记(0--正常 1--删除)',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='菜单权限表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES (1, '用户管理', NULL, 'page/user/index', -1, 'icon-tiaoshi', 5, '0', '0', '2018-09-28 08:29:53', '2020-05-08 03:41:15', '0');
INSERT INTO `sys_menu` VALUES (2, '权限管理', '', 'page/role/index', -1, 'icon-changjingguanli', 9, '0', '0', '2020-05-04 05:10:09', '2020-05-08 03:40:54', '0');
INSERT INTO `sys_menu` VALUES (3, '功能管理', '', 'page/menu/menu', -1, 'icon-xiafa', 10, '0', '0', '2020-05-04 05:05:43', '2020-05-08 03:40:15', '0');
INSERT INTO `sys_menu` VALUES (4, '部门管理', '', 'page/dept/dept', -1, 'icon-bianji1', 8, '0', '0', '2020-05-04 21:34:00', '2020-05-08 03:41:31', '0');
INSERT INTO `sys_menu` VALUES (5, '底库管理', '', 'page/dict/dict', -1, 'icon-gerenzhongxin', 1, '0', '0', '2020-05-04 21:35:21', '2020-05-08 03:40:06', '0');
INSERT INTO `sys_menu` VALUES (6, '平板管理', '', 'page/flatbed/index', -1, 'icon-sousuo', 2, '0', '0', '2020-05-04 21:49:13', '2020-05-08 03:40:34', '0');
INSERT INTO `sys_menu` VALUES (7, '闸机管理', '', 'page/barrier/index', -1, 'icon-wordfile', 3, '0', '0', '2020-05-04 21:49:40', '2020-05-08 03:40:38', '0');
INSERT INTO `sys_menu` VALUES (8, '出入人员', NULL, 'page/depotUser/index', -1, 'icon-chakan', 4, '0', '0', '2020-05-05 13:12:01', '2020-05-08 03:40:43', '0');
INSERT INTO `sys_menu` VALUES (9, '1：1对比', NULL, 'page/contrast/index', -1, 'icon-icon_bangzhuwendang', 6, '0', '0', '2020-05-08 03:38:27', '2020-05-08 03:41:22', '0');
INSERT INTO `sys_menu` VALUES (10, '1：N对比', NULL, 'page/contrast/indexn', -1, 'icon-icon_shiyongwendang', 7, '0', '0', '2020-05-08 03:39:18', '2020-05-08 03:42:29', '0');
COMMIT;

-- ----------------------------
-- Table structure for sys_pass_process
-- ----------------------------
DROP TABLE IF EXISTS `sys_pass_process`;
CREATE TABLE `sys_pass_process` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `enter_type` int DEFAULT NULL COMMENT '进出类型1进2出',
  `sanp_pic` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '照片',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `status` int DEFAULT NULL COMMENT '处理状态',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `user_id` int DEFAULT NULL COMMENT '用户id（底库用户）（教师/幼儿）家长进入相当于学生进',
  `discern_id` int DEFAULT NULL COMMENT '识别id（家长/教师/幼儿）',
  `registered_pic` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='进出记录表';

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ds_type` int NOT NULL DEFAULT '2' COMMENT '数据权限类型',
  `ds_scope` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT '数据权限范围',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '0' COMMENT '删除标识（0-正常,1-删除）',
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE,
  KEY `role_idx1_role_code` (`role_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='系统角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES (1, '管理员', 'ROLE_ADMIN', '管理员', 0, '2', '2017-10-29 15:45:51', '2018-12-26 14:09:11', '0', 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `role_id` int NOT NULL COMMENT '角色ID',
  `menu_id` int NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`,`menu_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色菜单表';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES (1, 1);
INSERT INTO `sys_role_menu` VALUES (1, 2);
INSERT INTO `sys_role_menu` VALUES (1, 3);
INSERT INTO `sys_role_menu` VALUES (1, 4);
INSERT INTO `sys_role_menu` VALUES (1, 5);
INSERT INTO `sys_role_menu` VALUES (1, 6);
INSERT INTO `sys_role_menu` VALUES (1, 7);
INSERT INTO `sys_role_menu` VALUES (1, 8);
INSERT INTO `sys_role_menu` VALUES (1, 9);
INSERT INTO `sys_role_menu` VALUES (1, 10);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '昵称',
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '随机盐',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '简介',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '头像',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `lock_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '0' COMMENT '0-正常，9-锁定',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '0' COMMENT '0-正常，1-删除',
  `tenant_id` int NOT NULL DEFAULT '0' COMMENT '所属租户',
  `client_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '客户端ID',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `user_idx1_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11567 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES (1, '管理员', 'admin', '15c9ccc7eceafaeaadbd231a3afc0ad3', 'bcef68b6f25a3743b4de0afac9f2c632', NULL, '', '2018-04-20 15:15:18', '2020-05-08 11:11:20', '0', '0', 1, '387493c9bb60150f0eb2a4011106e95f', 'tacy_qi@163.com');
COMMIT;

-- ----------------------------
-- Table structure for sys_user_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_dept`;
CREATE TABLE `sys_user_dept` (
  `user_id` int NOT NULL COMMENT '用户ID',
  `dept_id` int NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`dept_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_user_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_dept` VALUES (1, 1);
INSERT INTO `sys_user_dept` VALUES (11563, 471);
INSERT INTO `sys_user_dept` VALUES (11566, 470);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_relation
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_relation`;
CREATE TABLE `sys_user_relation` (
  `user_id` int NOT NULL,
  `member_id` int NOT NULL,
  `relation_type` int DEFAULT NULL COMMENT '关系1父亲2母亲3外婆4奶奶5外公6爷爷7姐姐哥哥8其他亲戚',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `if_student` int DEFAULT NULL COMMENT '用户是否是学生',
  PRIMARY KEY (`user_id`,`member_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` int NOT NULL COMMENT '用户ID',
  `role_id` int NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES (1, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
