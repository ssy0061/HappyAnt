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
	private String content;
	private String tempStudyName;
	private Long tempHeadCount;
	private String tempCategory;
	private String tempArea;
	private String tempInterest;
	private Long writerId;
	private Long studyId;

	public MatchArticle toEntity() {
		return new MatchArticle(title, content, tempStudyName, tempHeadCount,
								tempCategory, tempArea, tempInterest, false);
	}
	
	public MatchArticle toStudyEntity() {
		return new MatchArticle(title, content, false);
	}
}
