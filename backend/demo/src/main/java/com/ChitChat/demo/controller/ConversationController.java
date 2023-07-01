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
@RequestMapping("${api.prefix}/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    @Autowired
    public ConversationController(ConversationService conversationService){
        this.conversationService = conversationService;
    }
    @PostMapping()
    public ConversationVM save(@RequestBody CreateConversationRequest createConversationRequest, @CurrentUser User user){

        return conversationService.save(createConversationRequest, user);
    }

    @GetMapping("/public")
    public List<GetPublicConversationsResponse> getPublicConversations(){
        return conversationService.getPublicConversations();
    }

    @GetMapping("/{conversationId}/messages")
    public GetConversationMessagesResponse getConversationMessages(@PathVariable(required = true) long conversationId){
        return conversationService.getConversationMessages(conversationId);
    }

    @GetMapping("/participants/{username}/messages")
    public GetConversationMessagesResponse getConversationByParticipants(@CurrentUser User user, @PathVariable String username){

        return conversationService.getConversationByParticipants(user,username);
    }

    @GetMapping("/messaged-participants")
    public List<GetMessagedUsersResponse> getMessagedUsersResponses(@CurrentUser User user){
        return conversationService.getMessagedUsersResponse(user);
    }

}
