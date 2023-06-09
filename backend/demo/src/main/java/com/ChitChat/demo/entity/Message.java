package com.ChitChat.demo.entity;

import com.ChitChat.demo.dto.responses.UserVM;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String message;
    private Date timeStamp;

    @ManyToOne
    private Conversation conversation;

    @ManyToOne
    private User user;
}
