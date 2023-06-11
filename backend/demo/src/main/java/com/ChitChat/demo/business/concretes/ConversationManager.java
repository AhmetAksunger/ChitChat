package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.ConversationService;
import com.ChitChat.demo.dto.requests.CreateConversationRequest;
import com.ChitChat.demo.dto.responses.ConversationVM;
import com.ChitChat.demo.dto.responses.GetConversationMessagesResponse;
import com.ChitChat.demo.dto.responses.GetPublicConversationsResponse;
import com.ChitChat.demo.entity.Conversation;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.mapper.ModelMapperService;
import com.ChitChat.demo.repository.ConversationRepository;
import com.ChitChat.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConversationManager implements ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapperService mapperService;
    @Override
    public List<GetPublicConversationsResponse> getPublicConversations() {
        List<Conversation> conversations = conversationRepository.findByIsPublicTrue();
        List<GetPublicConversationsResponse> responses = new ArrayList<>();
        for (Conversation conversation:conversations) {
            var response = mapperService.forResponse().map(conversation,GetPublicConversationsResponse.class);
            responses.add(response);
        }
        return responses;
    }

    @Override
    public ConversationVM save(CreateConversationRequest createConversationRequest, User loggedInUser) {
        List<User> participants = new ArrayList<>();
        participants.add(loggedInUser);
        for (String username:createConversationRequest.getParticipants()) {
            User user = userRepository.findByUsername(username).orElseThrow();
            participants.add(user);
        }
        Conversation conversation = new Conversation();
        conversation.setParticipants(participants);
        var c = conversationRepository.save(conversation);
        var response = mapperService.forResponse().map(c,ConversationVM.class);
        return response;
    }

    @Override
    public GetConversationMessagesResponse getConversationMessages(long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        GetConversationMessagesResponse response = mapperService.forResponse().map(conversation, GetConversationMessagesResponse.class);
        return response;
    }

    @Override
    public GetConversationMessagesResponse getConversationByParticipants(User user, String username) {
        System.err.println(username);
        User secondUser = userRepository.findByUsername(username).orElseThrow();
        List<User> participants = new ArrayList<>();
        participants.add(user);
        participants.add(secondUser);
        Conversation conversation = conversationRepository.findByParticipantsIn(participants);
        GetConversationMessagesResponse response = new GetConversationMessagesResponse();
        if(conversation == null){
            response.setExists(false);
            return response;
        }
        response = mapperService.forResponse().map(conversation, GetConversationMessagesResponse.class);

        return response;
    }
}