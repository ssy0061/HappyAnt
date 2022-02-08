package com.web.curation.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.web.curation.dto.alert.AlertMessage;

@Controller
public class AlertController {

    
	@MessageMapping("/{userId}")
	@SendTo("/alert/{userId}")
	public AlertMessage alertStudy(@DestinationVariable("userId") Long userId,
									String message, String alertGroup) throws Exception {
		Thread.sleep(100); // simulated delay
		return new AlertMessage(userId, message, alertGroup);
	}
}
