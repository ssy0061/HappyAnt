package com.web.curation.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.user.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);


	
}