package com.web.curation.model.match;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.curation.model.account.User;

@Entity // DB가 해당 객체를 인식 가능!
public class Mat_Article {
	
	@Id // 대푯값 지정
	@GeneratedValue // 1, 2, 3, ... 자동 생성
	private Long id;
	
	@Column
	private String title;
	
	@Column
	private String category;
	
	@Column
	private String content;
	
    @CreatedDate
    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
    		insertable = false, 
    		updatable = false)
	private LocalDateTime create_date;
	
//	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
//			insertable = false, 
//    		updatable = false)
//	private LocalDateTime update_date;
	
	@Column
	private Boolean state;
	
	@ManyToOne
	@JoinColumn(name = "writer_id",
				referencedColumnName = "id",
				updatable = false) // 외래키로 조인
	@JsonIgnore
	private User writer;
	
	@Column(insertable = false, updatable = false)
	private Long writer_id;

	
	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreate_date() {
		return create_date;
	}

	public void setCreate_date(LocalDateTime create_date) {
		this.create_date = create_date;
	}

	public Boolean getState() {
		return state;
	}

	public void setState(Boolean state) {
		this.state = state;
	}
	

	public User getWriter() {
		return writer;
	}

	public void setWriter(User writer) {
		this.writer = writer;
	}

	
	
	public Long getWriter_id() {
		return writer_id;
	}

	public void setWriter_id(Long writer_id) {
		this.writer_id = writer.getId();
	}

	public Mat_Article() {
		
	}

	public Mat_Article(String title, String category, String content, Boolean state, User writer) {
		super();
		this.title = title;
		this.category = category;
		this.content = content;
		this.state = state;
		this.writer = writer;
	}

	public Mat_Article toEntity() {
		return new Mat_Article(title, category, content, state, writer);
	}

	@Override
	public String toString() {
		return "Mat_Article [id=" + id + ", title=" + title + ", category=" + category + ", content=" + content
				+ ", create_date=" + create_date + ", state=" + state + ", writer=" + writer + "]";
	}
	
}
