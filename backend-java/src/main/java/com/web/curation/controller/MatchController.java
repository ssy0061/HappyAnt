package com.web.curation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.dto.match.Mat_ArticleForm;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.match.Mat_Article;
import com.web.curation.repository.match.Mat_ArticleRepository;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class MatchController {
	
    @Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결함
    private Mat_ArticleRepository articleRepository;
    
    @PostMapping("match/article")
    @ApiOperation(value = "게시글 작성")
    public String createArticle(Mat_ArticleForm form) {
    	System.out.println(form.toString());

    	// 1. dto를 Entity로 변경
    	Mat_Article article = form.toEntity();
    	System.out.println(article.toString());
    	// 2. Repository에게 Entity를 DB에 저장하게 함
    	Mat_Article saved = articleRepository.save(article);
    	System.out.println(saved.toString());
    	
    	return "";
    }
}
