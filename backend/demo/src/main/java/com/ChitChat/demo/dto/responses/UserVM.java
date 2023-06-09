package com.ChitChat.demo.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserVM {

    private long id;
    private String username;
    private String profileImage;
}
