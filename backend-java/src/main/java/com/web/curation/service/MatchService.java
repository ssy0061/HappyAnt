package com.web.curation.service;

import java.util.List;

import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.dto.match.MatchArticleForm;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.MatchArticleRepository;

@Service
public class MatchService {
	
    private final MatchArticleRepository articleRepository;
    private final UserRepo userRepository;
    
    @Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결함
	public MatchService(MatchArticleRepository articleRepository,
			UserRepo userRepository) {
    	this.articleRepository = articleRepository;
    	this.userRepository = userRepository;
    }
    
//    public List<Mat_Article> getArticle() {
//    	List<Mat_Article> articles = new ArrayList<>();
//    	articleRepository.findAll().forEach(article -> articles.add(article.toEntity()));
//    	return articles;
//    }
    
    
    public List<MatchArticle> getArticleList() {
    	return articleRepository.findAll();
    }
    
    public MatchArticle getArticle(Long articleId) {
    	return articleRepository.findById(articleId)
    			.orElseThrow(() -> new IllegalStateException(
    					"article with id " + articleId + " does not exist"));
    }
    
    public void addNewArticle(MatchArticleForm articleForm) {
    	Long writerId = articleForm.getWriterId();
    	// 1. dto를 Entity로 변경
    	MatchArticle article = articleForm.toEntity();
    	User writer = userRepository.findById(writerId).get();
    	article.setWriter(writer);
    	// 2. Repository를 이용하여 Entity를 DB에 저장함
    	articleRepository.save(article);
    }
    
    @Transactional // 변경된 데이터를 DB에 저장
    public void updateArticle(
    		Long articleId,
    		String title,
    		String category,
    		String content,
    		Boolean state) {
    	MatchArticle article = articleRepository.findById(articleId)
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
    	articleRepository.deleteById(articleId);
    }
}
