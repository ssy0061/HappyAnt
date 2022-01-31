package com.web.curation.model.study;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.curation.dto.study.StudyArticleResponse;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@NoArgsConstructor
@ToString
public class StudyArticle {
	
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "study_id",
				referencedColumnName = "id",
				updatable = false)
	@JsonBackReference
	private Study study;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "studyWriter_id",
				referencedColumnName = "id",
				updatable = false)
	@JsonBackReference
	private User studyWriter;
    
    @OneToMany(mappedBy="studyArticle", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<StudyComment> studyComments = new ArrayList<StudyComment>();
    
	@Column
	private String title;
	
	@Column
	private String content;
	
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

	public StudyArticle(String title, String content, LocalDateTime createDate, LocalDateTime updateDate) {
		super();
		this.title = title;
		this.content = content;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}
    
	public StudyArticleResponse toResponse() {
		return new StudyArticleResponse(id, study.getId(), title, content, 
								studyWriter.getId(), studyWriter.getName(), 
								createDate, updateDate);
	}
    
    
}
