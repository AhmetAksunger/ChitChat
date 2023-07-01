package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.AuthService;
import com.ChitChat.demo.dto.requests.CredentialsRequest;
import com.ChitChat.demo.dto.responses.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("${api.prefix}/auth")
    public ResponseEntity<AuthResponse> login(@RequestBody CredentialsRequest credentialsRequest) {
        return ResponseEntity.ok(authService.authenticate(credentialsRequest));
    }

    @PostMapping("${api.prefix}/logout")
    public void logout(@RequestHeader(name = "Authorization") String authorization) {
        String token = authorization.substring(7);
        authService.clearToken(token);
    }
}
