package com.web.curation.repository.study;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.curation.model.study.StudyComment;

@Repository
public interface StudyCommentRepo extends JpaRepository<StudyComment, Long>{

}
