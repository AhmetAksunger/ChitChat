package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.ImageService;
import com.ChitChat.demo.entity.Image;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.repository.ImageRepository;
import com.ChitChat.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@Service
public class ImageManager implements ImageService {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public void setProfileImage(MultipartFile image, User user) {

        try {
            if(!image.isEmpty()){
                Image imageEntity = new Image();
                imageEntity.setUser(user);
                imageEntity.setImageData(Base64.getEncoder().encodeToString(image.getBytes()));
                imageRepository.save(imageEntity);
                user.setProfileImage(imageEntity);
                userRepository.save(user);
            }
        }catch (Exception ex){
            System.err.println(ex.getMessage());
        }
    }
}
