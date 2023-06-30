package com.ChitChat.demo;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.entity.Conversation;
import com.ChitChat.demo.entity.User;
import com.ChitChat.demo.repository.ConversationRepository;
import com.ChitChat.demo.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

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
				User user = new User();
				user.setUsername("admin");
				String adminPassword = UUID.randomUUID().toString();
				String encoded = passwordEncoder.encode(adminPassword);
				user.setPassword(encoded);
				System.out.println("Admin Password: " + adminPassword);
				user.setAdmin();
				userRepository.save(user);
			}
		};
	}
}
