package com.web.curation.model.match;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Builder;

@Entity // DB가 해당 객체를 인식 가능!
public class Mat_Article {
	
	@Id // 대푯값 지정
	@GeneratedValue // 1, 2, 3, ... 자동 생성
	private Long id;
	
	@Column
	private String title;
	
	@Column
	private String content;
	
	public Mat_Article() {
		
	}
	
	
	
	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
	}



	public String getContent() {
		return content;
	}



	public void setContent(String content) {
		this.content = content;
	}



	public Mat_Article(Long id, String title, String content) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
	}
	
	public Mat_Article toEntity() {
		return new Mat_Article(id, title, content);
	}
	
	@Override
	public String toString() {
		return "Mat_Article [id=" + id + ", title=" + title + ", content=" + content + "]";
	}
	
	
}
