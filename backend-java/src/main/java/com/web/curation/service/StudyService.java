package com.web.curation.service;

import java.util.List;
import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;
import com.web.curation.model.study.Study;
import com.web.curation.model.study.StudyJoin;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.MatchArticleRepo;
import com.web.curation.repository.study.StudyJoinRepo;
import com.web.curation.repository.study.StudyRepo;

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
//	@Autowired
//	private StudyArticleRepo articleRepo;
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
	
}
