package com.ChitChat.demo.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {

    @Size(min = 3, max = 20,message = "Username must be between 6 and 20 characters")
    private String username;

    private String oldPassword;

    private String newPassword;

    private boolean isEnabled;

}
