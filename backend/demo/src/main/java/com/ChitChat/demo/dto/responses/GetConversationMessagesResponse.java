package com.ChitChat.demo.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class GetConversationMessagesResponse {

    private long id;

    private boolean isPublic;

    private List<MessageVM> messages;

    private boolean isExists;

    public GetConversationMessagesResponse(){
        this.isExists = true;
    }
}
