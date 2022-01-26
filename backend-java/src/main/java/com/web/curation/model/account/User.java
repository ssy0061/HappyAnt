// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.web.curation.model.account;

import lombok.AllArgsConstructor;
//import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.web.curation.model.match.Mat_Article;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
//@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    private String password;
    private String email;
    
    @CreatedDate
    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
    		insertable = false, 
    		updatable = false)
    private LocalDateTime createDate;
    
    

    @OneToMany(mappedBy="writer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mat_Article> mat_articles = new ArrayList<Mat_Article>();

    
	public Long getId() {
		return id;
	}

	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public LocalDateTime getCreateDate() {
		return createDate;
	}


	public List<Mat_Article> getMat_articles() {
		return mat_articles;
	}


	public void setMat_articles(List<Mat_Article> mat_articles) {
		this.mat_articles = mat_articles;
	}
	
    
	public User() {
		super();
	}

	public User(Long id, String password, String email) {
		super();
		this.password = password;
		this.email = email;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", password=" + password + ", email=" + email + ", createDate=" + createDate + "]";
	}
}
