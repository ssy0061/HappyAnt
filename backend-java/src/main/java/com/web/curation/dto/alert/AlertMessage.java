package com.web.curation.dto.alert;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlertMessage {
	private Long userId;
	private String message;
	private String alertGroup;
}
