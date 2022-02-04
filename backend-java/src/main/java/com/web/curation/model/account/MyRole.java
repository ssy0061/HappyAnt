package com.web.curation.model.account;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyRole {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
//	역할 이름
	private String name;
	
}
