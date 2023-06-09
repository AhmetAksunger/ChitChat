package com.ChitChat.demo.business.concretes;

import com.ChitChat.demo.business.abstracts.MessageService;
import com.ChitChat.demo.entity.Message;
import com.ChitChat.demo.entity.Status;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageManager implements MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Override
    public Message save(Message message) {
        message.setTimeStamp(new Date());

        if(message.getStatus() == Status.JOIN){
            return message;
        }
        return messageRepository.save(message);
    }

    @Override
    public List<String> getMessagedUsernames(User user) {
        List<String> messagedUsernames = messageRepository.findDistinctReceiverNameBySenderName(user.getUsername());
        return messagedUsernames;
    }
}
