package com.web.curation.dto.match;

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
public class MatchJoinUserResponse {
	private Long ArticleId;
	private Long UserId;
	private String UserName;
	private String content;
}
