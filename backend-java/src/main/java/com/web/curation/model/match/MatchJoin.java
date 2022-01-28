package com.web.curation.model.match;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.web.curation.model.account.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class MatchJoin {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "joinUser_id")
	private User joinUser;
	
	@ManyToOne
	@JoinColumn(name = "joinArticle_id")
	private MatchArticle joinArticle;
	
	@Column
	private String content;
}
