package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.responses.UserVM;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/v1/users")
    public ResponseEntity<?> getAllUsers(Pageable page, @RequestParam(name = "pageable",required = false,defaultValue = "true") boolean isPageable, @CurrentUser User user){
        if(isPageable){
            return ResponseEntity.ok(userService.getAllUsers(page,user));
        }
        return ResponseEntity.ok(userService.getAllUsers(user));
    }

    @PostMapping("/api/v1/users")
    public void save(@RequestBody @Validated UserRegisterRequest userRegisterRequest){
        userService.save(userRegisterRequest);
    }
}
