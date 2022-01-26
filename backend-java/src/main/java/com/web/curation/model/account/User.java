// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.web.curation.model.account;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
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

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @Column
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    private String email;

    @Column
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")

    private String password;

    @Column
    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;
    
    @Column
    private int age;
    
    @Column
    private int score;
    
    @Column
    private String question;
    
    @Column
    private String answer;

    @CreatedDate
    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", 
    		insertable = false, 
    		updatable = false)
    private LocalDateTime createDate;

    @OneToMany(mappedBy="writer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mat_Article> mat_articles = new ArrayList<Mat_Article>();

//    @Enumerated(EnumType.STRING)
//    private Role role;

//    public Member(MemberSignupRequestDto request) {
//        email = request.getEmail();
//        password = request.getPassword();
//        name = request.getName();
//        role = Role.USER;
//    }
//
//    public void encryptPassword(PasswordEncoder passwordEncoder) {
//        password = passwordEncoder.encode(password);
//    }

}
