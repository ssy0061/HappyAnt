// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.web.curation.model.account;

import lombok.Getter;


import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

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

    @Column(insertable = false, updatable = false)
    private LocalDateTime createDate;


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