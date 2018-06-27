const webpack = require('webpack')
const path = require('path');

compiler = webpack({
    entry:path.join(__dirname,"index.js"),
    output:{
        path:path.join(__dirname,"../dist")
    }
})


compiler.watch({},(err,status) => {
    console.log(status);
})