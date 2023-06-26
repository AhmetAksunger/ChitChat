package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    private MessageService messageService;

    @DeleteMapping("/api/v1/messages/delete-public")
    public void delete(){
        messageService.deletePublicMessages();
    }
}
