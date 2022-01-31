package com.web.curation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.service.StudyService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController // Json 형태로 객체 데이터를 반환
@RequestMapping("study")
public class StudyController {
	
	@Autowired
    private StudyService studyService;
	
	@PostMapping
	@ApiOperation(value = "스터디 생성")
	public void AddNewStudy(@RequestParam(required = true) Long leaderId,
							@RequestParam(required = true) Long joinUserId) {
		studyService.addNewStudy(leaderId, joinUserId);
	}
	
	
}