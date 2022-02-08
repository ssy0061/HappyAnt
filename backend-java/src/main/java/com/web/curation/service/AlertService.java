package com.web.curation.service;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.web.curation.dto.alert.AlertMessage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlertService {
    private final SimpMessageSendingOperations messagingTemplate;

    public void alertByMessage(AlertMessage message) {
        messagingTemplate.convertAndSend("/alert/" + message.getUserId(), message);
    }
}
