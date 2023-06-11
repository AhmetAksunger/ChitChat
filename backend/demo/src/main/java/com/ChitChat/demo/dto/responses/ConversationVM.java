package com.ChitChat.demo.dto.responses;

import com.ChitChat.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ConversationVM {

    private long id;

    private List<MessageVM> messages;

}
