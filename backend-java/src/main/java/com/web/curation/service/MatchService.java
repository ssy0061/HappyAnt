package com.web.curation.service;

import java.util.List;

import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.dto.match.Mat_ArticleForm;
import com.web.curation.model.account.User;
import com.web.curation.model.match.Mat_Article;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.Mat_ArticleRepository;

@Service
public class MatchService {
	
    private final Mat_ArticleRepository articleRepository;
    private final UserRepo userRepository;
    
    @Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결함
	public MatchService(Mat_ArticleRepository articleRepository,
			UserRepo userRepository) {
    	this.articleRepository = articleRepository;
    	this.userRepository = userRepository;
    }
    
//    public List<Mat_Article> getArticle() {
//    	List<Mat_Article> articles = new ArrayList<>();
//    	articleRepository.findAll().forEach(article -> articles.add(article.toEntity()));
//    	return articles;
//    }
    
    
    public List<Mat_Article> getArticleList() {
    	return articleRepository.findAll();
    }
    
    public Mat_Article getArticle(Long articleId) {
    	return articleRepository.findById(articleId)
    			.orElseThrow(() -> new IllegalStateException(
    					"article with id " + articleId + " does not exist"));
    }
    
    public void addNewArticle(Mat_ArticleForm articleForm) {
    	Long writer_id = articleForm.getWriter_id();
    	// 1. dto를 Entity로 변경
    	Mat_Article article = articleForm.toEntity();
    	User writer = userRepository.findById(writer_id).get();
    	article.setWriter(writer);
    	writer.getMat_articles().add(article);
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
    	Mat_Article article = articleRepository.findById(articleId)
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
