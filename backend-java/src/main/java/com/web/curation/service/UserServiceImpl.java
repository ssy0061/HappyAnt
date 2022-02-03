package com.web.curation.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.curation.model.account.Role;
import com.web.curation.model.account.MyUser;
import com.web.curation.repository.account.Rolerepo;
import com.web.curation.repository.account.UserRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService{

	private final UserRepo userRepo;
	private final Rolerepo roleRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		MyUser user = userRepo.findByEmail(email);
		if(user==null) {
			log.error("User not found in the database");
			throw new UsernameNotFoundException("User not found in the database");
		}
		else {
			log.info("User found in the database: {}", email);
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		});
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
	}
	
	
	
	@Override
	public MyUser saveUser(MyUser user) {
		log.info("Saving new user {} to the database", user.getEmail());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepo.save(user);
	}

	@Override
	public Role saveRole(Role role) {
		log.info("Saving new role {} to the database", role.getName());
		return roleRepo.save(role);
	}

	@Override
	public void addRoleToUser(String email, String roleName) {
		log.info("Adding role {} to user {}	",roleName, email);
		MyUser user = userRepo.findByEmail(email);
		Role role = roleRepo.findByName(roleName);
		user.getRoles().add(role);
		
		
	}

	@Override
	public MyUser getUser(String email) {
		log.info("Fetching user {}", email);
		return userRepo.findByEmail(email);
	}

	@Override
	public List<MyUser> getUsers() {
		log.info("Fetching all users ");
		return userRepo.findAll();
	}



}
