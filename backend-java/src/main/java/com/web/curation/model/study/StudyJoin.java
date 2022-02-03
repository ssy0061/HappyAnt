package com.web.curation.model.study;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudyJoin {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	@JsonBackReference
	private User joinMember;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "study_id")
	@JsonBackReference
	private Study joinStudy;
	
	@Column
	private Boolean leader;	
}
