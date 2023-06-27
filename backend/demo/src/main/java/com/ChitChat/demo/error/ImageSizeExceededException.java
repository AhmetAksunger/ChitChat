package com.ChitChat.demo.error;

import lombok.Getter;

@Getter
public class ImageSizeExceededException extends RuntimeException {
    private String key = "image";
    private String errorMessage = "The image size exceeds the allowed limit of 500KB.";

    public ImageSizeExceededException(){
        super("The image size exceeds the allowed limit of 500KB.");
    }
}
