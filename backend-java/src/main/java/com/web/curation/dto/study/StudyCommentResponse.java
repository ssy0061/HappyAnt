package com.web.curation.dto.study;

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
public class StudyCommentResponse {
	private Long articleId;
	private Long CommentId;
	private String content;
	private Long writerId;
	private String writerName;
	private LocalDateTime createDate;
	private LocalDateTime updateDate;
}
