package com.web.curation.repository.match;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;

@Repository
public interface MatchArticleRepo extends JpaRepository<MatchArticle, Long>{
	
	List<MatchArticle> findByWriterId(User writer);
}
