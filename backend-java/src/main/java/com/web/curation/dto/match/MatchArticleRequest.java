package com.web.curation.dto.match;


import com.web.curation.model.match.MatchArticle;

import lombok.*;

@Data
public class MatchArticleRequest {
	private String title;
	private String category;
	private String content;
	private Long writerId;

	public MatchArticle toEntity() {
		return new MatchArticle(title, category, content, false, null);
	}
	
}
