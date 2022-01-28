package com.web.curation.repository.account;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.account.User;

public interface UserRepo extends JpaRepository<User, Long> {

	User findByEmail(String email);


	
}