package com.web.curation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.web.curation.component.stock.JsoupComponent;
import com.web.curation.dto.stock.Stock;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StockService {

  private final JsoupComponent jsoupComponent;

  public List<Stock> getKospiStockList() {
	  return jsoupComponent.getKospiStockList();
  }
  
  public List<Stock> getKosdaqStockList(){
	  return jsoupComponent.getKosdaqStockList();
  }
  
  
}
