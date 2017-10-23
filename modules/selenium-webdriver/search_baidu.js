var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Key = webdriver.Key;

var dr = new webdriver.Builder().forBrowser('chrome').build();

dr.get('http://www.baidu.com');
//dr.findElement(By.id('kw')).sendKeys('selenium');
//dr.findElement(By.id('kw')).sendKeys(Key.RETURN);

// console.log('qiut dirver');


//dr.quit();