package com.web.curation.specification;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.web.curation.model.study.StudyJoin;

public class StudyJoinSpec {
	
	public enum StudyJoinSearchKey {
		JOINMEMBER("joinMember"),
		JOINSTUDY("joinStudy");
		
		private final String value;
		
		StudyJoinSearchKey(String value) {
			this.value = value;
		}
		
		public String getValue() {
			return value;
		}
	}
	
	
	// 스터디에 유저가 있는지 확인
	public static Specification<StudyJoin> checkStudyJoin(Long joinMemberId, Long joinStudyId) {
		Map<StudyJoinSearchKey, Object> searchKeyword = toStudyJoinSearchKey(joinMemberId, joinStudyId);
	    return (Specification<StudyJoin>) ((root, query, builder) -> {
	        List<Predicate> predicate = getPredicateStudyJoin(searchKeyword, root, builder);
	        return builder.and(predicate.toArray(new Predicate[0]));
	    });
	}
	
	private static Map<StudyJoinSearchKey, Object> toStudyJoinSearchKey(Long joinMemberId, Long joinStudyId) {
    	Map<String, Object> searchKeyword = new HashMap<>();
    	searchKeyword.put("joinMember", joinMemberId);
    	searchKeyword.put("joinStudy", joinStudyId);
    	Map<StudyJoinSearchKey, Object> searchKeys = new HashMap<>();
    	for (String key : searchKeyword.keySet()) {
    		searchKeys.put(StudyJoinSearchKey.valueOf(key.toUpperCase()), searchKeyword.get(key));
    	}
    	return searchKeys;
	}
	
	private static List<Predicate> getPredicateStudyJoin(Map<StudyJoinSearchKey, Object> searchKeyword, Root<StudyJoin> root, CriteriaBuilder builder) {
	    List<Predicate> predicate = new ArrayList<>();
	    for (StudyJoinSearchKey key : searchKeyword.keySet()) {
	        switch (key) {
	            case JOINMEMBER:
	            case JOINSTUDY:
	            	predicate.add(builder.equal(root.get(key.getValue()), searchKeyword.get(key)));
	            	break;
	        }
	    }
	    return predicate;
	}
}
