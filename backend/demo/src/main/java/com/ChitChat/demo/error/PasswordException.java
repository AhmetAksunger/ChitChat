package com.ChitChat.demo.error;

public class PasswordException extends RuntimeException{
    public PasswordException(String message){
        super(message);
    }
}
