/**
 * Created by lockepc on 2017/4/24.
 */
var express = require('express');
var routerInfo = express.Router();

routerInfo.get('/locke',function (req,res) {
    res.json({name:'locke'})

});
routerInfo.use('/tom',function (req,res) {
    res.json({name:'tom'})

});

module.exports = routerInfo;