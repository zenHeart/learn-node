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

driver.findElement(By.xpath("//a[@id='result_logo']/img")).click();
driver.sleep(2000);
driver.findElement(By.id("kw")).clear();
driver.sleep(2000);

driver.findElement(By.id("kw")).sendKeys("test");
driver.sleep(2000);

driver.findElement(By.id("su")).click();
driver.sleep(2000);

driver.findElement(By.id("kw")).clear();
driver.sleep(2000);

driver.findElement(By.id("kw")).sendKeys("test");
driver.sleep(2000);


driver.quit();
