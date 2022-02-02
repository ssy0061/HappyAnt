 package com.web.curation.repository.match;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.web.curation.model.match.MatchJoin;

@Repository
public interface MatchJoinRepo extends JpaRepository<MatchJoin, Long>, JpaSpecificationExecutor<MatchJoin>{
	List<MatchJoin> findByJoinUserId(Long joinUserId);
	List<MatchJoin> findByJoinArticleId(Long joinArticleId);
}
