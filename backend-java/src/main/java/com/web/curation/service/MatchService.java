package com.web.curation.service;

import java.util.ArrayList;
import java.util.List;

import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.web.curation.dto.match.MatchArticleRequest;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.MatchArticleRepo;
import com.web.curation.repository.match.MatchJoinRepo;

import io.swagger.annotations.ApiOperation;

@Service
public class MatchService {
	
	@Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결함
    private MatchArticleRepo articleRepo;
	@Autowired
    private UserRepo userRepo;
    @Autowired 
    private MatchJoinRepo joinRepo;
    
    public List<MatchArticle> getArticleList() {
    	return articleRepo.findAll();
    }
    
    public MatchArticle getArticle(Long articleId) {
    	return articleRepo.findById(articleId)
    			.orElseThrow(() -> new IllegalStateException(
    					"article with id " + articleId + " does not exist"));
    }
    
    public void addNewArticle(MatchArticleRequest articleForm) {
    	Long writerId = articleForm.getWriterId();
    	// 1. dto를 Entity로 변경
    	MatchArticle article = articleForm.toEntity();
    	User writer = userRepo.findById(writerId).get();
    	article.setWriter(writer);
//    	writer.getMatchArticles().add(article);
    	// 2. Repository를 이용하여 Entity를 DB에 저장함
    	articleRepo.save(article);
    }
    
    @Transactional // 변경된 데이터를 DB에 저장
    public void updateArticle(
    		Long articleId,
    		String title,
    		String category,
    		String content,
    		Boolean state) {
    	MatchArticle article = articleRepo.findById(articleId)
    			.orElseThrow(() -> new IllegalStateException(
    					"article with id " + articleId + " does not exist"));
    	
    	if (title != null && title.length() > 0 && !Objects.equals(article.getTitle(), title)) {
    		article.setTitle(title);
    	}
    	
    	if (category != null && category.length() > 0 && !Objects.equals(article.getCategory(), category)) {
    		article.setCategory(category);
    	}
    	
    	if (content != null && content.length() > 0 && !Objects.equals(article.getContent(), content)) {
    		article.setContent(content);
    	}
    	
    	if (state != null && !Objects.equals(article.getState(), state)) {
    		article.setState(state);
    	}
    }
    
    public void deleteArticle(Long articleId) {
    	articleRepo.deleteById(articleId);
    }
    
//    public List<MatchArticle> getJoinArticle(Long userId) {
//
//    }
    
    public void joinStudy(Long id, Long joinUserId, String content) {
    	MatchArticle article = articleRepo.findById(id).get();
    	User user = userRepo.findById(joinUserId).get();
    	
    	MatchJoin join = new MatchJoin();
    	join.setJoinArticle(article);
    	join.setJoinUser(user);
    	join.setContent(content);
    	
    	joinRepo.save(join);
    }
}
