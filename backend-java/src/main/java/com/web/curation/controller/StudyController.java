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
import com.web.curation.dto.study.StudyArticleRequest;
import com.web.curation.dto.study.StudyArticleResponse;
import com.web.curation.service.StudyService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController // Json 형태로 객체 데이터를 반환
@RequestMapping("study/{sutdyId}")
public class StudyController {
	
	@Autowired
    private StudyService studyService;
	
	@PostMapping("{userId}")
	@ApiOperation(value = "스터디원 추가")
	public void addNewStudyMember(@PathVariable("sutdyId") Long studyId,
									@PathVariable("userId") Long joinUserId) {
		studyService.addNewStudyMember(studyId, joinUserId);
	}
	
	@GetMapping
    @ApiOperation(value = "게시글 목록 조회")
    public List<StudyArticleResponse> getArticleList(@PathVariable("sutdyId") Long studyId) {
    	return studyService.getArticleList(studyId);
    }
    
    @GetMapping("{articleId}")
    @ApiOperation(value = "게시글 상세 조회")
    public StudyArticleResponse getArticle(
    		@PathVariable("sutdyId") Long studyId,
    		@PathVariable("articleId") Long articleId) {
    	return studyService.getArticle(studyId, articleId);
    }
    
    @PostMapping
    @ApiOperation(value = "게시글 작성")
    public void createArticle(@PathVariable("sutdyId") Long studyId,
    							@RequestBody StudyArticleRequest articleForm) {
    	
    	studyService.addNewArticle(studyId, articleForm);
    }
    
    @PutMapping("{articleId}")
    @ApiOperation(value = "게시글 수정")
    public void updateArticle(
    		@PathVariable("sutdyId") Long studyId,
    		@PathVariable("articleId") Long articleId,
    		@RequestParam(required = false) String title,
    		@RequestParam(required = false) String content) {
    	studyService.updateArticle(studyId, articleId, title, content);
    }
    
    
    @DeleteMapping("{articleId}")
    @ApiOperation(value = "게시글 삭제")
    public void deleteArticle(@PathVariable("sutdyId") Long studyId,
    							@PathVariable("articleId") Long articleId) {
    	studyService.deleteArticle(studyId, articleId);
    }

    // 검색 키워드 하나로 제목 or 내용 검색하기
    @GetMapping("search")
    @ApiOperation(value = "게시글 검색")
    public List<StudyArticleResponse> SerachArticle(@PathVariable("sutdyId") Long studyId,
    												@RequestParam(required = true) String Keyword) {
    	return studyService.searchArticle(Keyword);
    }
}