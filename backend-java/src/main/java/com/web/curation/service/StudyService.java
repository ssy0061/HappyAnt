package com.web.curation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web.curation.model.account.User;
import com.web.curation.model.study.Study;
import com.web.curation.model.study.StudyJoin;
import com.web.curation.repository.account.UserRepo;
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
//	@Autowired
//	private StudyArticleRepo articleRepo;
//	@Autowired
//	private StudyCommentRepo commentRepo;


	
	public void addNewStudy(Long leaderId, Long joinUserId) {
		User leader = userRepo.findById(leaderId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.BAD_REQUEST,
													"존재하지 않는 유저 id입니다.",
													new IllegalArgumentException()));
		User joinUser = userRepo.findById(joinUserId).orElseThrow(() -> new ResponseStatusException(
													HttpStatus.BAD_REQUEST,
													"존재하지 않는 유저 id입니다.",
													new IllegalArgumentException()));
		// 스터디 생성
		Study study = new Study();
		study.setLeader(leader);
		Study saved = studyRepo.save(study);
		
		// 스터디에 유저추가(리더)
		StudyJoin join = new StudyJoin();
		join.setJoinStudy(saved);
		join.setJoinMember(leader);
		join.setLeader(true);
		joinRepo.save(join);
		// 스터디에 유저추가(멤버)
		StudyJoin join2 = new StudyJoin();
		join2.setJoinStudy(saved);
		join2.setJoinMember(joinUser);
		join2.setLeader(false);
		joinRepo.save(join2);
	}
	
}
