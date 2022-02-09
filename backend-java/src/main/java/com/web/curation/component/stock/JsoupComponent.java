package com.web.curation.component.stock;

import java.io.IOException;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.web.curation.dto.stock.Stock;

@Component
public class JsoupComponent {

	public List<Stock> getKospiStockList() {
		String KospiStockList = "https://finance.naver.com/sise/sise_market_sum.nhn?sosok=0&page=1";
		
	    Connection conn = Jsoup.connect(KospiStockList);
	    try {
	      Document document = conn.get();
	      return getStockList(document);
	    } catch (IOException ignored) {
	    }
	    return null;
	}
	
	public List<Stock> getKosdaqStockList(){
		String KosdaqStockList = "https://finance.naver.com/sise/sise_market_sum.nhn?sosok=1&page=1";
		Connection conn = Jsoup.connect(KosdaqStockList);
	    try {
	      Document document = conn.get();
	      return getStockList(document);
	    } catch (IOException ignored) {
	    }
	    return null;
	}

	public List<Stock> getStockList(Document document) {
	    Elements Table = document.select("table.type_2 tbody tr");
	    List<Stock> list = new ArrayList<>();
	for (Element element : Table) {
	    if (element.attr("onmouseover").isEmpty()) {
	    	continue;
	    }
	    list.add(createStock(element.select("td")));
	}
	    return list;
	}

	public Stock createStock(Elements td) {
		Stock Stock = new Stock();
	    Class<?> stockClass = Stock.getClass();
	    Field[] fields = stockClass.getDeclaredFields();

	    for (int i = 0; i < td.size(); i++) {
	    	String text;
	    	if(td.get(i).select(".center a").attr("href").isEmpty()){
	        text = td.get(i).text();
	    	}else{
	    		text = "https://finance.naver.com" + td.get(i).select(".center a").attr("href");
	    	}
	    	
		    fields[i].setAccessible(true);
		    try{
		        fields[i].set(Stock,text);
		    }catch (Exception ignored){
		    }
		}
		return Stock;
	}
}
