package com.web.curation.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.dto.account.LoginRequest;
import com.web.curation.dto.account.LoginResponse;
import com.web.curation.dto.account.SignupRequest;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.account.User;

import com.web.curation.service.AccountService;
import com.web.curation.model.match.Mat_Article;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


import lombok.RequiredArgsConstructor;


@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequiredArgsConstructor
public class AccountController {
    
    
	@Autowired	
	AccountService accountService;
    
    @GetMapping("/account/getAllUser")
    @ApiOperation(value = "모든 회원 정보 조회")
    public ResponseEntity<List<User>> getAllUsers(){
    	List<User> users = accountService.findAll();	
    	return new ResponseEntity<List<User>>(users,HttpStatus.OK);
    }
    
    @GetMapping("/account/{email}")
    @ApiOperation(value = "회원정보 조회")
    public ResponseEntity<User> getUser(@RequestBody String email ){
    	User user = accountService.findByEmail(email);
    	
    	System.out.println(user.toString());
    	return new ResponseEntity<User>(user, HttpStatus.OK);
    }    
   
    
    @PostMapping("/account/signUp")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignupRequest userInfo) {
    	User user = userInfo.toEntity();    	
    	
    	
    	String emailPattern = "\\w+@\\w+\\.\\w+(\\.\\w+)?";
    	String pwPattern = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}";
    	
    	boolean isEmail= userInfo.getEmail().matches(emailPattern);
    	boolean isPw= userInfo.getPassword().matches(pwPattern);
    	
//    	이메일 패턴 검사
    	if(!isEmail) {
    		return new ResponseEntity<String>("Not valid email", HttpStatus.BAD_REQUEST);
    	}
    	
//    	이메일 중복 검사
    	if(accountService.checkDupliByEmail(userInfo.getEmail())) {
    		return new ResponseEntity<String>("Duplicate email", HttpStatus.CONFLICT);
    	}    	
    	
//    	비밀번호 패턴 검사
    	if(!isPw) {
    		return new ResponseEntity<String>("Not valid password", HttpStatus.FORBIDDEN);
    	}
    	
    	accountService.save( user);
    	return new ResponseEntity<String>("Accept", HttpStatus.OK);
    }


    @PutMapping("/account/{id}")
    @ApiOperation(value = "회원 정보 수정")
    public void updateUser(
    		@PathVariable("id") Long id,
    		@RequestParam(required = false) String password,    		
    		@RequestParam(required = false) String question,
    		@RequestParam(required = false) String answer) {
    	accountService.updateUser(id, password, question, answer);
    }
    

    @PostMapping("/account/login")
    @ApiOperation(value = "로그인")
    public ResponseEntity<LoginResponse> getUser(@RequestBody LoginRequest userInfo){
    	User user = accountService.findByEmail(userInfo.getEmail());    	
    	
    	if(user.getPassword().equals(userInfo.getPassword())) {
    		System.out.println("OK");
    		LoginResponse loginUser = new LoginResponse();
        	loginUser.setId(user.getId());
        	loginUser.setEmail(user.getEmail());
        	loginUser.setName(user.getName());
        	loginUser.setQuestion(user.getQuestion());
        	loginUser.setScore(user.getScore());
    		return new ResponseEntity<LoginResponse>(loginUser,HttpStatus.OK);
    		
    	}
    	System.out.println("fail");
    	return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    	
    }
    
    @DeleteMapping("/delete/{id}")
    @ApiOperation(value = "삭제")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
    	accountService.deleteById(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
    
    


//    // 회원가입
//    @PostMapping("/join")
//    public Long join(@RequestBody Map<String, String> user) {
//        return userRepository.save(User.builder()
//                .email(user.get("email"))
//                .password(passwordEncoder.encode(user.get("password")))
//                .roles(Collections.singletonList("ROLE_ADMIN")) // 최초 가입시 USER 로 설정
//                .build()).getId();
//    }
//    
// // 로그인
//    @PostMapping("/login")
//    public String login(@RequestBody Map<String, String> user) {
//        User member = userRepository.findByEmail(user.get("email"))
//                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));
//        if (!passwordEncoder.matches(user.get("password"), member.getPassword())) {
//            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
//        }
//        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
//    }
    
    
    @GetMapping("/account/test/{user_id}")
    @ApiOperation(value = "(TEST) 작성한 모집글 보기")
    public List<Mat_Article> articles(
    				@PathVariable("user_id") Long user_id) {
    	User user = accountService.findById(user_id).get();
    	return user.getMat_articles();
    }
}