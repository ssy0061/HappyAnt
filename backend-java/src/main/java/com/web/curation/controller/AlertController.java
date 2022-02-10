package com.web.curation.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.HtmlUtils;


import com.web.curation.dto.alert.AlertMessage;
import com.web.curation.dto.alert.AlertRequest;

@Controller
public class AlertController {

	@MessageMapping("/{userId}")
	@SendTo("/alert/{userId}")
	public AlertMessage alertStudy(@DestinationVariable("userId") Long userId, AlertRequest message) {
		System.out.println(userId);
		System.out.println(message.getContent());
		return new AlertMessage(message.getAlertId(), userId, message.getContent());
	}
}
