package com.web.curation.service;

import java.util.ArrayList;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.web.curation.dto.account.LoginResponse;
import com.web.curation.model.account.MyUser;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.repository.account.UserRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

	@Autowired
	private UserRepo userRepository;
	
	public void signUp(MyUser userInfo){
		MyUser user = new MyUser();
		user.setEmail(userInfo.getEmail());
		user.setName(userInfo.getName());
		user.setPassword(userInfo.getPassword());
		user.setQuestion(userInfo.getQuestion());		
		user.setAnswer(userInfo.getAnswer());	
		
		userRepository.save(user);

    }
	
	public void save(MyUser user) {
		userRepository.save(user);		
	}
	
	public List<MyUser> findAll() {
		List<MyUser> users = new ArrayList<>();
		userRepository.findAll().forEach(u -> users.add(u));
		return users;
	}
	
	public Optional<MyUser> findById(Long id) {
		Optional<MyUser> user = userRepository.findById(id);
		return user;
	}

	
	public void deleteById(Long id) {
		
		userRepository.deleteById(id);
	}
	
	public void updateById(Long id, MyUser updatedMember) {
		Optional<MyUser> user = userRepository.findById(id);
		if(user.isPresent()) {
			user.get().setPassword(updatedMember.getPassword());
			user.get().setName(updatedMember.getName());
			userRepository.save(user.get());
		}
	}
	
	@Transactional
	public void updateUser(Long id, String password, String question, String answer) {
		MyUser user = userRepository.findById(id).orElseThrow(() -> new IllegalStateException(
				"id of user does not exist"));
		if(password !=null && !Objects.equals(user.getPassword(), password)) {
			user.setPassword(password);
		}
		
		if(question !=null && !Objects.equals(user.getQuestion(), question)) {
			user.setQuestion(question);
		}
		
		if(answer !=null && !Objects.equals(user.getAnswer(), answer)) {
			user.setAnswer(answer);
		}
	}

//	public User login(String email, String password) {
//		User user = userRepository.findByEmail(email);
//		boolean permission = user.getPassword().equals(password);
//		if(permission) return user;
//		else return null;		
//	}

	public MyUser findByEmail(String email) {
		MyUser user = userRepository.findByEmail(email);
		return user;
	}
	
	public boolean checkDupliByEmail(String email) {
		List<String> emails = new ArrayList<>();
		userRepository.findAll().forEach(u -> emails.add(u.getEmail()));
		
		boolean isDupli = false;
		for (String e : emails) {
			if(e.equals(email)) {
				isDupli = true;
				break;
			}			
		}
		
		return isDupli;
	}
	



//	@Transactional
//	public void login(Member member){
//		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		member.setPassword(passwordEncoder.encode(member.getPassword()));
//		memberRepository.save(member);
//	}



	
}
