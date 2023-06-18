package com.ChitChat.demo.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.HashMap;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ValidationErrorResponse {
    private int status = HttpStatus.BAD_REQUEST.value();

    private HashMap<String, String> messages;

    private String path;

    private Date timeStamp;
}
