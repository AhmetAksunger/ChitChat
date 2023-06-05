package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.UserRegisterRequest;

public interface UserService {

    void save(UserRegisterRequest userRegisterRequest);

}
