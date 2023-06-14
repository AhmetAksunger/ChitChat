package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.ConversationService;
import com.ChitChat.demo.dto.requests.CreateConversationRequest;
import com.ChitChat.demo.dto.responses.ConversationVM;
import com.ChitChat.demo.dto.responses.GetConversationMessagesResponse;
import com.ChitChat.demo.dto.responses.GetMessagedUsersResponse;
import com.ChitChat.demo.dto.responses.GetPublicConversationsResponse;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @PostMapping("/api/v1/conversations")
    public ConversationVM save(@RequestBody CreateConversationRequest createConversationRequest, @CurrentUser User user){

        return conversationService.save(createConversationRequest, user);
    }

    @GetMapping("/api/v1/conversations/public")
    public List<GetPublicConversationsResponse> getPublicConversations(){
        return conversationService.getPublicConversations();
    }

    @GetMapping("/api/v1/conversations/{conversationId}/messages")
    public GetConversationMessagesResponse getConversationMessages(@PathVariable(required = true) long conversationId){
        return conversationService.getConversationMessages(conversationId);
    }

    @GetMapping("/api/v1/conversations/participants/{username}/messages")
    public GetConversationMessagesResponse getConversationByParticipants(@CurrentUser User user, @PathVariable String username){

        return conversationService.getConversationByParticipants(user,username);
    }

    @GetMapping("/api/v1/conversations/messaged-participants")
    public List<GetMessagedUsersResponse> getMessagedUsersResponses(@CurrentUser User user){
        return conversationService.getMessagedUsersResponse(user);
    }

}
