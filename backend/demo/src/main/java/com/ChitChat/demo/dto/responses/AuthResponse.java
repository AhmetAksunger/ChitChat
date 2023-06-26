package com.ChitChat.demo.dto.responses;

import com.ChitChat.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String token;
    private UserVM user;
    private Collection<?> authorities;
}
