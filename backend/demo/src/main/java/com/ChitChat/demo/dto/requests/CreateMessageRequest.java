package com.ChitChat.demo.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateMessageRequest {

    private String senderName;
    private String receiverName;

    @NotBlank(message = "Message cannot be blank")
    @NotNull(message = "Message cannot be null")
    private String message;

    private long conversationId;

}
