package com.ChitChat.demo.repository;

import com.ChitChat.demo.entity.Conversation;
import com.ChitChat.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public interface ConversationRepository extends JpaRepository<Conversation,Long> {
    List<Conversation> findByIsPublicTrue();


    @Query("SELECT c FROM Conversation c " +
            "WHERE (:user1) MEMBER OF c.participants " +
            "AND (:user2) MEMBER OF c.participants")
    Conversation findConversationByParticipants(@Param("user1") User user1,
                                                       @Param("user2") User user2);

    @Query("SELECT c FROM Conversation c WHERE (:user) MEMBER OF c.participants")
    List<Conversation> findMessagedUsers(@Param("user") User user);

}
