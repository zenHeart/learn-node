const path = require('path');
const webpack =  require('webpack') ;

const compiler = webpack({
        context: __dirname, //设定基础路径为 context
        entry: __dirname+ "/index.js", //设定主文件
        output: {
            path: path.resolve(__dirname), //输出到当前目录
            filename:"bundle.js"
        },
        resolveLoader: {
            modules: [
                'node_modules',
                 __dirname,
            ]
        },
        module: {
            rules: [{
                test: /\.txt$/, //解析 txt 文件
                use: [
                    'loader_a',
                    'loader_b',
                ]
            }]
        }
    });


compiler.run((err, stats) => {
    if (err || stats.hasErrors()) console.log(err);

    console.log(stats.toJson().modules[0].source);
});