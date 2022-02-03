package com.web.curation.specification;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.web.curation.model.study.StudyArticle;
import com.web.curation.specification.StudyArticleSpec.StudyArticleSearchKey;

public class StudyArticleSpec {
	public enum StudyArticleSearchKey {
		TITLE("title"),
		CONTENT("content");
		
		private final String value;
		
		StudyArticleSearchKey(String value) {
			this.value = value;
		}
		
		public String getValue() {
			return value;
		}
	}
	
	// 제목만 검색하기
	public static Specification<StudyArticle> likeTitle(String title) {
		return new Specification<StudyArticle>() {
			@Override
			public Predicate toPredicate(Root<StudyArticle> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.like(root.get("title"), "%" + title + "%");
			}
		};
	}
	
	// 제목, 내용 동시 검색
	public static Specification<StudyArticle> searchWith(String keyword) {
		Map<StudyArticleSearchKey, Object> searchKeyword = toStudyArticleSearchKey(keyword);
	    return (Specification<StudyArticle>) ((root, query, builder) -> {
	        List<Predicate> predicate = getPredicateStudyArticle(searchKeyword, root, builder);
	        return builder.or(predicate.toArray(new Predicate[0]));
	    });
	}
	private static Map<StudyArticleSearchKey, Object> toStudyArticleSearchKey(String keyword) {
    	Map<String, Object> searchKeyword = new HashMap<>();
    	searchKeyword.put("title", keyword);
    	searchKeyword.put("content", keyword);
    	Map<StudyArticleSearchKey, Object> searchKeys = new HashMap<>();
    	for (String key : searchKeyword.keySet()) {
    		searchKeys.put(StudyArticleSearchKey.valueOf(key.toUpperCase()), searchKeyword.get(key));
    	}
    	return searchKeys;
	}
	private static List<Predicate> getPredicateStudyArticle(Map<StudyArticleSearchKey, Object> searchKeyword, Root<StudyArticle> root, CriteriaBuilder builder) {
	    List<Predicate> predicate = new ArrayList<>();
	    for (StudyArticleSearchKey key : searchKeyword.keySet()) {
	        switch (key) {
	            case TITLE:
	            case CONTENT:
	            	predicate.add(builder.like(root.get(key.getValue()), "%" + searchKeyword.get(key) + "%"));
	            	break;
	        }
	    }
	    return predicate;
	}
}
