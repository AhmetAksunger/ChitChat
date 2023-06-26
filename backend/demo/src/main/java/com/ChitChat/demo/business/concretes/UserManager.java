package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.dto.requests.UserUpdateRequest;
import com.ChitChat.demo.dto.responses.GetUserResponse;
import com.ChitChat.demo.dto.responses.UserVM;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.error.AuthenticationException;
import com.ChitChat.demo.error.PasswordMismatchException;
import com.ChitChat.demo.error.SamePasswordException;
import com.ChitChat.demo.error.UsernameAlreadyExistsException;
import com.ChitChat.demo.repository.TokenRepository;
import com.ChitChat.demo.repository.UserRepository;
import com.ChitChat.demo.mapper.ModelMapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserManager implements UserService {

    @Autowired
    private ModelMapperService mapperService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void save(UserRegisterRequest userRegisterRequest) {

        if(userRepository.existsByUsername(userRegisterRequest.getUsername())){
            throw new UsernameAlreadyExistsException();
        }

        String encodedPassword = passwordEncoder.encode(userRegisterRequest.getPassword());
        User user = new User();
        user.setUsername(userRegisterRequest.getUsername());
        user.setPassword(encodedPassword);

        userRepository.save(user);
    }

    @Override
    public Page<UserVM> getAllUsers(Pageable page, User loggedInUser) {
        Page<User> users = userRepository.findByUsernameNot(page, loggedInUser.getUsername());
        return users.map(userInList -> mapperService.forResponse().map(userInList, UserVM.class));
    }

    @Override
    public List<UserVM> getAllUsers(User loggedInUser) {
        List<User> users = userRepository.findByUsernameNot(loggedInUser.getUsername());
        List<UserVM> responses = new ArrayList<>();
        for (User user:users) {
            var response = mapperService.forResponse().map(user, UserVM.class);
            if(user.getProfileImage() != null){
                response.setProfileImage(user.getProfileImage().getImageData());
            }
            responses.add(response);
        }
        return responses;
    }

    @Override
    @Transactional
    public void update(UserUpdateRequest userUpdateRequest, long id) {

        User user = userRepository.findById(id).orElseThrow();

        // if user wants to change its password
        if(userUpdateRequest.getNewPassword() != null){
            boolean matches = passwordEncoder.matches(userUpdateRequest.getOldPassword(), user.getPassword());
            if(!matches){
                throw new PasswordMismatchException();
            }
            //if matches

            //if the new password is the same as the previous password
            if(passwordEncoder.matches(userUpdateRequest.getNewPassword(), user.getPassword())){
                throw new SamePasswordException();
            }


            tokenRepository.deleteByUserId(id);
            user.setPassword(passwordEncoder.encode(userUpdateRequest.getNewPassword()));

        }

        if(userUpdateRequest.getUsername() != null){
            if(userRepository.existsByUsername(userUpdateRequest.getUsername())){
                throw new UsernameAlreadyExistsException();
            }
            user.setUsername(userUpdateRequest.getUsername());
        }

        userRepository.save(user);
    }

    @Override
    public GetUserResponse getUser(long id) {
        User user = userRepository.findById(id).orElseThrow();
        GetUserResponse response = new GetUserResponse();
        response.setUsername(user.getUsername());
        if(user.getProfileImage() != null){
            response.setProfileImage(user.getProfileImage().getImageData());
        }
        return response;
    }

    @Override
    public List<UserVM> getUsersLike(String input) {
        List<User> users = userRepository.findAllByUsernameContainingIgnoreCase(input);
        List<UserVM> responses = new ArrayList<>();
        for (User user:users) {
            var response = mapperService.forResponse().map(user, UserVM.class);
            if(user.getProfileImage() != null){
                response.setProfileImage(user.getProfileImage().getImageData());
            }
            responses.add(response);
        }
        return responses;
    }

    @Override
    public void delete(long id, User loggedInUser) {
        User user = userRepository.findById(id).orElseThrow();

        if(!loggedInUser.getUsername().equals(user.getUsername())){
            throw new AuthenticationException();
        }

        userRepository.delete(user);
    }


}
