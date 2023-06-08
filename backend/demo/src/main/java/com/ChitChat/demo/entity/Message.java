package com.ChitChat.demo.entity;

import com.ChitChat.demo.dto.responses.UserVM;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private UserVM sender;
    private UserVM receiver;
    private String message;
    private Status status;
}
