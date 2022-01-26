package com.web.curation.controller;

import java.util.List;


import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.User;
import com.web.curation.repository.user.UserRepository;
import com.web.curation.service.AccountService;

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
	private UserRepository userRepository;
    
    @GetMapping("/account/getAllUser")
    @ApiOperation(value = "모든 회원 정보 조회")
    public ResponseEntity<List<User>> getAllusers(){
    	List<User> users = userRepository.findAll();	
    	return new ResponseEntity<List<User>>(users,HttpStatus.OK);
    } 
   
    
    @PostMapping("/account/signUp")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<User> signUp(@RequestBody User userInfo) {
        User user = userRepository.save(userInfo);
    	return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    

//    @PostMapping("/account/{email}")
//    @ApiOperation(value = "로그인")
//    public ResponseEntity<User> getUser(@PathVariable("email") String email, @PathVariable("password") String password){
//    	User user = userRepository.findByEmail(email);
//    	if(user.getPassword()!=password) {
//    		return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//    	}
//    	
//    	else return new ResponseEntity<User>(user,HttpStatus.OK); 	
//    	
//    }
    
    @DeleteMapping("/delete")
    @ApiOperation(value = "삭제")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
    	userRepository.deleteById(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
    
    
//    @PutMapping("/account/{id}")
//    @ApiOperation(value = "수정")
//    public ResponseEntity<User> updateMember(@PathVariable("id") Long id, @RequestBody User userInfo) {
//    	
//    	userInfo.setId(id);
//    	User user = userRepository.save(userInfo);
//    	
//        return new ResponseEntity<User>(user, HttpStatus.OK);
//    }


    
}