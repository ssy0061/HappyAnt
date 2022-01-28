package com.web.curation.dto.account;

import com.web.curation.model.account.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginResponse {

    private Long id;
    private String email;
    private String name;
    private int score;
    private String question;    
    private String answer;
    
   
}
