package com.web.curation.dto.study;

import com.web.curation.model.study.StudyComment;

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
public class StudyCommentRequest {
	private Long writerId;
	private String content;
	
	public StudyComment toEntity() {
		return new StudyComment(null, null, content);
	}
}
