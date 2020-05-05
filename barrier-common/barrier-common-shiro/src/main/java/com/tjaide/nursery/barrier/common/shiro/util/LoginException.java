package com.tjaide.nursery.barrier.common.shiro.util;

import org.apache.shiro.authc.AuthenticationException;

public class LoginException extends AuthenticationException {
    public LoginException(String message){
        super(message);
    }
}
