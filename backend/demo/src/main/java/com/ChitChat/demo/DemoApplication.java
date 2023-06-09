package com.ChitChat.demo;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
import com.ChitChat.demo.entity.Conversation;
import com.ChitChat.demo.repository.ConversationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
	CommandLineRunner createInitialUsers(UserService userService, ConversationRepository conversationRepository) {
		return new CommandLineRunner() {

			@Override
			public void run(String... args) throws Exception {
				for (int i = 1; i<=10; i++){
					UserRegisterRequest registerRequest = new UserRegisterRequest();
					registerRequest.setUsername("user" + i);
					registerRequest.setPassword("test");
					userService.save(registerRequest);
				}

				for (int i = 1; i<=3; i++){
					Conversation conversation = new Conversation();
					conversation.setPublic(true);
					conversationRepository.save(conversation);
				}
			}
		};
	}
}
