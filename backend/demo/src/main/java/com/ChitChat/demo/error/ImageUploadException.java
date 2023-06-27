package com.ChitChat.demo.error;

public class ImageUploadException extends RuntimeException{
    public ImageUploadException(){
        super("Failed to upload the image. Please check your internet connection and try again.");
    }
}
