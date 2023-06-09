package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.User;

import java.util.List;

public interface MessageService {
    Message save(Message message);

    List<String> getMessagedUsernames(User user);
}
