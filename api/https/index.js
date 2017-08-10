var express = require('express');
var app = express();
var routerUser = require('./userRouter');


app.listen(4000,function(){
    console.log('listen on 4000');
});

app.use('/user',routerUser);

