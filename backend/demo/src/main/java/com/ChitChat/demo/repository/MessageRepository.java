package com.ChitChat.demo.repository;

import com.ChitChat.demo.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long> {

    List<Message> findBySenderName(String senderName);
    @Query("SELECT DISTINCT m.receiverName FROM Message m WHERE m.senderName = :senderName")

    List<String> findDistinctReceiverNameBySenderName(String senderName);
}
