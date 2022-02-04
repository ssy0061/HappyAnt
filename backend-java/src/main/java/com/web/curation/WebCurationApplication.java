package com.web.curation;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.web.curation.model.account.MyRole;
import com.web.curation.model.account.MyUser;
import com.web.curation.service.UserService;


@SpringBootApplication
public class WebCurationApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebCurationApplication.class, args);
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
//	@Bean
//	CommandLineRunner run(UserService userService) {
//		return args ->{
//			userService.saveRole(new MyRole(null,"ROLE_USER"));
//			userService.saveRole(new MyRole(null,"ROLE_ADMIN"));
//			
//			userService.saveUser(new MyUser(null, "deokkyu@ssafy.com", "ssafy123A!", "김덕규", "question", "answer", new ArrayList<>()));
//			
//			userService.addRoleToUser("deokkyu@ssafy.com", "ROLE_USER");			
//			
//		};
//	}

	
	

}
