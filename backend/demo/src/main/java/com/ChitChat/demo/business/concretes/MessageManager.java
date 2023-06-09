package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.MessageService;
import com.ChitChat.demo.dto.requests.CreateMessageRequest;
import com.ChitChat.demo.dto.responses.MessageVM;
import com.ChitChat.demo.entity.Conversation;
import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.Status;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.mapper.ModelMapperService;
import com.ChitChat.demo.repository.ConversationRepository;
import com.ChitChat.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageManager implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ModelMapperService mapperService;
    @Autowired
    private ConversationRepository conversationRepository;
    @Override
    public MessageVM save(CreateMessageRequest createMessageRequest,User sender) {
        Conversation conversation = conversationRepository.findById(createMessageRequest.getConversationId()).orElseThrow();

        Message message = new Message();
        message.setMessage(createMessageRequest.getMessage());
        message.setTimeStamp(new Date());
        message.setConversation(conversation);
        message.setUser(sender);

        var messageToBeMapped = messageRepository.save(message);
        MessageVM response = mapperService.forResponse().map(messageToBeMapped,MessageVM.class);
        response.setSenderName(sender.getUsername());
        response.setConversationId(message.getConversation().getId());
        return response;
    }


}
