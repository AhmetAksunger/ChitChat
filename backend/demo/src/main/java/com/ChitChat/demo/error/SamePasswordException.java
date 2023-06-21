package com.ChitChat.demo.error;

public class SamePasswordException extends PasswordException{
    public SamePasswordException(){
        super("New password cannot be the same as the previous password.");
    }
}
