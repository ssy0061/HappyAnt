package com.web.curation.service;


import java.util.List;

import com.web.curation.model.account.Role;
import com.web.curation.model.account.MyUser;

public interface UserService {
	MyUser saveUser(MyUser user);
	Role saveRole(Role role);
	void addRoleToUser(String email, String roleName );
	MyUser getUser(String email);
	List<MyUser> getUsers();
}
