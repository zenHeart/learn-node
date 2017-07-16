/**
 * Created by locke on 2017/3/1.
 */
var validator = require('validator');
var expect = require('chai').expect;



describe('测试 validator 函数库', function () {
    describe('测试 isInt 函数',function () {
        it('整形', function () {
            expect(validator.isInt(4+'', {
                min: 3,
                max: 5
            })).to.be.true;
        });
    });

describe("测试 isJson 函数",function() {
    it("传递非 json 数据",function() {
        expect(validator.isJSON('{fdf')).to.be.false;
    });
    it("传递 json 数据",function() {
        expect(validator.isJSON('{"df":12}')).to.be.true;
    });
});

describe("测试 isMACAddress 函数",function() {
    it("传递 mac",function() {
        expect(validator.isMACAddress('11:11:11:11:11:11')).to.be.true;
    });
    it("传递 mac 中包含非法字符",function() {
        expect(validator.isMACAddress('1111111t1111')).to.be.false;
    });
});

describe("测试 isVersion 函数",function() {
    var checkVersion = /^v(([0-9]|([1-9]+[0-9]))\.){2}([0-9]|([1-9]+[0-9]))$/;
    it("传递合法版本号",function() {
        expect(validator.matches('v10.1.1',checkVersion)).to.be.true;
    });
    it("首数字为 0 的版本号",function() {
        expect(validator.matches('v010.1.1',checkVersion)).to.be.false;
    });
    it("非法版本号",function() {
        expect(validator.matches('bv010.1.1',checkVersion)).to.be.false;
    });
});


});

