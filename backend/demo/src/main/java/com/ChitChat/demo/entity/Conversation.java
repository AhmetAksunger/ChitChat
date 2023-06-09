package com.ChitChat.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "conversations")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private boolean isPublic;
    @ManyToMany
    @JoinTable(
            name = "user_conversation",
            joinColumns = @JoinColumn(name = "conversation_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = { "conversation_id", "user_id" })

    )
    private List<User> participants;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.REMOVE)
    private List<Message> messages;
}
