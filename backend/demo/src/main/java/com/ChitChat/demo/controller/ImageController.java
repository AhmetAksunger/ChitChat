package com.ChitChat.demo.controller;

import com.ChitChat.demo.business.abstracts.ImageService;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

@RestController
@CrossOrigin
public class ImageController {

    @Autowired
    private ImageService imageService;
    @PostMapping("/api/v1/images")
    public ResponseEntity<HashMap> setImage(MultipartFile file, @CurrentUser User user){
        return ResponseEntity.ok(imageService.setProfileImage(file,user));
    }
}
