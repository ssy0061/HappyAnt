package com.web.curation.repository.match;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.curation.model.match.MatchJoin;

@Repository
public interface MatchJoinRepo extends JpaRepository<MatchJoin, Long>{

}
