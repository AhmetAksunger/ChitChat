package com.ChitChat.demo.business.abstracts;

import com.ChitChat.demo.dto.requests.CreateConversationRequest;
import com.ChitChat.demo.dto.responses.ConversationVM;
import com.ChitChat.demo.dto.responses.GetPublicConversationsResponse;
import com.ChitChat.demo.entity.Conversation;

import java.util.List;

public interface ConversationService {
    ConversationVM save(CreateConversationRequest createConversationRequest);

    List<GetPublicConversationsResponse> getPublicConversations();
}
