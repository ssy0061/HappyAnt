package com.web.curation.dto.account;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.web.curation.model.account.User;

import io.swagger.annotations.ApiModelProperty;
import lombok.NoArgsConstructor;
import lombok.ToString;



@Valid
@ToString
@NoArgsConstructor
public class SignupRequest {
    @ApiModelProperty(required = true)
    @NotNull
    String userid;
	
    @ApiModelProperty(required = true)
    @NotNull
    String email;
    @ApiModelProperty(required = true)
    @NotNull
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$")
    String password;
    @ApiModelProperty(required = true)
    @NotNull
    String name;
    @ApiModelProperty(required = true)
    @NotNull
    Integer age;
    
    public SignupRequest(@NotNull String userid,  @NotNull String email, 
			@NotNull @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$") String password,
			@NotNull String name,@NotNull int age) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.age = age;
	}
    
    
    

	public String getUserid() {
		return userid;
	}




	public void setUserid(String userid) {
		this.userid = userid;
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




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
	}




	public Integer getAge() {
		return age;
	}




	public void setAge(Integer age) {
		this.age = age;
	}



	public User toEntity() {
		return new User(null, userid, password, email, name,age, null);
	}
}
