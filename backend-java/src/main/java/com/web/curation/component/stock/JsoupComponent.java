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

import com.web.curation.dto.stock.GetNewsResponse;
import com.web.curation.dto.stock.GetStockListResponse;
import com.web.curation.dto.stock.GetStockResponse;
import com.web.curation.dto.stock.GetSubNewsResponse;

@Component
public class JsoupComponent {


	public GetStockResponse getStockInfo(String code) {
		
		String Stock = "https://finance.naver.com/item/main.naver?code=" +code;
//		String Stock = "https://finance.naver.com/item/main.naver?code=005930";
		
		Connection conn = Jsoup.connect(Stock);
		try {
			Document document = conn.get();
			Elements element = document.select(".date");
			String[] str = element.text().split(" ");
			
			Elements curList = document.select(".new_totalinfo dl>dd");
			
			GetStockResponse stockInfo = new GetStockResponse();
			
			stockInfo.setCode(curList.get(2).text().split(" ")[1]);
			stockInfo.setStockName(curList.get(1).text().split(" ")[1]);			
			stockInfo.setCurPrice(curList.get(3).text().split(" ")[1]);
			stockInfo.setPriceType(curList.get(3).text().split(" ")[3]);
			stockInfo.setDiffAmount(curList.get(3).text().split(" ")[4]);
			stockInfo.setDayRange(curList.get(3).text().split(" ")[6]);
			stockInfo.setMarketPrice(curList.get(5).text().split(" ")[1]);
			stockInfo.setHighPrice(curList.get(6).text().split(" ")[1]);
			stockInfo.setLowPrice(curList.get(8).text().split(" ")[1]);
			stockInfo.setVolume(curList.get(10).text().split(" ")[1]);
			stockInfo.setTradingValue(curList.get(11).text().split(" ")[1]);			
			stockInfo.setTime(str[0]+" "+str[1]);
			
			stockInfo.setDayChartUrl("https://ssl.pstatic.net/imgfinance/chart/item/area/day/"+stockInfo.getCode()+".png");
			stockInfo.setWeekChartUrl("https://ssl.pstatic.net/imgfinance/chart/item/area/week/"+stockInfo.getCode()+".png");
			stockInfo.setMonth3ChartUrl("https://ssl.pstatic.net/imgfinance/chart/item/area/month3/"+stockInfo.getCode()+".png");
			stockInfo.setYearChartUrl("https://ssl.pstatic.net/imgfinance/chart/item/area/year/"+stockInfo.getCode()+".png");
			stockInfo.setYear3ChartUrl("https://ssl.pstatic.net/imgfinance/chart/item/area/year3/"+stockInfo.getCode()+".png");
			stockInfo.setYear5ChartUrl("https://ssl.pstatic.net/imgfinance/chart/item/area/year5/"+stockInfo.getCode()+".png");
			stockInfo.setYear10ChartUrl("https://ssl.pstatic.net/imgfinance/chart/item/area/year10/"+stockInfo.getCode()+".png");
		
			Elements element2 = document.select(".sub_section.news_section ul li span.txt");
			
			List<GetSubNewsResponse> list = new ArrayList<>();
			
			
			for(Element e : element2) {
				GetSubNewsResponse subNews = new GetSubNewsResponse();
				
				String url = "https://finance.naver.com/" + e.select("a").get(0).attr("href");
				System.out.println(url.toString());
				String articleSummary = e.select("a").get(0).text();
				System.out.println(articleSummary.toString());
				
				subNews.setUrl(url);
				subNews.setArticleSummary(articleSummary);
				list.add(subNews);
			}
						
			stockInfo.setNewsList(list);
			
			return stockInfo;
		} catch(IOException ignored) {			
		}		
		return null;
	}

	public List<GetNewsResponse> getNewsInfo() {
		
		String News = "https://finance.naver.com/news/mainnews.naver";
		
		Connection conn = Jsoup.connect(News);
		try {
			Document document = conn.get();
			return getNewsList(document);
		} catch(IOException ignored) {
			
		}
		
		return null;	
	}
	
	public List<GetNewsResponse> getNewsList(Document document){
		Elements Table = document.select("div#contentarea div.mainNewsList li.block1 dl");
		
		List<GetNewsResponse> list = new ArrayList<>();
		
		for(Element element : Table) {
			GetNewsResponse news = new GetNewsResponse();
			
			String url = "https://finance.naver.com/"+element.select("dt.thumb a").attr("href");
			news.setUrl(url);
			
			String img = element.select("dt.thumb img").attr("src");
			news.setImg(img);
			
			String articleSubject = element.select(".articleSubject").text();
			news.setArticleSubject(articleSubject);
			
			String articleSummary = element.select(".articleSummary").text();
			news.setArticleSummary(articleSummary);
			
			list.add(news);
		}
		
		return list;
		
	}
	
	
	
	public List<GetStockListResponse> getKospiStockList() {
		String KospiStockList = "https://finance.naver.com/sise/sise_market_sum.nhn?sosok=0&page=1";
		
	    Connection conn = Jsoup.connect(KospiStockList);
	    try {
	    	Document document = conn.get();
	    	return getStockList(document);
	    } catch (IOException ignored) {
	    }
	    return null;
	}
	
	public List<GetStockListResponse> getKosdaqStockList(){
		String KosdaqStockList = "https://finance.naver.com/sise/sise_market_sum.nhn?sosok=1&page=1";
		Connection conn = Jsoup.connect(KosdaqStockList);
	    try {
	    	Document document = conn.get();
	    	return getStockList(document);
	    } catch (IOException ignored) {
	    }
	    return null;
	}

	public List<GetStockListResponse> getStockList(Document document) {
	    Elements Table = document.select("table.type_2 tbody tr");
	    List<GetStockListResponse> list = new ArrayList<>();
		for (Element element : Table) {
		    if (element.attr("onmouseover").isEmpty()) {
		    	continue;
		    }
		    list.add(createStock(element.select("td")));
		}
		return list;
	}

	public GetStockListResponse createStock(Elements td) {
		GetStockListResponse Stock = new GetStockListResponse();
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
