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

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.curation.dto.study.StudyArticleResponse;
import com.web.curation.model.account.MyUser;

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
	private MyUser studyWriter;
    
    @Column
    private String writerName;
    
    @OneToMany(mappedBy="studyArticle", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<StudyComment> studyComments = new ArrayList<StudyComment>();
    
	@Column
	private String title;
	
	@Column(columnDefinition = "LONGTEXT")
	private String content;
	
	@Column
	private String code;
	
	@Column
	private String codeName;
	
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

	public StudyArticle(Study study, MyUser studyWriter, String writerName, String title, String content, String code, String codeName) {
		super();
		this.study = study;
		this.studyWriter = studyWriter;
		this.writerName = writerName;
		this.title = title;
		this.content = content;
		this.code = code;
		this.codeName = codeName;
	}
    
	public StudyArticleResponse toResponse() {
		return new StudyArticleResponse(id, study.getId(), title, content, 
								studyWriter.getId(), writerName, 
								createDate, updateDate, code, codeName);
	}
}
