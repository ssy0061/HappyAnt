package com.web.curation.model.match;

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

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.curation.dto.match.MatchArticleResponse;
import com.web.curation.model.account.MyUser;
import com.web.curation.model.study.Study;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity // DB가 해당 객체를 인식 가능!
@ToString
public class MatchArticle {
	
	@Id // 대푯값 지정
	@GeneratedValue // 1, 2, 3, ... 자동 생성
	private Long id;
	
	@Column
	private String title;
	
	@Column
	private String content;
	
	@Column
	private String tempStudyName;
	
	@Column
	private String tempCategory;
	
	@Column
	private String tempArea;
	
	@Column
	private String tempInterest;
	
    @CreatedDate
    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
    		insertable = false, 
    		updatable = false)
	private LocalDateTime createDate;
	
    @CreatedDate
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
			insertable = false, 
    		updatable = false)
	private LocalDateTime updateDate;
	
	@Column
	private Boolean state;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "writer_id",
				referencedColumnName = "id",
				updatable = false) // 외래키로 조인
	@JsonBackReference
	private MyUser writer;

	@OneToMany(mappedBy="joinArticle", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
    private List<MatchJoin> matchJoinUsers = new ArrayList<MatchJoin>();
	
	// 단방향
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "study_id",
				referencedColumnName = "id")
	@JsonIgnore
	private Study study;
	

	public MatchArticle() {
		
	}

	public MatchArticle(String title, String content, 
						String tempStudyName, String tempCategory,
						String tempArea, String tempInterest, Boolean state) {
		super();
		this.title = title;
		this.content = content;
		this.tempStudyName = tempStudyName;
		this.tempCategory = tempCategory;
		this.tempArea = tempArea;
		this.tempInterest = tempInterest;
		this.state = state;
	}
	
	public MatchArticle(String title, String content, Boolean state) {
		super();
		this.title = title;
		this.content = content;
		this.state = state;
	}

	public MatchArticle toEntity() {
		return new MatchArticle(title, content, tempStudyName,
								tempCategory, tempArea, tempInterest, state);
	}
	
	public MatchArticleResponse toResponse() {
		return new MatchArticleResponse(id, title, content, writer.getId(), writer.getName(), createDate, updateDate, state,
				study.getId(), study.getName(), study.getInterest());
	}
	
}
