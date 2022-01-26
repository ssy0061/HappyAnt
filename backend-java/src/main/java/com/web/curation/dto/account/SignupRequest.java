package com.web.curation.dto.account;

import com.web.curation.model.account.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class SignupRequest {
	
    private String email;
    private String password;
    private String name;
    private int age;
    private String question;
    private String answer;
    
    public User toEntity() {    	
    	
//    	id, email, password, name, age, score, question, answer, createDates
    	return new User( email, password, name, age, question, answer);
    }
    
}
