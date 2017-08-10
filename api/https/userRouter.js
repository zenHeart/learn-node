/**
 * Created by lockepc on 2017/4/24.
 */
var express = require('express');
var routerUser = express.Router();
var routerInfo = require('./routerInfo');


routerUser.use('/name',routerInfo);
routerUser.use('/info',routerInfo);

module.exports = routerUser;