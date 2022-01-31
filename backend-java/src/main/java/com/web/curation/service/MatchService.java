package com.web.curation.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import com.web.curation.dto.match.MatchArticleRequest;
import com.web.curation.dto.match.MatchArticleResponse;
import com.web.curation.dto.match.MatchJoinUserResponse;
import com.web.curation.model.account.User;
import com.web.curation.model.match.MatchArticle;
import com.web.curation.model.match.MatchJoin;
import com.web.curation.repository.account.UserRepo;
import com.web.curation.repository.match.MatchArticleRepo;
import com.web.curation.repository.match.MatchJoinRepo;
import com.web.curation.specification.match.MatchArticleSpec;
import com.web.curation.specification.match.MatchArticleSpec.SearchKey;

import io.swagger.annotations.ApiOperation;

@Service
public class MatchService {
	
	@Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결함
    private MatchArticleRepo articleRepo;
	@Autowired
    private UserRepo userRepo;
    @Autowired 
    private MatchJoinRepo joinRepo;
    
    public List<MatchArticleResponse> getArticleList() {
    	List<MatchArticleResponse> articleList = new ArrayList<>();
    	
    	articleRepo.findAll().forEach(article -> {
    		MatchArticleResponse response = article.toResponse();
    		articleList.add(response);
    	});
    	return articleList;
    }
    
    public MatchArticleResponse getArticle(Long articleId) {
    	MatchArticle article = articleRepo.findById(articleId)
    			.orElseThrow(() -> new IllegalStateException(
    					"article with id " + articleId + " does not exist"));
    	MatchArticleResponse response = article.toResponse();
    	return response;
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
    
    
    // 검색 키워드 하나로 제목 & 내용 검색하기
    public List<MatchArticleResponse> searchArticle(String keyWord) {
    	Map<String, Object> searchKeyword = new HashMap<>();
    	searchKeyword.put("title", keyWord);
    	searchKeyword.put("content", keyWord);
    	Map<SearchKey, Object> searchKeys = new HashMap<>();
    	for (String key : searchKeyword.keySet()) {
    		searchKeys.put(SearchKey.valueOf(key.toUpperCase()), searchKeyword.get(key));
    	}
    	List<MatchArticleResponse> articleList = new ArrayList<>();
    	if (searchKeys.isEmpty()) {
    		articleRepo.findAll().forEach(article -> {
				MatchArticleResponse response = article.toResponse();
	    		articleList.add(response);
			});
    	} else {
    		articleRepo.findAll(MatchArticleSpec.searchWith(searchKeys)).forEach(article -> {
    			MatchArticleResponse response = article.toResponse();
	    		articleList.add(response);
    		});
    	}
//    	List<MatchArticle> articleList = new ArrayList<>();
//    	// 빈값을 입력하면 전체 조회로 하려고 했으나 실패함
//    	if (searchKeys.isEmpty()) {
//    		articleList = articleRepo.findAll();
//   
//    	} else {
//    		articleList = articleRepo.findAll(MatchArticleSpec.searchWith(searchKeys));
//    	}
    	// MatchArticleResponse 객체로 바꾸려고 했으나 에러발생함
    	return articleList;
    }
    
    public void joinStudy(Long id, Long joinUserId, String content) {
    	MatchArticle article = articleRepo.findById(id).get();
    	if (article.getWriter().getId() == joinUserId) {
    		throw new ResponseStatusException(
    				HttpStatus.BAD_REQUEST,
    				"작성한 모집글에 신청할 수 없습니다.",
    				new IllegalArgumentException());
    	} else {
    		User user = userRepo.findById(joinUserId).get();
        	
        	MatchJoin join = new MatchJoin();
        	join.setJoinArticle(article);
        	join.setJoinUser(user);
        	join.setContent(content);
        	
        	joinRepo.save(join);
    	}
    }
    
    public List<MatchArticleResponse> getJoinArticle(Long userId) {
    	List<MatchArticleResponse> response = new ArrayList<>();
    	joinRepo.findByJoinUserId(userId).forEach(join -> {
    		response.add(join.getJoinArticle().toResponse());
    	});
    	return response;
    }
    
    public List<MatchJoinUserResponse> getJoinUser(Long articleId) {
    	List<MatchJoinUserResponse> response = new ArrayList<>();
    	joinRepo.findByJoinArticleId(articleId).forEach(join -> {
    		response.add(join.toJoinUserResponse());
    	});
    	return response;
    }
}
