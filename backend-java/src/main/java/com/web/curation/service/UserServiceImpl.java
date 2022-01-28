//package com.web.curation.service;
//
//import java.util.List;
//
//import javax.transaction.Transactional;
//
//import org.springframework.stereotype.Service;
//
//import com.web.curation.model.account.Role;
//import com.web.curation.model.account.User;
//import com.web.curation.repository.account.Rolerepo;
//import com.web.curation.repository.account.UserRepo;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//@Slf4j
//public class UserServiceImpl implements UserService{
//
//	private final UserRepo userRepo;
//	private final Rolerepo roleRepo;
//	
//	@Override
//	public User saveUser(User user) {
//		log.info("Saving new user {} to the database", user.getEmail());
//		return userRepo.save(user);
//	}
//
//	@Override
//	public Role saveRole(Role role) {
//		log.info("Saving new role {} to the database", role.getName());
//		return roleRepo.save(role);
//	}
//
//	@Override
//	public void addRoleToUser(String email, String roleName) {
//		log.info("Adding role {} to user {}	",roleName, email);
//		User user = userRepo.findByEmail(email);
//		Role role = roleRepo.findByName(roleName);
//		user.getRoles().add(role);
//		
//	}
//
//	@Override
//	public User getUser(String email) {
//		log.info("Fetching user {}", email);
//		return userRepo.findByEmail(email);
//	}
//
//	@Override
//	public List<User> getUsers() {
//		log.info("Fetching all users ");
//		return userRepo.findAll();
//	}
//
//}
