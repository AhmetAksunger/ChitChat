package com.ChitChat.demo.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageVM {
    private long id;
    private String senderName;
    private String message;
    private Date timeStamp;
    private long conversationId;
}
