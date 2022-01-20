
package com.web.curation.dao.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.account.User;

public interface UserDao extends JpaRepository<User, String> {
    User getUserByEmail(String email);
    
    Optional<User> findUserByEmailAndPassword(String email, String password);

}
