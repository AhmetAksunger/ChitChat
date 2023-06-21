package com.ChitChat.demo.error;

public class PasswordMismatchException extends RuntimeException{
    public PasswordMismatchException() {
        super("The provided old password does not match the user's current password.");
    }
}
