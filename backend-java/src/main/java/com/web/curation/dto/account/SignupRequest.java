package com.web.curation.dto.account;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.web.curation.model.account.User;

import io.swagger.annotations.ApiModelProperty;
import lombok.ToString;



@Valid
@ToString
public class SignupRequest {
    @ApiModelProperty(required = true)
    @NotNull
    String email;
    @ApiModelProperty(required = true)
    @NotNull
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$")
    String password;
    @ApiModelProperty(required = true)
    @NotNull
    String nickname;
    
    public SignupRequest(@NotNull String email,
			@NotNull @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$") String password,
			@NotNull String nickname) {
		super();
		this.email = email;
		this.password = password;
		this.nickname = nickname;
	}

	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    
	public User toEntity() {
		return new User(null, password, email, null);
	}
}
