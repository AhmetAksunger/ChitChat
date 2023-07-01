package com.ChitChat.demo.entity;

import com.ChitChat.demo.dto.responses.UserVM;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messages")
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 1024)
    private String message;

    private Date timeStamp;

    @ManyToOne
    private Conversation conversation;

    @ManyToOne
    private User user;

}
