package com.web.curation.repository.match;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.curation.model.match.Mat_Article;

@Repository
public interface Mat_ArticleRepository extends JpaRepository<Mat_Article, Long>{
	
}
