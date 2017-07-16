title:email    
tag:email      
birth:2017-04-19      
modified:2017-04-19      
---

email
===
**前言:使用 node-mialer 进行邮件发送**

---

## mailer 快速入门
1. 在邮箱设置中开启 `POP3/IMAP` 服务 (建议新建一个邮箱来实现传送服务)
2. 安装邮箱模块

```
npm install --save nodemialer 
```

3. 简历 `mailTest` 文件

```js
'use strict';
var sysConst = require('../../config/sys.conf');
var user = sysConst.SMTP.auth.user;
var chargerLog = require('../../models/common/charger_log');
const nodeMailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodeMailer.createTransport(sysConst.SMTP);

// setup email data with unicode symbols
let mailOptions = {
    from: `${user}`, // sender address
    to: sysConst.MAIL_USER,
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'

};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return chargerLog.error('MODULE_MAIL send mail fail : ', error.message, error.stack);
    }
    chargerLog.debug('MODULE_MAIL Message sent to %s success', sysConst.MAIL_USER, info);
});

 
```

## 使用中遇到的错误

**554 DT:SPM**

查看网易邮箱的发送规定 [163 rule](http://help.163.com/09/1224/17/5RAJ4LMH00753VB8.html)
