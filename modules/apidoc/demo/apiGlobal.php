<?php
/**
 * @apiDefine  badRequest  haha
 * 服务器内部执行错误返回,请求错误
 *
 * @apiError (error) {Int} errCode  错误状态码
 * @apiError (error) {string} errMsg  错误消息
 * @apiError (error) {String[8]} msgId 错误消息 id
 * @apiError (error) {String} command 消息名称

 * @apiErrorExample {json} BAD_REQUEST:
 *     {
 *       "errCode": 12
 *       "errMsg": "非法请求"
 *       "msgId": "1111111"
 *       "command": "test"
 *     }
 *
 * @apiErrorExample {json} invalid:
 *     {
 *       "errCode": 14,
 *       "errMsg": "非法请求",
 *       "msgId": "1111111"
 *     }
 */

