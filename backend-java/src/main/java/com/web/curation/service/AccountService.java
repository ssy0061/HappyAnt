package com.web.curation.service;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.web.curation.model.account.User;
import com.web.curation.repository.account.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

	@Autowired
	private UserRepository userRepository;
	
	public void signup(User userInfo){
		User user = new User();
		user.setEmail(userInfo.getEmail());
		user.setName(userInfo.getName());
		user.setPassword(userInfo.getPassword());
		user.setQuestion(userInfo.getQuestion());
		user.setAge(userInfo.getAge());
		user.setAnswer(userInfo.getAnswer());	
		
		userRepository.save(user);

    }
	
	
	public List<User> findAll() {
		List<User> users = new ArrayList<>();
		userRepository.findAll().forEach(u -> users.add(u));
		return users;
	}
	
	public Optional<User> findById(Long id) {
		Optional<User> user = userRepository.findById(id);
		return user;
	}

	
	public void deleteById(Long id) {
		
		userRepository.deleteById(id);
	}
	
	public void updateById(Long id, User updatedMember) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) {
			user.get().setPassword(updatedMember.getPassword());
			user.get().setName(updatedMember.getName());
			userRepository.save(user.get());
		}
	}

//	@Transactional
//	public void login(Member member){
//		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		member.setPassword(passwordEncoder.encode(member.getPassword()));
//		memberRepository.save(member);
//	}



	
}
