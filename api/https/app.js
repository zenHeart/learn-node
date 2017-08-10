/**
 * Created by lockepc on 2017/4/28.
 */
var https = require('https')
    ,fs = require("fs"),
    app = require('express')();
var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};
https.createServer(options, app).listen(8080, function () {
    console.log('Https server listening on port ' + 8080);
});

app.get('/',function (req,res) {
    res.json('hello');
});

