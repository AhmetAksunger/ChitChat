package com.ChitChat.demo.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {

    @NotNull
    @NotBlank
    @Size(min = 3, max = 20,message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank
    @NotNull
    @Pattern(regexp = ".*\\d.*", message = "Password must contain at least one digit")
    @Size(min = 5,message = "Password must be at least 5 characters long")
    private String password;

}
