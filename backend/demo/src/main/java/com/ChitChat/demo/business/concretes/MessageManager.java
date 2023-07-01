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

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ModelMapperService mapperService;
    private final ConversationRepository conversationRepository;

    @Autowired
    public MessageManager(MessageRepository messageRepository, UserRepository userRepository,
                          ModelMapperService mapperService, ConversationRepository conversationRepository){
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.mapperService = mapperService;
        this.conversationRepository = conversationRepository;
    }
    @Override
    public CreateMessageResponse save(CreateMessageRequest createMessageRequest, String senderName) {

        Conversation conversation = conversationRepository.findById(createMessageRequest.getConversationId()).orElseThrow();
        User sender = userRepository.findByUsername(senderName).orElseThrow();
        Message message = Message.builder().message(createMessageRequest.getMessage()).timeStamp(new Date())
                .conversation(conversation).user(sender).build();

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
