package com.web.curation.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.dao.user.UserDao;
import com.web.curation.dto.account.SignupRequest;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.account.User;
import com.web.curation.model.match.Mat_Article;
import com.web.curation.repository.account.SignupRepository;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class AccountController {

    @Autowired
    UserDao userDao;
    
    
    @Autowired
    private SignupRepository signupRepository;

    @GetMapping("/account/login")
    @ApiOperation(value = "로그인")
    public Object login(@RequestParam(required = true) final String email,
            @RequestParam(required = true) final String password) {

        Optional<User> userOpt = userDao.findUserByEmailAndPassword(email, password);

        ResponseEntity response = null;

        if (userOpt.isPresent()) {
            final BasicResponse result = new BasicResponse();
            result.status = true;
            result.data = "success";
            response = new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            response = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return response;
    }

    @PostMapping("/account/signup")
    @ApiOperation(value = "가입하기")
    public Object signup(@Valid @RequestBody SignupRequest request) {
        // 이메일, 닉네임 중복처리 필수
        // 회원가입단을 생성해 보세요.
//    	System.out.println(request.toString());
    	
    	User user = request.toEntity();
//    	System.out.println(user.toString());
    	
    	signupRepository.save(user);
//    	User saved = signupRepository.save(user);
//    	System.out.println(saved.toString());
    	
        final BasicResponse result = new BasicResponse();
        result.status = true;
        result.data = "success";

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @GetMapping("/account/{user_id}")
    @ApiOperation(value = "(TEST) 작성한 모집글 보기")
    public List<Mat_Article> articles(
    				@PathVariable("user_id") Long user_id) {
    	User user = signupRepository.findById(user_id).get();
    	return user.getMat_articles();
    }
}