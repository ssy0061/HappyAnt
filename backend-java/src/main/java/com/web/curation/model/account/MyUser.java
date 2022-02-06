// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.web.curation.model.account;

import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
//import lombok.Data;
import lombok.Data;
import lombok.Getter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
    @Column    
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    @Column
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
//    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")

    private String password;

    @Column
    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;

    private int score;
    private String question;    
    private String answer;
    
    @ManyToMany(fetch = FetchType.EAGER)
//    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<MyRole> roles = new ArrayList<>();

    @CreatedDate
    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
    		insertable = false, 
    		updatable = false)
    private LocalDateTime createDate;

    @OneToMany(mappedBy="writer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MatchArticle> matchArticles = new ArrayList<MatchArticle>();
    
    @OneToMany(mappedBy="joinUser", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<MatchJoin> matchJoinArticles = new ArrayList<MatchJoin>();
    
    public MyUser(@NotBlank(message = "이메일은 필수 입력 값입니다.") String email,
			@NotBlank(message = "비밀번호는 필수 입력 값입니다.") @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.") String password) {
    	super();
    	this.email = email;
    	this.password = password;
    }

		
	public MyUser(@NotBlank(message = "이메일은 필수 입력 값입니다.") String email,
			@NotBlank(message = "비밀번호는 필수 입력 값입니다.") @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.") String password,
			@NotBlank(message = "이름은 필수 입력 값입니다.") String name, String question, String answer) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;		
		this.question = question;
		this.answer = answer;
	}
	
	public MyUser(Long id, String email, String name, int score, String question, String answer) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.score = score;
		this.question = question;
		this.answer = answer;
	}


	
    public MyUser(Long id, @NotBlank(message = "이메일은 필수 입력 값입니다.") @Email(message = "이메일 형식에 맞지 않습니다.") String email,
			@NotBlank(message = "비밀번호는 필수 입력 값입니다.") @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.") String password,
			@NotBlank(message = "이름은 필수 입력 값입니다.") String name, String question, String answer,
			Collection<MyRole> roles) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.name = name;
		this.question = question;
		this.answer = answer;
		this.roles = roles;
	}
    
}
