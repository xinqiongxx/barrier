package com.tjaide.nursery.barrier.common.shiro.util;

import lombok.experimental.UtilityClass;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

/**
 * 密码加密工具类

 * 作者：马鑫琼
 * 邮箱：xinqiongxx@163.com
 * 日期：2019年08月06日-08:51

 **/
@UtilityClass
public class PasswordUtil {

    private RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();
    private String algorithmName = "md5";
    private int hashIterations = 2;


    public void setRandomNumberGenerator(RandomNumberGenerator randomNumberGenerator) {
        PasswordUtil.randomNumberGenerator = randomNumberGenerator;
    }

    public void setAlgorithmName(String algorithmName) {
        PasswordUtil.algorithmName = algorithmName;
    }

    public void setHashIterations(int hashIterations) {
        PasswordUtil.hashIterations = hashIterations;
    }

    public Map<String, Object> encryptPassword(String password) {
//        Map<String, Object> res = new HashMap<>();
//
//        res.put("salt", randomNumberGenerator.nextBytes().toHex());
//
//        String newPassword = new SimpleHash(
//                algorithmName,
//                password,
//                ByteSource.Util.bytes(res.get("salt")),
//                hashIterations).toHex();
//        res.put("password", newPassword);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(8, new SecureRandom());
        Map<String, Object> res = new HashMap<>();
        res.put("password", encoder.encode(password));
        return res;
    }

    public boolean matches(String salt, String password, String oldPassword) {
        String newPassword = new SimpleHash(
                algorithmName,
                password,
                salt,
                hashIterations).toHex();
        return newPassword.equals(oldPassword);
    }

    public static void main(String[] args) {
        RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();

        String salt = randomNumberGenerator.nextBytes().toHex();
        System.out.println(salt);
        String newPassword = new SimpleHash(
                algorithmName,
                "111111",
                null,
                hashIterations).toHex();
        System.out.println(newPassword);
        System.out.println(encryptPassword("111111"));

    }
}
