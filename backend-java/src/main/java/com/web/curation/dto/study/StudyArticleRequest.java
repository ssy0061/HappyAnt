package com.web.curation.dto.study;

import com.web.curation.model.study.StudyArticle;

import lombok.Data;

@Data
public class StudyArticleRequest {
	private Long writerId;
	private String title;
	private String content;
	
	public StudyArticle toEntity() {
		return new StudyArticle(title, content, null, null);
	}
}
