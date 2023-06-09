package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.CreateConversationRequest;
import com.ChitChat.demo.dto.responses.ConversationVM;
import com.ChitChat.demo.entity.Conversation;

public interface ConversationService {
    ConversationVM save(CreateConversationRequest createConversationRequest);
}
