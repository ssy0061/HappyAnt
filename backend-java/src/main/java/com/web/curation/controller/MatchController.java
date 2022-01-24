package com.web.curation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.dto.match.Mat_ArticleForm;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.match.Mat_Article;
import com.web.curation.service.MatchService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController // Json 형태로 객체 데이터를 반환
@RequestMapping("match")
public class MatchController {
	
    private final MatchService matchService;
    
    @Autowired
    public MatchController(MatchService matchService) {
    	this.matchService = matchService;
    }
    
    
    @GetMapping
    @ApiOperation(value = "모집글 목록 조회")
    public List<Mat_Article> getArticle() {
    	List<Mat_Article> articles = matchService.getArticle();
		System.out.println(articles);
    	return articles;
    }
//    @GetMapping("article")
//    @ApiOperation(value = "매칭 게시글 전체 조회")
//    public List<Mat_Article> getArticle() {
//    	List<Mat_Article> test = matchService.getArticle();
//    	System.out.println(test);
//    	return matchService.getArticle();
//    }
    
    @PostMapping
    @ApiOperation(value = "모집글 작성")
    public void createArticle(@RequestBody Mat_ArticleForm article) {
    	
    	matchService.addNewArticle(article);
    }
    
    @PutMapping("{articleId}")
    @ApiOperation(value = "모집글 수정(마감)")
    public void updateArticle(
    		@PathVariable("articleId") Long articleId,
    		@RequestParam(required = false) String title,
    		@RequestParam(required = false) String content) {
    	matchService.updateArticle(articleId, title, content);
    }
    
    
    @DeleteMapping("{articleId}")
    @ApiOperation(value = "모집글 삭제")
    public void deleteArticle(@PathVariable("articleId") Long id) {
    	matchService.deleteArticle(id);
    }
}
