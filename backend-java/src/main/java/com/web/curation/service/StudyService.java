package com.web.curation.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web.curation.dto.match.MatchArticleRequest;
import com.web.curation.dto.match.MatchArticleResponse;
import com.web.curation.dto.study.StudyArticleRequest;
import com.web.curation.dto.study.StudyArticleResponse;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;
import com.web.curation.model.study.Study;
import com.web.curation.model.study.StudyArticle;
import com.web.curation.model.study.StudyJoin;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.MatchArticleRepo;
import com.web.curation.repository.study.StudyArticleRepo;
import com.web.curation.repository.study.StudyJoinRepo;
import com.web.curation.repository.study.StudyRepo;
import com.web.curation.specification.MatchArticleSpec;
import com.web.curation.specification.StudyArticleSpec;

@Service
public class StudyService {
	
	@Autowired
	private StudyRepo studyRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private StudyJoinRepo joinRepo;
	@Autowired
	private MatchArticleRepo MatchArticleRepo;
	@Autowired
	private StudyArticleRepo articleRepo;
//	@Autowired
//	private StudyCommentRepo commentRepo;

	
	// 스터디에서 '초대'로 멤버 추가
	@Transactional
	public void addNewStudyMember(Long studyId, Long joinUserId) {
		Study study = studyRepo.findById(studyId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.BAD_REQUEST,
													"존재하지 않는 스터디 id입니다.",
													new IllegalArgumentException()));
		User joinUser = userRepo.findById(joinUserId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.BAD_REQUEST,
													"존재하지 않는 유저 id입니다.",
													new IllegalArgumentException()));
		if (joinRepo.findByJoinMemberIdAndJoinStudyId(joinUserId, studyId).isPresent()) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST,
    				"이미 스터디에 가입한 회원입니다.",
    				new IllegalArgumentException());
		} else {
			// 스터디에 유저추가(멤버)
			StudyJoin join = new StudyJoin(null, joinUser, study, false);
			joinRepo.save(join);
		}

	}
	
    public List<StudyArticleResponse> getArticleList(Long studyId) {
    	List<StudyArticleResponse> articleList = new ArrayList<>();
    	
    	articleRepo.findByStudyId(studyId).forEach(article -> {
    		StudyArticleResponse response = article.toResponse();
    		articleList.add(response);
    	});
    	return articleList;
    }
    
    public StudyArticleResponse getArticle(Long studyId, Long articleId) {
    	StudyArticle article = articleRepo.findByStudyIdAndId(studyId, articleId).get();
    	StudyArticleResponse response = article.toResponse();
    	return response;
    }
    
    public void addNewArticle(Long studyId, StudyArticleRequest articleForm) {
    	Long writerId = articleForm.getWriterId();
    	User writer = userRepo.findById(writerId).get();
    	if (joinRepo.findByJoinMemberIdAndJoinStudyId(writerId, studyId).isEmpty()) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST,
    				"스터디원(리더)만 작성할 수 있습니다.",
    				new IllegalArgumentException());
    	}
    	
    	Study study = studyRepo.findById(studyId).get();
    	StudyArticle article = articleForm.toEntity();
    	
    	article.setStudyWriter(writer);
    	article.setStudy(study);
    	articleRepo.save(article);
    }
    
    @Transactional // 변경된 데이터를 DB에 저장
    public void updateArticle(
    		Long studyId,
    		Long articleId,
    		String title,
    		String content) {
    	StudyArticle article = articleRepo.findByStudyIdAndId(studyId, articleId).get();
    	
    	if (title != null && title.length() > 0 && !Objects.equals(article.getTitle(), title)) {
    		article.setTitle(title);
    	}
    	
    	if (content != null && content.length() > 0 && !Objects.equals(article.getContent(), content)) {
    		article.setContent(content);
    	}
    }
    
    @Transactional
    public void deleteArticle(Long studyId, Long articleId) {
    	articleRepo.deleteByStudyIdAndId(studyId, articleId);
    }
    
    
    // 검색 키워드 하나로 제목 & 내용 검색하기
    public List<StudyArticleResponse> searchArticle(String keyWord) {
    	List<StudyArticleResponse> articleList = new ArrayList<>();
    	
		articleRepo.findAll(StudyArticleSpec.searchWith(keyWord)).forEach(article -> {
			StudyArticleResponse response = article.toResponse();
    		articleList.add(response);
		});
    	return articleList;
    }
	
	
}
