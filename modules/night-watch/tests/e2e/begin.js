module.exports = {
    'Demo test baidu' : function (browser) {
        browser
            .url('http://www.baidu.com')
            .waitForElementVisible('body', 10000)
            .setValue('#kw', 'nightwatch')
            .waitForElementVisible('button[name=btnG]', 1000)
            .click('button[name=btnG]')
            .pause(1000)
            .assert.containsText('#main', 'Night Watch')
            .end();
    }
};