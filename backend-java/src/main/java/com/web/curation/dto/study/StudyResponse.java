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
public class StudyResponse {
	private Long studyId;
	private String studyName;
	private Long leaderId;
	private String area;
	private String category;
	private String interest;
	private Long headCount;
	private LocalDateTime createDate;
}
