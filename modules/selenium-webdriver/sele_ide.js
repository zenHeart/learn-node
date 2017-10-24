var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var _ = require('underscore');
var VARS = {};

var globalTimeout = 60*1000;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.controlFlow().on('uncaughtException', function(err) {
    console.log('There was an uncaught exception: ' + err);
});

driver.get("https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=monline_dg&wd=selenium%20ide&oq=selenium&rsv_pq=92f7366d00016b9e&rsv_t=8332Cz2Hf6kNNI93zBizImAUBe0ifBpTA70SMOUGpnhbsEo97HYD4R5l8fCAqn0OxA&rqlang=cn&rsv_enter=1&rsv_sug3=5&rsv_sug1=5&rsv_sug7=100&rsv_sug2=0&inputT=2095&rsv_sug4=2773"); 
driver.findElement(By.id("kw")).clear(); 
driver.findElement(By.id("kw")).sendKeys("test"); 
driver.findElement(By.id("su")).click(); 
driver.findElement(By.xpath("//div[@id='s_tab']//a[.='新闻']")).click(); 

driver.quit();
