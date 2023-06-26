package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.CreateMessageRequest;
import com.ChitChat.demo.dto.responses.CreateMessageResponse;
import com.ChitChat.demo.dto.responses.MessageVM;
import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.User;

import java.util.List;

public interface MessageService {
    CreateMessageResponse save(CreateMessageRequest createMessageRequest, String senderName);

    void delete(long messageId, User user);

    void deletePublicMessages();
}
