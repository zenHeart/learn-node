var  test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver'),
    Selector = webdriver.By, //选择器类
    Key = webdriver.Key,
    Browser = webdriver.Browser;

var APP_URL = 'http://evcharger:8080/webapp/#/';
var INIT_POS = {
    x:0,//相对屏幕左上角横纵坐标值
    y:0
};



var DEVICE_SIZE = {
    IPHONE6:{
        w:375,
        h:667
    }
};

//涉及的选择元素
var ELE = {
    MODEL_BUTTON:'.modal__dialog-confirm a', //模态框确认按钮
    LOGIN_NAME:'input[name="username"]', //登录用户名输入框
    LOGIN_PASSWORD:'input[name="password"]', //定位模态框按钮
    LOGIN_BTN:'.btn_login__button', //登录按钮
};

var INPUT = {
    LOGIN:{
        INVALID:{
            input:{
                phone:15871556575,
                password:'sdf'
            }
        }
    }
};



test.describe('测试输入验证密码错误界面',function () {
    //用户名密码错误
    test.it('user login',function () {

        var driver = new webdriver.Builder().forBrowser(Browser.FIREFOX).build();
        driver.manage().window().setPosition(INIT_POS.x,INIT_POS.y);
        driver.manage().window().setSize(DEVICE_SIZE.IPHONE6.w,DEVICE_SIZE.IPHONE6.h);
        driver.get(APP_URL);
        driver.findElement(Selector.css(ELE.MODEL_BUTTON)).sendKeys(Key.ENTER);
        driver.findElement(Selector.css(ELE.LOGIN_NAME)).sendKeys(INPUT.LOGIN.INVALID.input.phone);
        driver.findElement(Selector.css(ELE.LOGIN_PASSWORD)).sendKeys(INPUT.LOGIN.INVALID.input.password);
        driver.findElement(Selector.css(ELE.LOGIN_BTN)).sendKeys(Key.ENTER);
        driver.findElement(Selector.css(ELE.LOGIN_BTN)).sendKeys(Key.ENTER);
    })
});

