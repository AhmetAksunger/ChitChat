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

    private String senderName;
    private String receiverName;
    private String message;
    private Status status;
    private Date timeStamp;
}
