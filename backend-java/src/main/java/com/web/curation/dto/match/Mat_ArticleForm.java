package com.web.curation.dto.match;

import com.web.curation.model.match.Mat_Article;

public class Mat_ArticleForm {
	private String title;
	private String content;
	
	public Mat_ArticleForm(String title, String content) {
		super();
		this.title = title;
		this.content = content;
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

	@Override
	public String toString() {
		return "ArticleForm [title=" + title + ", content=" + content + "]";
	}
	
	
	public Mat_Article toEntity() {
		return new Mat_Article(null, title, content);
	}
	
}
