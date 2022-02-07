package com.web.curation.model.study;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.curation.dto.study.StudyResponse;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;

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
public class Study {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "leader_id",
		referencedColumnName = "id") // 외래키로 조인
	@JsonBackReference
	private User leader;
	
	@OneToMany(mappedBy="joinStudy", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<StudyJoin> studyMembers = new ArrayList<StudyJoin>();
	
	@OneToMany(mappedBy="study", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<StudyArticle> studyArticles = new ArrayList<StudyArticle>();
	
	@Column
	private String name;
	
	@Column
	private String category;
	
	@Column
	private String area;
	
	@Column
	private String interest;
	
    @CreatedDate
    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
    		insertable = false, 
    		updatable = false)
	private LocalDateTime createDate;
    
    public StudyResponse toResponse() {
    	return new StudyResponse(id, name, leader.getId(), category, area, interest, createDate);
    }
}
