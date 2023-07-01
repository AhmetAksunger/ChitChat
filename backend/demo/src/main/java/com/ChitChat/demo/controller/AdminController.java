package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AdminController {

    private final MessageService messageService;

    @Autowired
    public AdminController(MessageService messageService){
        this.messageService = messageService;
    }
    @DeleteMapping("${api.prefix}/messages/delete-public")
    public void delete() {
        messageService.deletePublicMessages();
    }
}
