package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.MessageService;
import com.ChitChat.demo.dto.requests.CreateMessageRequest;
import com.ChitChat.demo.dto.responses.MessageVM;
import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.Token;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.repository.TokenRepository;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @Autowired
    private TokenRepository tokenRepository;
    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public MessageVM receivePublicMessage(@Payload CreateMessageRequest createMessageRequest) {

        return messageService.save(createMessageRequest, createMessageRequest.getSenderName());
    }

    @MessageMapping("/private-message")
    public MessageVM receivePrivateMessage(@Payload CreateMessageRequest createMessageRequest){
        MessageVM message = messageService.save(createMessageRequest,createMessageRequest.getSenderName());
        messagingTemplate.convertAndSendToUser(createMessageRequest.getReceiverName(),"/private",message); // /user/{username}/private
        messagingTemplate.convertAndSendToUser(createMessageRequest.getSenderName(),"/private",message); // /user/{username}/private

        return message;
    }

    /*
    @PostMapping("/test")
    public MessageVM a(@RequestBody CreateMessageRequest createMessageRequest,@CurrentUser User sender){
        return messageService.save(createMessageRequest,sender);
    }
     */
}
