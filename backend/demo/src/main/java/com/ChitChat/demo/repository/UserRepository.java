package com.ChitChat.demo.repository;

import com.ChitChat.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Page<User> findByUsernameNot(Pageable page, String username);

    List<User> findByUsernameNot(String username);

    boolean existsByUsername(String username);

    List<User> findAllByUsernameContainingIgnoreCase(String input);

}
