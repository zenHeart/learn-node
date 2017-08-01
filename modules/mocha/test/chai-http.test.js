//todo 添加所有 assert 断言库函数
//测试整个 chai 断言库
const chai = require('chai'),chaiHttp = require('chai-http');
const {expect,should,assert} = chai;
const express = require('express');
const app = express();
const PORT = 3000;

chai.use(chaiHttp);
app.listen(PORT);
app.get('/',function (req,res) {
    res.send('hello world');
});
should();

describe('test chai-http', function() {
    describe('test express app)', function() {
        it('直接获取 express 对象', function(done) {
            chai.request(app).get('/').end(
                function (err,res) {
                    res.text.should.equal('hello world');
                    done();
                }
            )
        });
    });
});
