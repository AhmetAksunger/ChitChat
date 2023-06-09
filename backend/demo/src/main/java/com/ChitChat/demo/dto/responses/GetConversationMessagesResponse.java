package com.ChitChat.demo.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetConversationMessagesResponse {

    private long id;
    private boolean isPublic;
    List<MessageVM> messages;
}
