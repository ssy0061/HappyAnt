package com.web.curation.specification.match;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.web.curation.model.match.MatchArticle;



public class MatchArticleSpec {
	
	public enum SearchKey {
		TITLE("title"),
		CONTENT("content");
		
		private final String value;
		
		SearchKey(String value) {
			this.value = value;
		}
		
		public String getValue() {
			return value;
		}
	}
	
	// 제목만 검색하기
	public static Specification<MatchArticle> likeTitle(String title) {
		return new Specification<MatchArticle>() {
			@Override
			public Predicate toPredicate(Root<MatchArticle> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				return criteriaBuilder.like(root.get("title"), "%" + title + "%");
			}
		};
	}
	
	// 제목, 내용 동시 검색
	public static Specification<MatchArticle> searchWith(Map<SearchKey, Object> searchKeyword) {
	    return (Specification<MatchArticle>) ((root, query, builder) -> {
	        List<Predicate> predicate = getPredicateWithKeyword(searchKeyword, root, builder);
	        return builder.or(predicate.toArray(new Predicate[0]));
	    });
	}
	private static List<Predicate> getPredicateWithKeyword(Map<SearchKey, Object> searchKeyword, Root<MatchArticle> root, CriteriaBuilder builder) {
	    List<Predicate> predicate = new ArrayList<>();
	    for (SearchKey key : searchKeyword.keySet()) {
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
