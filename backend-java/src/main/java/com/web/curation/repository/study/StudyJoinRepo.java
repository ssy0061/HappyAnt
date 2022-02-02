package com.web.curation.repository.study;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.web.curation.model.study.StudyJoin;

@Repository
public interface StudyJoinRepo extends JpaRepository<StudyJoin, Long>, JpaSpecificationExecutor<StudyJoin>{
	List<StudyJoin> findByjoinMemberId(Long joinMemberId);
	List<StudyJoin> findByjoinStudyId(Long joinStudyId);
}
