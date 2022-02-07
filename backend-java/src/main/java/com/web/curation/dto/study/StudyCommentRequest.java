package com.web.curation.dto.study;

import com.web.curation.model.study.StudyComment;

import lombok.Data;

@Data
public class StudyCommentRequest {
	private Long writerId;
	private String content;
	
	public StudyComment toEntity() {
		return new StudyComment(null, null, content);
	}
}
