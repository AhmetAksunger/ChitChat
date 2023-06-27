package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.ImageService;
import com.ChitChat.demo.entity.Image;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.error.ImageSizeExceededException;
import com.ChitChat.demo.error.ImageUploadException;
import com.ChitChat.demo.error.InvalidImageFileTypeException;
import com.ChitChat.demo.repository.ImageRepository;
import com.ChitChat.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;

@Service
public class ImageManager implements ImageService {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public HashMap<String,Boolean> setProfileImage(MultipartFile image, User user) {

        try {
            if(!image.isEmpty()){

                String fileType = image.getContentType();

                if (!fileType.equals("image/jpeg") && !fileType.equals("image/jpg") && !fileType.equals("image/png")) {
                    // The file is not a JPEG, JPG, or PNG image
                    throw new InvalidImageFileTypeException();
                }

                long maxSizeInBytes = 500 * 1024;
                if(image.getSize() > maxSizeInBytes){
                    throw new ImageSizeExceededException();
                }

                if(user.getProfileImage() != null){
                    long userPreviousImageId = user.getProfileImage().getId();
                    user.setProfileImage(null);
                    imageRepository.deleteById(userPreviousImageId);
                }

                Image imageEntity = new Image();
                imageEntity.setUser(user);
                imageEntity.setImageData(Base64.getEncoder().encodeToString(image.getBytes()));
                imageRepository.save(imageEntity);
                user.setProfileImage(imageEntity);
                userRepository.save(user);

                HashMap<String,Boolean> response = new HashMap<>();
                response.put("success",true);
                return response;
            }
        }catch (Exception ex){
            if(ex instanceof InvalidImageFileTypeException){
                throw new InvalidImageFileTypeException();
            }
            if(ex instanceof ImageSizeExceededException){
                throw new ImageSizeExceededException();
            }else {
                //throw new ImageUploadException();
                System.err.println(ex.getMessage());
            }
        }
        HashMap<String, Boolean> emptyResponse = new HashMap<>();
        emptyResponse.put("success", false);
        return emptyResponse;
    }
}
