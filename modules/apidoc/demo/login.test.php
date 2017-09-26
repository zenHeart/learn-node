<?php
/**
 * @api {post} /api/new_interface/login.php login
 * @apiDescription 登录接口,处理用户登录验证逻辑
 *
 * @apiName login
 * @apiGroup user
 *
 * @apiParam (request) {String[10]} password 用户 密碼
 * @apiParam (request) {String[8]} msgId 8 位 16 进制字符串
 * @apiParam (request) {String[11]} phone 电话号码
 *
 * @apiExample {js} login
 *   $.ajax({
 *       method: "POST",
 *       url: "...",
 *       data: {
 *
 *    }
 *   }).done(function( msg ) {
 *       alert( "Data Saved: " + msg );
 *   }).fail(function( err ) {
 *       alert( "err: " + err );
 *   }).always(function(  ) {
 *       ...
 *   });
 *
 * @apiSuccess (success) {String} userId 密码
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "phone": "John",
 *       "password": "Doe"
 *     }
 *
 *
 * @apiUse badRequest
 */
