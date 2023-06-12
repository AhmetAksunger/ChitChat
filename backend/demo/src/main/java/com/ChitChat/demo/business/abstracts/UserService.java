package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.responses.UserVM;
import com.ChitChat.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    void save(UserRegisterRequest userRegisterRequest);

    Page<UserVM> getAllUsers(Pageable page);

    List<UserVM> getAllUsers();

}
