var webdriver = require('selenium-webdriver'),
    Selector = webdriver.By, //选择器类
    Key = webdriver.Key,
    Browser = webdriver.Browser,
    driver = new webdriver.Builder().forBrowser(Browser.CHROME).build(),
    action = driver.actions(),

    window = driver.manage().window();

window.setPosition(0,0);
window.setSize(500,500);

driver.get('https://www.baidu.com/');

var ELE = {
    SEARCH_BOX:'#kw', //百度输入框
    RETURN_LOG:'#result_logo' //百度返回主页框
} ;

var searchBox  = driver.findElement(Selector.css(ELE.SEARCH_BOX)); //选择百度搜索框

searchBox. //选择搜索框
sendKeys('test');//输入测试字样

//执行如下活动
searchBox.sendKeys(Key.chord(Key.COMMAND,"t"));

driver.sleep(5000); //延迟 5s


// driver.quit();

