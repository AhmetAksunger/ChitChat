package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

public interface ImageService {
    HashMap<String,Boolean> setProfileImage(MultipartFile image, User user);
}
