package com.web.curation.repository.alert;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.curation.model.alert.Alert;


@Repository
public interface AlertRepo extends JpaRepository<Alert, Long> {

}
