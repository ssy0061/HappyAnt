package com.web.curation.dto.match;


import com.web.curation.model.match.Mat_Article;

import lombok.*;

@Data
public class Mat_ArticleForm {
	private String title;
	private String category;
	private String content;
	private Long writer_id;

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

	public Long getWriter_id() {
		return writer_id;
	}

	public void setWriter_id(Long writer_id) {
		this.writer_id = writer_id;
	}
	
	
	public Mat_ArticleForm(String title, String category, String content, Long writer_id) {
		super();
		this.title = title;
		this.category = category;
		this.content = content;
		this.writer_id = writer_id;
	}

	@Override
	public String toString() {
		return "Mat_ArticleForm [title=" + title + ", category=" + category + ", content=" + content + ", writer_id="
				+ writer_id + "]";
	}


	public Mat_Article toEntity() {
		return new Mat_Article(title, category, content, false, null);
	}
	
}
