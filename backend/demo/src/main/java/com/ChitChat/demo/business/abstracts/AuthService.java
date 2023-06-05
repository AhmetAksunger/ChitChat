package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.CredentialsRequest;
import com.ChitChat.demo.dto.responses.AuthResponse;

public interface AuthService {
    AuthResponse authenticate(CredentialsRequest credentialsRequest);

}
