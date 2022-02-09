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
import com.web.curation.dto.study.StudyCommentRequest;
import com.web.curation.dto.study.StudyCommentResponse;
import com.web.curation.dto.study.StudyJoinUserResponse;
import com.web.curation.dto.study.StudyResponse;
import com.web.curation.service.StudyService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController // Json 형태로 객체 데이터를 반환
@RequestMapping("study/{studyId}")
public class StudyController {
	
	@Autowired
    private StudyService studyService;
	
	@PostMapping("member/{userId}")
	@ApiOperation(value = "스터디원 추가")
	public void addNewStudyMember(@PathVariable("studyId") Long studyId,
									@PathVariable("userId") Long joinUserId) {
		studyService.addNewStudyMember(studyId, joinUserId);
	}
	
	@GetMapping("article")
    @ApiOperation(value = "게시글 목록 조회")
    public List<StudyArticleResponse> getArticleList(@PathVariable("studyId") Long studyId) {
    	return studyService.getArticleList(studyId);
    }
    
    @GetMapping("{articleId}")
    @ApiOperation(value = "게시글 상세 조회")
    public StudyArticleResponse getArticle(
    		@PathVariable("studyId") Long studyId,
    		@PathVariable("articleId") Long articleId) {
    	return studyService.getArticle(studyId, articleId);
    }
    
    @PostMapping
    @ApiOperation(value = "게시글 작성")
    public void createArticle(@PathVariable("studyId") Long studyId,
    							@RequestBody StudyArticleRequest articleForm) {
    	
    	studyService.addNewArticle(studyId, articleForm);
    }
    
    @PutMapping("{articleId}")
    @ApiOperation(value = "게시글 수정")
    public void updateArticle(
    		@PathVariable("studyId") Long studyId,
    		@PathVariable("articleId") Long articleId,
    		@RequestParam(required = true) Long loginUserId,
    		@RequestParam(required = false) String title,
    		@RequestParam(required = false) String content) {
    	studyService.updateArticle(studyId, articleId, loginUserId, title, content);
    }
    
    
    @DeleteMapping("{articleId}")
    @ApiOperation(value = "게시글 삭제")
    public void deleteArticle(@PathVariable("studyId") Long studyId,
    							@PathVariable("articleId") Long articleId,
    							@RequestParam(required = true) Long loginUserId) {
    	studyService.deleteArticle(studyId, articleId, loginUserId);
    }

    // 검색 키워드 하나로 제목 or 내용 검색하기
    @GetMapping("article/search")
    @ApiOperation(value = "게시글 검색")
    public List<StudyArticleResponse> SerachArticle(@PathVariable("studyId") Long studyId,
    												@RequestParam(required = true) String Keyword) {
    	return studyService.searchArticle(studyId, Keyword);
    }
    
    @GetMapping("{articleId}/comment")
    @ApiOperation(value = "댓글 목록 조회")
    public List<StudyCommentResponse> getCommentList(@PathVariable("studyId") Long studyId,
    												@PathVariable("articleId") Long articleId) {
    	return studyService.getCommentList(studyId, articleId);
    }
    
    @PostMapping("{articleId}")
    @ApiOperation(value = "댓글 작성")
    public void createComment(@PathVariable("studyId") Long studyId,
    							@PathVariable("articleId") Long articleId,
    							@RequestBody StudyCommentRequest commentForm) {
    	
    	studyService.addNewComment(studyId, articleId, commentForm);
    }
    
    @PutMapping("{articleId}/{commentId}")
    @ApiOperation(value = "댓글 수정")
    public void updateComment(
    		@PathVariable("studyId") Long studyId,
    		@PathVariable("articleId") Long articleId,
    		@PathVariable("commentId") Long commentId,
    		@RequestParam(required = true) Long loginUserId,
    		@RequestParam(required = false) String content) {
    	studyService.updateComment(studyId, articleId, commentId, loginUserId, content);
    }
    
    
    @DeleteMapping("{articleId}/{commentId}")
    @ApiOperation(value = "댓글 삭제")
    public void deleteComment(@PathVariable("studyId") Long studyId,
    							@PathVariable("articleId") Long articleId,
    							@PathVariable("commentId") Long commentId,
    							@RequestParam(required = true) Long loginUserId) {
    	studyService.deleteComment(studyId, articleId, commentId, loginUserId);
    }
    
    @GetMapping("member")
    @ApiOperation(value = "스터디 멤버 조회")
    public List<StudyJoinUserResponse> searchMember(@PathVariable("studyId") Long studyId) {
    	return studyService.searchMember(studyId);
    }
    
    @PostMapping("member/{userId}/leader")
    @ApiOperation(value = "스터디장 위임", notes="로그인한 리더(loginUserId)가 선택한 유저(userId)에게 리더 권한을 위임합니다.")
    public void delegateLeader(@PathVariable("studyId") Long studyId,
    						@PathVariable("userId") Long userId,
    						@RequestParam(required = true) Long loginUserId) {
    	studyService.delegateLeader(studyId, userId, loginUserId);
    }
    
    @DeleteMapping("member/{userId}")
    @ApiOperation(value = "스터디 멤버 추방/탈퇴", notes="로그인한 리더가 선택한 유저(userId)를 추방하거나 로그인한 유저가 스스로(userId) 스터디에서 탈퇴합니다.")
    public void deleteMember(@PathVariable("studyId") Long studyId,
    						@PathVariable("userId") Long userId,
    						@RequestParam(required = true) Long loginUserId) {
    	studyService.deleteMember(studyId, userId, loginUserId);
    }
    
    @GetMapping
    @ApiOperation(value = "스터디 조회")
    public StudyResponse getStudy(@PathVariable("studyId") Long studyId) {
    	return studyService.getStudy(studyId);
    }
    
    @PutMapping
    @ApiOperation(value = "스터디 수정")
    public void updateStudy(
    		@PathVariable("studyId") Long studyId,
    		@RequestParam(required = true) Long loginUserId,
    		@RequestParam(required = false) String name,
    		@RequestParam(required = false) Long headCount,
    		@RequestParam(required = false) String category,
    		@RequestParam(required = false) String area,
    		@RequestParam(required = false) String interest) {
    	studyService.updateStudy(studyId, loginUserId, name, headCount, 
    							category, area, interest);
    }
    
    // 알림 기능 완성 후 구현예정
//    @PostMapping("member/{userId}/invite")
//    @ApiOperation(value = "스터디 멤버 초대", notes="이메일로 초대합니다. 존재하는 유저의 정확한 이메일이 필요합니다.")
//    public void 
}