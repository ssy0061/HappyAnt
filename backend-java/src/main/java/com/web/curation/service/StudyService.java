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
import com.web.curation.dto.match.MatchJoinUserResponse;
import com.web.curation.dto.study.StudyArticleRequest;
import com.web.curation.dto.study.StudyArticleResponse;
import com.web.curation.dto.study.StudyCommentRequest;
import com.web.curation.dto.study.StudyCommentResponse;
import com.web.curation.dto.study.StudyJoinUserResponse;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;
import com.web.curation.model.study.Study;
import com.web.curation.model.study.StudyArticle;
import com.web.curation.model.study.StudyComment;
import com.web.curation.model.study.StudyJoin;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.MatchArticleRepo;
import com.web.curation.repository.study.StudyArticleRepo;
import com.web.curation.repository.study.StudyCommentRepo;
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
	@Autowired
	private StudyCommentRepo commentRepo;

	
	// 스터디에서 '초대'로 멤버 추가
	@Transactional
	public void addNewStudyMember(Long studyId, Long joinUserId) {
		Study study = studyRepo.findById(studyId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.NOT_FOUND,
													"존재하지 않는 스터디 id입니다.",
													new IllegalArgumentException()));
		User joinUser = userRepo.findById(joinUserId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.NOT_FOUND,
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
    	studyRepo.findById(studyId).orElseThrow(() -> new ResponseStatusException(
										HttpStatus.NOT_FOUND,"존재하지 않는 스터디 id입니다.",
										new IllegalArgumentException()));
    	List<StudyArticleResponse> articleList = new ArrayList<>();
    	
    	articleRepo.findByStudyId(studyId).forEach(article -> {
    		StudyArticleResponse response = article.toResponse();
    		articleList.add(response);
    	});
    	return articleList;
    }
    
    public StudyArticleResponse getArticle(Long studyId, Long articleId) {
    	StudyArticle article = articleRepo.findByStudyIdAndId(studyId, articleId)
    							.orElseThrow(() -> new ResponseStatusException(
									HttpStatus.BAD_REQUEST, "스터디 또는 게시글 id를 확인하세요",
									new IllegalArgumentException()));
    	StudyArticleResponse response = article.toResponse();
    	return response;
    }
    
    public void addNewArticle(Long studyId, StudyArticleRequest articleForm) {
    	Study study = studyRepo.findById(studyId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.NOT_FOUND,"존재하지 않는 스터디 id입니다.",
													new IllegalArgumentException()));
    	Long writerId = articleForm.getWriterId();
    	User writer = userRepo.findById(writerId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.NOT_FOUND,"존재하지 않는 유저 id입니다.",
													new IllegalArgumentException()));
    	
    	checkStudyMember(studyId, writerId);
    	
    	StudyArticle article = articleForm.toEntity();
    	
    	article.setStudyWriter(writer);
    	article.setStudy(study);
    	articleRepo.save(article);
    }
    
    @Transactional // 변경된 데이터를 DB에 저장
    public void updateArticle(
    		Long studyId,
    		Long articleId,
    		Long userId,
    		String title,
    		String content) {
    	StudyArticle article = articleRepo.findByStudyIdAndId(studyId, articleId)
					    			.orElseThrow(() -> new ResponseStatusException(
									HttpStatus.BAD_REQUEST, "스터디 또는 게시글 id를 확인하세요",
									new IllegalArgumentException()));
    	checkWriter(article.getStudyWriter().getId(), userId);
    	
    	if (title != null && title.length() > 0 && !Objects.equals(article.getTitle(), title)) {
    		article.setTitle(title);
    	}
    	
    	if (content != null && content.length() > 0 && !Objects.equals(article.getContent(), content)) {
    		article.setContent(content);
    	}
    }
    
    @Transactional
    public void deleteArticle(Long studyId, Long articleId, Long userId) {
    	StudyArticle article = articleRepo.findById(articleId).orElseThrow(() -> new ResponseStatusException(
																HttpStatus.NOT_FOUND,"존재하지 않는 게시글 id입니다.",
																new IllegalArgumentException()));
    	checkStudyArticle(studyId, articleId);
    	checkWriter(article.getStudyWriter().getId(), userId);
    	articleRepo.deleteByStudyIdAndId(studyId, articleId);
    }
    
    
    // 검색 키워드 하나로  '특정 스터디'의 제목 & 내용 검색하기
    public List<StudyArticleResponse> searchArticle(Long studyId, String keyWord) {
    	studyRepo.findById(studyId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.NOT_FOUND,"존재하지 않는 스터디 id입니다.",
													new IllegalArgumentException()));
    	List<StudyArticleResponse> articleList = new ArrayList<>();
    	
		articleRepo.findAll(StudyArticleSpec.searchWith(studyId, keyWord)).forEach(article -> {
			StudyArticleResponse response = article.toResponse();
    		articleList.add(response);
		});
    	return articleList;
    }
	
    // 아래는 댓글
    // 아래는 댓글
    
    // 스터디의 게시글인지 확인
    public void checkStudyArticle(Long studyId, Long articleId) {
    	// articleId로 존재여부 조회 -> studyId 비교
    	articleRepo.findByStudyIdAndId(studyId, articleId)
					.orElseThrow(() -> new ResponseStatusException(
					HttpStatus.BAD_REQUEST, "스터디 또는 게시글 id를 확인하세요",
					new IllegalArgumentException()));
    }
    
    // 스터디의 멤버인지 확인
    public void checkStudyMember(Long studyId, Long userId) {
    	if (joinRepo.findByJoinMemberIdAndJoinStudyId(userId, studyId).isEmpty()) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST, "스터디 멤버(리더)가 아닙니다.",
    				new IllegalArgumentException());
    	}
    }
    // 게시글의 댓글인지 확인
    public StudyComment getAndCheckComment(Long articleId, Long commentId) {
    	return commentRepo.findByStudyArticleIdAndId(articleId, commentId)
			    			.orElseThrow(() -> new ResponseStatusException(
			    					HttpStatus.BAD_REQUEST, "게시글 또는 댓글 id를 확인하세요",
			    					new IllegalArgumentException()));
    }
    
    // 작성자인지 확인
    public void checkWriter(Long writerId, Long userId) {
    	if (writerId != userId) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST, "게시글(댓글) 작성자가 아닙니다.",
    				new IllegalArgumentException());
    	}
    }
    
    public List<StudyCommentResponse> getCommentList(Long studyId, Long articleId) {
    	checkStudyArticle(studyId, articleId);
    	
    	List<StudyCommentResponse> commentList = new ArrayList<>();
    	
    	commentRepo.findByStudyArticleId(articleId).forEach(comment -> {
    		StudyCommentResponse response = comment.toResponse();
    		commentList.add(response);
    	});
    	
    	return commentList;
    }
	
    public void addNewComment(Long studyId, Long articleId, StudyCommentRequest commentForm) {
    	
    	Long writerId = commentForm.getWriterId();
    	User writer = userRepo.findById(writerId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.NOT_FOUND,"존재하지 않는 유저 id입니다.",
													new IllegalArgumentException()));
    	checkStudyArticle(studyId, articleId);
    	checkStudyMember(studyId, writerId);
    	StudyArticle article = articleRepo.findById(articleId).orElseThrow(() -> new ResponseStatusException(
																HttpStatus.NOT_FOUND,"존재하지 않는 게시글 id입니다.",
																new IllegalArgumentException()));
    	
    	StudyComment comment = commentForm.toEntity();
    	
    	comment.setStudyCommenter(writer);
    	comment.setStudyArticle(article);
    	commentRepo.save(comment);
    }
    
    @Transactional // 변경된 데이터를 DB에 저장
    public void updateComment(Long studyId, Long articleId, Long commentId, Long userId, String content) {
    	checkStudyArticle(studyId, articleId);

    	StudyComment comment = getAndCheckComment(articleId, commentId);
    	checkWriter(comment.getStudyCommenter().getId(), userId);
    	if (content != null && content.length() > 0 && !Objects.equals(comment.getContent(), content)) {
    		comment.setContent(content);
    	}
    }
    
    @Transactional
    public void deleteComment(Long studyId, Long articleId, Long commentId, Long userId) {
    	checkStudyArticle(studyId, articleId);
    	StudyComment comment = getAndCheckComment(articleId, commentId);
    	checkWriter(comment.getStudyCommenter().getId(), userId);
    	commentRepo.deleteByStudyArticleIdAndId(articleId, commentId);
    }
    
    public List<StudyJoinUserResponse> searchMember(Long studyId) {
    	studyRepo.findById(studyId).orElseThrow(() -> new ResponseStatusException(
												HttpStatus.NOT_FOUND,
												"존재하지 않는 스터디 id입니다.",
												new IllegalArgumentException()));
    	List<StudyJoinUserResponse> response = new ArrayList<>();
    	joinRepo.findByjoinStudyId(studyId).forEach(join -> {
    		response.add(join.toJoinUserResponse());
    	});
    	return response;
    }
}
