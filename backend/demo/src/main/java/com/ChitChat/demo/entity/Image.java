package com.ChitChat.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Table(name = "images")
@Entity
@AllArgsConstructor
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(length = 5120000)
    private String imageData;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    public Image(){
        this.name = UUID.randomUUID().toString();
    }
}
