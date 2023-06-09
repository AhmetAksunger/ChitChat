package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.MessageService;
import com.ChitChat.demo.dto.requests.CreateMessageRequest;
import com.ChitChat.demo.dto.responses.MessageVM;
import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
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
    /*@MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public Message receivePublicMessage(@Payload Message message){

        return messageService.save(message);
    }*/

    @MessageMapping("/private-message")
    public MessageVM receivePrivateMessage(@Payload CreateMessageRequest createMessageRequest, @CurrentUser User sender){
        messagingTemplate.convertAndSendToUser(sender.getUsername(),"/private",createMessageRequest.getMessage()); // /user/{username}/private
        return messageService.save(createMessageRequest,sender);
    }

    @PostMapping("/test")
    public MessageVM a(@RequestBody CreateMessageRequest createMessageRequest,@CurrentUser User sender){
        return messageService.save(createMessageRequest,sender);
    }
}
