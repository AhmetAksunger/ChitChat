package com.ChitChat.demo.error;

import lombok.Getter;

@Getter
public class InvalidImageFileTypeException extends RuntimeException{

    private String key = "image";

    private String errorMessage = "Invalid image file type. Only JPEG, JPG, and PNG files are allowed.";
    public InvalidImageFileTypeException(){
        super("Invalid image file type. Only JPEG, JPG, and PNG files are allowed.");
    }
}
