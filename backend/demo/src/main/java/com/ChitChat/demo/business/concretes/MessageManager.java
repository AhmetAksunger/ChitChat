package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.MessageService;
import com.ChitChat.demo.dto.requests.CreateMessageRequest;
import com.ChitChat.demo.dto.responses.CreateMessageResponse;
import com.ChitChat.demo.dto.responses.MessageVM;
import com.ChitChat.demo.entity.*;
import com.ChitChat.demo.error.AuthenticationException;
import com.ChitChat.demo.mapper.ModelMapperService;
import com.ChitChat.demo.repository.ConversationRepository;
import com.ChitChat.demo.repository.MessageRepository;
import com.ChitChat.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class MessageManager implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapperService mapperService;
    @Autowired
    private ConversationRepository conversationRepository;

    @Override
    public CreateMessageResponse save(CreateMessageRequest createMessageRequest, String senderName) {

        Conversation conversation = conversationRepository.findById(createMessageRequest.getConversationId()).orElseThrow();
        User sender = userRepository.findByUsername(senderName).orElseThrow();
        Message message = new Message();
        message.setMessage(createMessageRequest.getMessage());
        message.setTimeStamp(new Date());
        message.setConversation(conversation);
        message.setUser(sender);

        var messageToBeMapped = messageRepository.save(message);
        CreateMessageResponse response = mapperService.forResponse().map(messageToBeMapped,CreateMessageResponse.class);
        response.setUsername(sender.getUsername());
        return response;
    }

    @Override
    public void delete(long messageId, User user) {
        var message = messageRepository.findById(messageId).orElseThrow();

        if(message.getUser().getId() != user.getId()){
            throw new AuthenticationException();
        }

        messageRepository.delete(message);
    }

    @Override
    @Transactional
    public void deletePublicMessages() {
        messageRepository.deleteByConversationId(1);
        messageRepository.deleteByConversationId(2);
    }

}
