package com.web.curation.dto.account;

import com.web.curation.model.account.MyUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class LoginRequest {

	private String email;
	private String password;

}
