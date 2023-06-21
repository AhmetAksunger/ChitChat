package com.ChitChat.demo.error;

import lombok.Getter;

@Getter
public class UsernameAlreadyExistsException extends RuntimeException{

    private String key = "username";
    private String errorMessage = "Username already exists";
    public UsernameAlreadyExistsException(){
        super("Username already exists");
    }


}
