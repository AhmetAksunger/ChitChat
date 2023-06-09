package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.MessageService;
import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;
    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public Message receivePublicMessage(@Payload Message message){

        return messageService.save(message);
    }

    @MessageMapping("/private-message")
    public Message receivePrivateMessage(@Payload Message message){
        messagingTemplate.convertAndSendToUser(message.getSenderName(),"/private",message); // /user/{username}/private
        return messageService.save(message);
    }

    @GetMapping("/api/v1/messages/users")
    public List<String> getMessagedUsers(@CurrentUser User user){
        return messageService.getMessagedUsernames(user);
    }
}
