package com.web.curation.model.alert;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.curation.dto.alert.AlertResponse;
import com.web.curation.model.account.MyUser;
import com.web.curation.model.match.JoinState;
import com.web.curation.model.study.StudyArticle;
import com.web.curation.model.study.StudyJoin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Alert {
	
	@Id
	@GeneratedValue
	private Long id;
	
	//단방향
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",
		referencedColumnName = "id")
	@JsonIgnore
	private MyUser user;
	
	@Enumerated(value = EnumType.STRING)
	private AlertType type;
	
	private String message;
	
	private Long studyId;
	
	// studyArticle
	private Long articleId;
	
    @CreatedDate
    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
    		insertable = false, 
    		updatable = false)
	private LocalDateTime createDate;
    
    public Alert(MyUser user, Long studyId, Long articleId) {
    	this.user = user;
    	this.studyId = studyId;
    	this.articleId = articleId;
    }
    
    public AlertResponse toResponse() {
    	return new AlertResponse(id, user.getId(), type, message, studyId, articleId, createDate);
    }
}
