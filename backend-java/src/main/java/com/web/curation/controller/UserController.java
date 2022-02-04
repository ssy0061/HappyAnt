package com.web.curation.controller;


import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import static org.springframework.http.HttpStatus.FORBIDDEN;

import java.io.IOException;
import java.net.URI;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.dto.account.LoginRequest;
import com.web.curation.dto.account.LoginResponse;
import com.web.curation.dto.account.SignupRequest;
import com.web.curation.model.account.MyRole;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.model.account.MyUser;
import com.web.curation.service.UserService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	@GetMapping("/users")
	public ResponseEntity<List<MyUser>> getUsers() {
		return ResponseEntity.ok().body(userService.getUsers());
	}
    
    @PostMapping("/signup")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignupRequest userInfo) {
    	MyUser user = userInfo.toEntity();    	
    	
    	String emailPattern = "\\w+@\\w+\\.\\w+(\\.\\w+)?";
    	String pwPattern = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}";
    	
    	boolean isEmail= userInfo.getEmail().matches(emailPattern);
    	boolean isPw= userInfo.getPassword().matches(pwPattern);
    	
//    	이메일 패턴 검사
    	if(!isEmail) {
    		return new ResponseEntity<String>("Not valid email", HttpStatus.BAD_REQUEST);
    	}
    	
//    	이메일 중복 검사
    	if(userService.checkDupliByEmail(userInfo.getEmail())) {
    		return new ResponseEntity<String>("Duplicate email", HttpStatus.CONFLICT);
    	}    	
    	
//    	비밀번호 패턴 검사
    	if(!isPw) {
    		return new ResponseEntity<String>("Not valid password", HttpStatus.FORBIDDEN);
    	}
    	
    	userService.save( user);
    	return new ResponseEntity<String>("Accept", HttpStatus.OK);
    }

    
    
	@PostMapping("/user/save")
	public ResponseEntity<MyUser> saveUser(@RequestBody MyUser user) {
		URI uri= URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/account/user/save").toUriString());
		return ResponseEntity.created(uri).body(userService.saveUser(user));
	}
	
	@PostMapping("/role/save")
	public ResponseEntity<MyRole> saveRole(@RequestBody MyRole role) {
		URI uri= URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/account/role/save").toUriString());
		return ResponseEntity.created(uri).body(userService.saveRole(role));
	}
	
	@PostMapping("/role/addtouser")
	public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
		userService.addRoleToUser(form.getEmail(), form.getRoleName());
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/token/refresh")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException {
		String authorizationHeader = request.getHeader(AUTHORIZATION);
		if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			try {
				String refreshToken = authorizationHeader.substring("Bearer ".length());
				Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
				JWTVerifier verifier = JWT.require(algorithm).build();
				DecodedJWT decodedJWT = verifier.verify(refreshToken); 
				String email = decodedJWT.getSubject();
				MyUser user = userService.getUser(email);

				String accessToken = JWT.create()
						.withSubject(user.getEmail())
						.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
						.withIssuer(request.getRequestURL().toString())
						.withClaim("roles", user.getRoles().stream().map(MyRole::getName).collect(Collectors.toList()))
						.sign(algorithm);
				
				Map<String, String> tokens = new HashMap<>();
				tokens.put("accessToken", accessToken);
				tokens.put("refreshToken", refreshToken);
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);		
				new ObjectMapper().writeValue(response.getOutputStream(), tokens);
				
			} catch (Exception e) {
				response.setHeader("error", e.getMessage());
				response.setStatus(FORBIDDEN.value());
				//					response.sendError(FORBIDDEN.value());
				Map<String, String> error = new HashMap<>();
				error.put("errorMessage", e.getMessage());
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);		
				new ObjectMapper().writeValue(response.getOutputStream(), error);
			}				
		}
		else {
			throw new RuntimeException("Refresh token is missing");
		}		
	}
	
	@Data
	class RoleToUserForm{
		private String email;
		private String roleName;
	}
}
