package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.AuthService;
import com.ChitChat.demo.dto.requests.CredentialsRequest;
import com.ChitChat.demo.dto.responses.AuthResponse;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.error.AuthenticationException;
import com.ChitChat.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthManager implements AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Override
    public AuthResponse authenticate(CredentialsRequest credentialsRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(credentialsRequest.getUsername());

        if(optionalUser.isEmpty()){
            throw new AuthenticationException();
        }

        User user = optionalUser.get();

        boolean matches = passwordEncoder.matches(credentialsRequest.getPassword(),user.getPassword());

        if(matches){
            return new AuthResponse(user);
        }else{
            throw new AuthenticationException();
        }

    }
}
