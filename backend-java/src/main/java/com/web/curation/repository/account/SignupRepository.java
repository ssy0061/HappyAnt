package com.web.curation.repository.account;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.account.User;

public interface SignupRepository extends JpaRepository<User, Long>{

}
