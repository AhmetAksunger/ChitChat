package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.responses.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/v1/users")
    public Page<UserVM> getAllUsers(Pageable page){
     return userService.getAllUsers(page);
    }
}
