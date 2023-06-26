package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.requests.UserUpdateRequest;
import com.ChitChat.demo.dto.responses.GetUserResponse;
import com.ChitChat.demo.dto.responses.UserVM;
import com.ChitChat.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    void save(UserRegisterRequest userRegisterRequest);

    Page<UserVM> getAllUsers(Pageable page, User loggedInUser);

    List<UserVM> getAllUsers(User loggedInUser);

    void update(UserUpdateRequest userUpdateRequest, long id);

    GetUserResponse getUser(long id);

    List<UserVM> getUsersLike(String input);

    void delete(long id, User user);
}
