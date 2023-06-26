package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.requests.UserUpdateRequest;
import com.ChitChat.demo.dto.responses.GetUserResponse;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.error.AuthenticationException;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/v1/users")
    public ResponseEntity<?> getAllUsers(Pageable page, @RequestParam(name = "pageable",required = false,defaultValue = "true") boolean isPageable,
                                         @RequestParam(name = "like",required = false) String input,@CurrentUser User user){

        if(isPageable){
            return ResponseEntity.ok(userService.getAllUsers(page,user));
        }
        if(input != null){
            return ResponseEntity.ok(userService.getUsersLike(input));
        }
        return ResponseEntity.ok(userService.getAllUsers(user));
    }

    @PostMapping("/api/v1/users")
    public void save(@RequestBody @Validated UserRegisterRequest userRegisterRequest){
        userService.save(userRegisterRequest);
    }

    @PutMapping(value = "/api/v1/users/{id}")
    public void update(@RequestBody @Validated UserUpdateRequest userUpdateRequest, @PathVariable long id, @CurrentUser User user){
        if(user.getId() != id){
            throw new AuthenticationException();
        }
        userService.update(userUpdateRequest,id);
    }

    @DeleteMapping("api/v1/users/{id}")
    public void delete(@PathVariable long id,@CurrentUser User user){
        userService.delete(id,user);
    }

    @GetMapping("/api/v1/users/{id}")
    public GetUserResponse getUser(@PathVariable long id){
        return userService.getUser(id);
    }
}
