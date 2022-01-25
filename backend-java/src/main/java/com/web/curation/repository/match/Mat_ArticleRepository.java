package com.web.curation.repository.match;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.curation.model.account.User;
import com.web.curation.model.match.Mat_Article;

@Repository
public interface Mat_ArticleRepository extends JpaRepository<Mat_Article, Long>{
	
	List<Mat_Article> findByWriterId(User writer);
}
