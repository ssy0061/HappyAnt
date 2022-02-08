package com.web.curation.dto.match;


import com.web.curation.model.match.MatchArticle;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MatchArticleRequest {
	private String title;
	private String category;
	private String content;
	private String tempStudyName;
	private Long headCount;
	private Long writerId;

	public MatchArticle toEntity() {
		return new MatchArticle(title, category, content, tempStudyName, headCount, false);
	}
	
}
