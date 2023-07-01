package com.ChitChat.demo.config;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.entity.Conversation;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.repository.ConversationRepository;
import com.ChitChat.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Configuration
public class InitialDataConfig {
    @Bean
    CommandLineRunner createInitialUsers(UserService userService,
                                         ConversationRepository conversationRepository,
                                         UserRepository userRepository,
                                         PasswordEncoder passwordEncoder) {
        return new CommandLineRunner() {

            @Override
            public void run(String... args) throws Exception {

				/* 10 random users
				for (int i = 1; i<=10; i++){
					UserRegisterRequest registerRequest = new UserRegisterRequest();
					registerRequest.setUsername("user" + i);
					registerRequest.setPassword("test");
					userService.save(registerRequest);
				}*/

                // 2 public chats (Essential)
                for (int i = 1; i<=2; i++){
                    Conversation conversation = new Conversation();
                    conversation.setPublic(true);
                    conversationRepository.save(conversation);
                }

                // 1 Admin
                String adminPassword = UUID.randomUUID().toString();
                String encoded = passwordEncoder.encode(adminPassword);

                User user = User.builder().username("admin").password(encoded).build();
                user.setAdmin();
                System.out.println("Admin Password: " + adminPassword);
                userRepository.save(user);
            }
        };
    }
}
