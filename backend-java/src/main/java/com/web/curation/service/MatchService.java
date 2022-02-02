package com.web.curation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web.curation.dto.match.MatchArticleRequest;
import com.web.curation.dto.match.MatchArticleResponse;
import com.web.curation.dto.match.MatchJoinUserResponse;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;
import com.web.curation.model.study.Study;
import com.web.curation.model.study.StudyJoin;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.MatchArticleRepo;
import com.web.curation.repository.match.MatchJoinRepo;
import com.web.curation.repository.study.StudyJoinRepo;
import com.web.curation.repository.study.StudyRepo;
import com.web.curation.specification.MatchArticleSpec;
import com.web.curation.specification.MatchArticleSpec.MartchArticleSearchKey;
import com.web.curation.specification.MatchJoinSpec;
import com.web.curation.specification.StudyJoinSpec;
import com.web.curation.specification.MatchJoinSpec.MatchJoinSearchKey;

@Service
public class MatchService {
	
	@Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결함
    private MatchArticleRepo articleRepo;
	@Autowired
    private UserRepo userRepo;
    @Autowired 
    private MatchJoinRepo joinRepo;
	@Autowired
	private StudyRepo studyRepo;
	@Autowired
	private StudyJoinRepo studyJoinRepo;
    
    public List<MatchArticleResponse> getArticleList() {
    	List<MatchArticleResponse> articleList = new ArrayList<>();
    	
    	articleRepo.findAll().forEach(article -> {
    		MatchArticleResponse response = article.toResponse();
    		articleList.add(response);
    	});
    	return articleList;
    }
    
    public MatchArticleResponse getArticle(Long articleId) {
    	MatchArticle article = articleRepo.findById(articleId)
    			.orElseThrow(() -> new IllegalStateException(
    					"article with id " + articleId + " does not exist"));
    	MatchArticleResponse response = article.toResponse();
    	return response;
    }
    
    public void addNewArticle(MatchArticleRequest articleForm) {
    	Long writerId = articleForm.getWriterId();
    	// 1. dto를 Entity로 변경
    	MatchArticle article = articleForm.toEntity();
    	User writer = userRepo.findById(writerId)
    			.orElseThrow(() -> new ResponseStatusException(
							HttpStatus.BAD_REQUEST,
							"존재하지 않는 유저 id입니다.",
							new IllegalArgumentException()));
    	article.setWriter(writer);
//    	writer.getMatchArticles().add(article);
    	// 2. Repository를 이용하여 Entity를 DB에 저장함
    	articleRepo.save(article);
    }
    
    @Transactional // 변경된 데이터를 DB에 저장
    public void updateArticle(
    		Long articleId,
    		String title,
    		String category,
    		String content,
    		Boolean state) {
    	MatchArticle article = articleRepo.findById(articleId)
    			.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.BAD_REQUEST,
						"존재하지 않는 게시글 id입니다.",
						new IllegalArgumentException()));
    	
    	if (title != null && title.length() > 0 && !Objects.equals(article.getTitle(), title)) {
    		article.setTitle(title);
    	}
    	
    	if (category != null && category.length() > 0 && !Objects.equals(article.getCategory(), category)) {
    		article.setCategory(category);
    	}
    	
    	if (content != null && content.length() > 0 && !Objects.equals(article.getContent(), content)) {
    		article.setContent(content);
    	}
    	
    	if (state != null && !Objects.equals(article.getState(), state)) {
    		article.setState(state);
    	}
    }
    
    public void deleteArticle(Long articleId) {
    	articleRepo.deleteById(articleId);
    }
    
    
    // 검색 키워드 하나로 제목 & 내용 검색하기
    public List<MatchArticleResponse> searchArticle(String keyWord) {
    	List<MatchArticleResponse> articleList = new ArrayList<>();
    	
		articleRepo.findAll(MatchArticleSpec.searchWith(keyWord)).forEach(article -> {
			MatchArticleResponse response = article.toResponse();
    		articleList.add(response);
		});
    	return articleList;
    }
    
    // 스터디 신청
    public void joinStudy(Long id, Long joinUserId, String content) {
    	MatchArticle article = articleRepo.findById(id).get();
    	User joinUser = userRepo.findById(joinUserId)
    			.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.BAD_REQUEST,
						"존재하지 않는 유저 id입니다.",
						new IllegalArgumentException()));

    	List<MatchJoin> chk = joinRepo.findAll(MatchJoinSpec.checkMatchJoin(joinUserId, id));
    	if (article.getWriter().getId() == joinUserId) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST,
    				"작성한 모집글에 신청할 수 없습니다.",
    				new IllegalArgumentException());
    	} else if (chk.size() > 0) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST,
    				"이미 신청한 모집글입니다.",
    				new IllegalArgumentException());
    	} else {
        	MatchJoin join = new MatchJoin();
        	join.setJoinArticle(article);
        	join.setJoinUser(joinUser);
        	join.setContent(content);
        	
        	joinRepo.save(join);
    	}
    }
    
    public List<MatchArticleResponse> getJoinArticle(Long userId) {
    	List<MatchArticleResponse> response = new ArrayList<>();
    	joinRepo.findByJoinUserId(userId).forEach(join -> {
    		response.add(join.getJoinArticle().toResponse());
    	});
    	return response;
    }
    
    public List<MatchJoinUserResponse> getJoinUser(Long articleId) {
    	List<MatchJoinUserResponse> response = new ArrayList<>();
    	joinRepo.findByJoinArticleId(articleId).forEach(join -> {
    		response.add(join.toJoinUserResponse());
    	});
    	return response;
    }
    
	// 모집글에서 '승인'으로 멤버 추가
	@Transactional
	public void addNewMatchMember(Long articleId, Long joinUserId) {
		MatchArticle article = articleRepo.findById(articleId).get();

		User leader = article.getWriter();
		User joinUser = userRepo.findById(joinUserId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.BAD_REQUEST,
													"존재하지 않는 유저 id입니다.",
													new IllegalArgumentException()));
		if (leader.getId() == joinUserId) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST,
    				"모집글 작성자는 일반 회원으로 추가할 수 없습니다.",
    				new IllegalArgumentException());
		}

		// 스터디 없으면 생성, 있으면 멤버만 추가
		if (article.getStudyId() == null) {
			// 스터디 생성
			Study study = new Study();
			study.setLeader(leader);
			Study saved = studyRepo.save(study);
			
			// 스터디에 유저추가(리더)
			StudyJoin join = new StudyJoin(null, leader, saved, true);
			studyJoinRepo.save(join);
			// 스터디에 유저추가(멤버1)
			StudyJoin join2 = new StudyJoin(null, joinUser, saved, false);
			studyJoinRepo.save(join2);
			// matchArticle에 추가
			article.setStudyId(saved.getId());
		} else {
			Long studyId = article.getStudyId();
			Study study = studyRepo.findById(studyId).get();
			List<StudyJoin> chk = studyJoinRepo.findAll(StudyJoinSpec.checkStudyJoin(joinUserId, studyId));
			if (chk.size() > 0) {
	    		throw new ResponseStatusException(
	    				HttpStatus.BAD_REQUEST,
	    				"이미 스터디에 가입한 회원입니다.",
	    				new IllegalArgumentException());
			} else {
				// 스터디에 유저추가(멤버1)
				StudyJoin join = new StudyJoin(null, joinUser, study, false);
				studyJoinRepo.save(join);
			}
		}

	}
}
