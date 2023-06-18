package com.ChitChat.demo.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ErrorResponse {

    private int status;

    private String message;

    private String path;

    private Date timeStamp;

}
