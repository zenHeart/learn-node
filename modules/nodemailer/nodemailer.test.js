/**
 *
 * Created by lockepc on 2017/4/19.
 */

'use strict';
var sysConst = require('../../config/sys.conf');
var user = sysConst.SMTP.auth.user;
var chargerLog = require('../../tool/log');
const nodeMailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodeMailer.createTransport(sysConst.SMTP);

// setup ema
// il data with unicode symbols
var mailOptions = {
    from: `${user}`, // sender address
    to: sysConst.MAIL_USER,
    subject: '设备服务器运行状态',
    text: '发生新错误',
    html: '<p>new error occur</p>',
    attachments: [
        {   // utf-8 string as an attachment
            path: '../../log/charger.log'
        },
        {   // utf-8 string as an attachment
            path: '../../log/exception.log'
        },{   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        },]
};


exports.sendEmail = function (subject,content) {
    mailOptions.subject = subject;
    mailOptions.html = content;

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return chargerLog.error('MODULE_MAIL send mail to %s fail : %s',sysConst.MAIL_USER, error.message, error.stack);
        }
        chargerLog.debug('MODULE_MAIL Message sent to %s success', sysConst.MAIL_USER, info);
    });

};

exports.sendEmail('设备服务器运行状态','<p>发生新错误</p>');
chargerLog.debug('邮件发送中...');
