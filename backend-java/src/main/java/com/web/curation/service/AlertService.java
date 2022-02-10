package com.web.curation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.web.curation.dto.alert.AlertMessage;
import com.web.curation.dto.alert.AlertRequest;
import com.web.curation.model.account.MyUser;
import com.web.curation.model.alert.Alert;
import com.web.curation.model.alert.AlertType;
import com.web.curation.model.study.StudyArticle;
import com.web.curation.model.study.StudyJoin;
import com.web.curation.repository.alert.AlertRepo;
import com.web.curation.repository.study.StudyJoinRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlertService {
    private final SimpMessageSendingOperations messagingTemplate;
    
	@Autowired
	private AlertRepo alertRepo;
	@Autowired
	private StudyJoinRepo joinRepo;

    public void studyArticleAlert(Long studyId, StudyArticle article) {
    	List<StudyJoin> join = joinRepo.findByjoinStudyId(studyId);
    	// 스터디의 모든 멤버들에게 게시글 작성 알림
    	join.forEach(member -> {
    		MyUser user = member.getJoinMember();
        	Alert alert = new Alert(user, studyId, article.getId());
        	alert.setType(AlertType.STUDY);
        	Alert newAlert = alertRepo.save(alert);
        	AlertMessage message = new AlertMessage(newAlert.getId(), user.getId(),
        							user.getName() + "님, 스터디에 새 게시글이 작성되었습니다.");
            messagingTemplate.convertAndSend("/alert/" + message.getUserId(), message);
    	});

    }
}
