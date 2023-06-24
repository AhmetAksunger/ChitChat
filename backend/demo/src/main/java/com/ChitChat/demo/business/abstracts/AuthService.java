package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.CredentialsRequest;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.responses.AuthResponse;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    AuthResponse authenticate(CredentialsRequest credentialsRequest);
    UserDetails getUserDetails(String token);

    void clearToken(String token);
}
