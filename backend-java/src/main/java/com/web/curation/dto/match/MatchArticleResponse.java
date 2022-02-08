package com.web.curation.dto.match;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MatchArticleResponse {
	private Long articleId;
	private String category;
	private String title;
	private String content;
	private Long writerId;
	private String writerName;
	private String tempStudyName;
	private Long headCount;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
	private Boolean state;
	private Long studyId;
	private String studyName;
}
