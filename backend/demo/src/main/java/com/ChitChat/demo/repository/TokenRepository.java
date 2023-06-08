package com.ChitChat.demo.repository;

import com.ChitChat.demo.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token,String> {
}
