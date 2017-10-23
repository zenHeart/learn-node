var webdriver = require('selenium-webdriver'),
    By = webdriver.By, // html 选择器
    Browser = webdriver.Browser, //主流浏览器的宏定义
    until = webdriver.until; //工具包

//创建一个浏览器实例
var driver = new webdriver.Builder().forBrowser(Browser.CHROME).build(),
    window = driver.manage().window();

//设置窗口大小和位置
window.setPosition(0,0); //浏览器相对左上角距离为 0,0 px
window.setSize(500,500); //浏览器大小为 500.500 px


//获取百度页面内容
driver.get('http://www.baidu.com');
//进程休眠 5s,保持浏览器打开
driver.sleep(5000);
//关闭浏览器
driver.quit();
