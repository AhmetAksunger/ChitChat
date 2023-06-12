package com.ChitChat.demo.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateMessageRequest {

    private String senderName;
    private String receiverName;
    private String message;
    private long conversationId;
}
