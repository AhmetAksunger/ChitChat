package com.ChitChat.demo;

import com.ChitChat.demo.business.abstracts.UserService;
import com.ChitChat.demo.dto.requests.UserRegisterRequest;
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
	CommandLineRunner createInitialUsers(UserService userService) {
		return new CommandLineRunner() {

			@Override
			public void run(String... args) throws Exception {
				UserRegisterRequest registerRequest = new UserRegisterRequest();
				registerRequest.setUsername("user1");
				registerRequest.setPassword("test");
				userService.save(registerRequest);
			}
		};
	}
}
