package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.responses.UserVM;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.repository.UserRepository;
import com.ChitChat.demo.mapper.ModelMapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserManager implements UserService {

    @Autowired
    private ModelMapperService mapperService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void save(UserRegisterRequest userRegisterRequest) {
        String encodedPassword = passwordEncoder.encode(userRegisterRequest.getPassword());
        User user = new User();
        user.setUsername(userRegisterRequest.getUsername());
        user.setPassword(encodedPassword);

        userRepository.save(user);
    }

    @Override
    public Page<UserVM> getAllUsers(Pageable page) {
        Page<User> users = userRepository.findAll(page);
        return users.map(userInList -> mapperService.forResponse().map(userInList, UserVM.class));
    }


}
