package com.web.curation.service;

import com.web.curation.model.account.User;

public interface AccountService {
	
	public User login(User user) throws Exception;
	public User userInfo(String userid) throws Exception;
	public boolean join(User user);
	public boolean updateUser(User user);
	public boolean deleteUser(String userid);

}
