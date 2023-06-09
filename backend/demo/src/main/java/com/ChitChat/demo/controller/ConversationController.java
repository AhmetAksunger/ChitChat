package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.ConversationService;
import com.ChitChat.demo.dto.requests.CreateConversationRequest;
import com.ChitChat.demo.dto.responses.ConversationVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @PostMapping("/api/v1/conversations")
    public ConversationVM save(@RequestBody CreateConversationRequest createConversationRequest){
        return conversationService.save(createConversationRequest);
    }
}
