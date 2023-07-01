package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.MessageService;
import com.ChitChat.demo.dto.requests.CreateMessageRequest;
import com.ChitChat.demo.dto.responses.CreateMessageResponse;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;

    private final MessageService messageService;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService){
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
    }
    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public CreateMessageResponse receivePublicMessage(@Payload @Validated CreateMessageRequest createMessageRequest) {

        return messageService.save(createMessageRequest, createMessageRequest.getSenderName());
    }

    @MessageMapping("/private-message")
    public CreateMessageResponse receivePrivateMessage(@Payload @Validated CreateMessageRequest createMessageRequest){
        CreateMessageResponse message = messageService.save(createMessageRequest,createMessageRequest.getSenderName());
        messagingTemplate.convertAndSendToUser(createMessageRequest.getReceiverName(),"/private",message); // /user/{username}/private
        messagingTemplate.convertAndSendToUser(createMessageRequest.getSenderName(),"/private",message); // /user/{username}/private

        return message;
    }

    @DeleteMapping("/api/v1/messages/{messageId}")
    public void deleteMessage(@PathVariable long messageId, @CurrentUser User user){
        System.err.println(user.getUsername());
        messageService.delete(messageId,user);
    }


}
