package com.ChitChat.demo.repository;

import com.ChitChat.demo.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public interface ConversationRepository extends JpaRepository<Conversation,Long> {
    List<Conversation> findByIsPublicTrue();
}
