package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.AuthService;
import com.ChitChat.demo.dto.requests.CredentialsRequest;
import com.ChitChat.demo.dto.responses.AuthResponse;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/api/v1/auth")
    public ResponseEntity<AuthResponse> login(@RequestBody CredentialsRequest credentialsRequest){
        return ResponseEntity.ok(authService.authenticate(credentialsRequest));
    }

}
