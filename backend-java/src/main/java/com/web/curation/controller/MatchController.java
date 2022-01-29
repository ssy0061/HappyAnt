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

import com.web.curation.dto.match.MatchArticleRequest;
import com.web.curation.dto.match.MatchArticleResponse;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.match.MatchArticle;
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
	
	@Autowired
    private MatchService matchService;
    
    
    @GetMapping
    @ApiOperation(value = "모집글 목록 조회")
    public List<MatchArticleResponse> getArticleList() {
    	return matchService.getArticleList();
    }
    
    @GetMapping("{articleId}")
    @ApiOperation(value = "모집글 상세 조회")
    public MatchArticleResponse getArticle(
    		@PathVariable("articleId") Long articleId) {
    	return matchService.getArticle(articleId);
    }
    
    @PostMapping
    @ApiOperation(value = "모집글 작성")
    public void createArticle(@RequestBody MatchArticleRequest articleForm) {
    	
    	matchService.addNewArticle(articleForm);
    }
    
    @PutMapping("{articleId}")
    @ApiOperation(value = "모집글 수정(마감)")
    public void updateArticle(
    		@PathVariable("articleId") Long articleId,
    		@RequestParam(required = false) String title,
    		@RequestParam(required = false) String category,
    		@RequestParam(required = false) String content,
    		@RequestParam(required = false) Boolean state) {
    	matchService.updateArticle(articleId, title, category, content, state);
    }
    
    
    @DeleteMapping("{articleId}")
    @ApiOperation(value = "모집글 삭제")
    public void deleteArticle(@PathVariable("articleId") Long id) {
    	matchService.deleteArticle(id);
    }
    
//    @GetMapping("join")
//    @ApiOperation(value = "신청한 모집글 목록 조회")
//    public List<MatchArticle> getJoinArticle(@RequestParam(required = true) Long userId) {
//    	return matchService.getJoinArticle(userId);
//    }
    
    @PostMapping("join/{articleId}")
    @ApiOperation(value = "스터디 신청")
    public void joinStudy(
    		@PathVariable("articleId") Long id,
    		@RequestParam(required = true) Long joinUserId,
    		@RequestParam(required = false) String content) {
    	matchService.joinStudy(id, joinUserId, content);
    }
}
