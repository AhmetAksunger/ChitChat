package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.entity.User;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    void setProfileImage(MultipartFile image, User user);
}
