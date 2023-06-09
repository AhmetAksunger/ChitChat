package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.AuthService;
import com.ChitChat.demo.dto.requests.CredentialsRequest;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.responses.AuthResponse;
import com.ChitChat.demo.dto.responses.UserVM;
import com.ChitChat.demo.entity.Token;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.error.AuthenticationException;
import com.ChitChat.demo.mapper.ModelMapperService;
import com.ChitChat.demo.repository.TokenRepository;
import com.ChitChat.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthManager implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final ModelMapperService mapperService;

    @Autowired
    public AuthManager(
            PasswordEncoder passwordEncoder,
            UserRepository userRepository,
            TokenRepository tokenRepository,
            ModelMapperService mapperService
    ) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.mapperService = mapperService;
    }

    @Override
    public AuthResponse authenticate(CredentialsRequest credentialsRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(credentialsRequest.getUsername());

        if(optionalUser.isEmpty()){
            throw new AuthenticationException();
        }

        User user = optionalUser.get();

        boolean matches = passwordEncoder.matches(credentialsRequest.getPassword(),user.getPassword());

        if(matches){
            String token = generateRandomToken();
            Token tokenEntity = Token.builder().token(token).user(user).build();
            tokenRepository.save(tokenEntity);

            AuthResponse response = AuthResponse.builder().token(token).user(mapperService.forResponse().map(user, UserVM.class))
                            .authorities(user.getAuthorities()).build();
            return response;
        }else{
            throw new AuthenticationException();
        }

    }
    @Transactional
    public UserDetails getUserDetails(String token) {

        Optional<Token> optionalToken = tokenRepository.findById(token);

        if(optionalToken.isEmpty()) {
            return null;
        }
        return optionalToken.get().getUser();
    }

    @Override
    public void clearToken(String token) {
        tokenRepository.deleteById(token);
    }

    private String generateRandomToken(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }
}
