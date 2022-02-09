package com.web.curation.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.dto.stock.Stock;
import com.web.curation.model.BasicResponse;
import com.web.curation.service.StockService;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
@RequestMapping(value = "/stock")
@RequiredArgsConstructor
public class StockController {

	private final StockService stockService;
	
	@GetMapping("/kospi")
	public ResponseEntity<List<Stock>> getKospiStockList(HttpServletRequest request) {
		return new ResponseEntity<List<Stock>> (stockService.getKospiStockList(), HttpStatus.OK);
	
	}
	
	@GetMapping("/kosdaq")
	public ResponseEntity<List<Stock>> getKosdaqStockList(HttpServletRequest request){
		return new ResponseEntity<List<Stock>> (stockService.getKosdaqStockList(), HttpStatus.OK);
	}
}