package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.CreateMessageRequest;
import com.ChitChat.demo.dto.responses.MessageVM;
import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.User;

import java.util.List;

public interface MessageService {
    MessageVM save(CreateMessageRequest createMessageRequest, String senderName);

}
