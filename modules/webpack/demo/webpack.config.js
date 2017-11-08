/**
 * Created by lockepc on 2017/7/5.
 */
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },{
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },{
                test:/\.xml$/,
                use:[
                    'xml-loader'
                ]
            },{
                test:/\.json$/,
                use:[
                    'json-loader'
                ]
            }
        ]
    }
};
