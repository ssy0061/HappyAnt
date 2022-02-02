package com.web.curation.specification;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.web.curation.model.match.MatchJoin;
import com.web.curation.specification.MatchJoinSpec.MatchJoinSearchKey;

public class MatchJoinSpec {
	
	public enum MatchJoinSearchKey {
		JOINUSER("joinUser"),
		JOINARTICLE("joinArticle");
		
		private final String value;
		
		MatchJoinSearchKey(String value) {
			this.value = value;
		}
		
		public String getValue() {
			return value;
		}
	}
	
	
	// 모집게시글에 유저가 신청했는지 확인
	public static Specification<MatchJoin> checkMatchJoin(Long joinUserId, Long joinArticleId) {
		Map<MatchJoinSearchKey, Object> searchKeyword = toMatchJoinSearchKey(joinUserId, joinArticleId);
	    return (Specification<MatchJoin>) ((root, query, builder) -> {
	        List<Predicate> predicate = getPredicateMatchJoin(searchKeyword, root, builder);
	        return builder.and(predicate.toArray(new Predicate[0]));
	    });
	}
	
	private static Map<MatchJoinSearchKey, Object> toMatchJoinSearchKey(Long joinUserId, Long joinArticleId) {
    	Map<String, Object> searchKeyword = new HashMap<>();
    	searchKeyword.put("joinUser", joinUserId);
    	searchKeyword.put("joinArticle", joinArticleId);
    	Map<MatchJoinSearchKey, Object> searchKeys = new HashMap<>();
    	for (String key : searchKeyword.keySet()) {
    		searchKeys.put(MatchJoinSearchKey.valueOf(key.toUpperCase()), searchKeyword.get(key));
    	}
    	return searchKeys;
	}
	
	private static List<Predicate> getPredicateMatchJoin(Map<MatchJoinSearchKey, Object> searchKeyword, Root<MatchJoin> root, CriteriaBuilder builder) {
	    List<Predicate> predicate = new ArrayList<>();
	    for (MatchJoinSearchKey key : searchKeyword.keySet()) {
	        switch (key) {
	            case JOINUSER:
	            case JOINARTICLE:
	            	predicate.add(builder.equal(root.get(key.getValue()), searchKeyword.get(key)));
	            	break;
	        }
	    }
	    return predicate;
	}
}
