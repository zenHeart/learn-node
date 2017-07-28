/**
 * Created by locke on 2017/3/1.
 */
var inputParser = require('../../tool/validator');
var expect = require('chai').expect;

describe("测试 inputParser 模块 ", function () {
    describe("test _checkNumber", function () {
        it("test checkNumber is true", function () {
            expect(inputParser._checkNumber(4, null)).to.be.true;
        });
        it("test checkNumber 不满足条件", function () {
            expect(inputParser._checkNumber(4, {min: 5, max: 7})).to.be.false;
        });
        it("test checkNumber 非数字", function () {
            try {
                inputParser._checkNumber('4');
            }
            catch (e) {
                expect(e.errInfo).to.deep.equal([4, 'bad request']);
            }
        });
    });

    describe("test deviceInputCheck", function () {

        var testData = {
            invalidJson: 4,
            invalidInterface: {'df': 12},
            invalidCommand: {'respType': 'df'},
            invalidMsgId: {
                "respType": "setChargingStart",
                "data": {
                    "respCode": 100,
                    "msgId": "1111d1111"
                }
            },
            invalidRespCode: {
                "respType": "setChargingStart",
                "data": {
                    "respCode": 'df',
                    "msgId": "11111111"
                }
            },
            invalidReduTerm: {
                "respType": "setChargingStart",
                "data": {
                    "respCode": 12,
                    "msgId": "11111111",
                    "redundantTerm": 12
                }
            },
            invalidLackTerm: {
                "respType": "setChargingStart",
                "data": {
                    "respCode": 12,
                }
            },
            validCommand: {
                "respType": "setChargingStart",
                "data": {
                    "respCode": 100,
                    "msgId": "11111111"
                }
            }
        };

        it("输入非 json 格式", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.invalidJson), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }

            });
        });
        it("输入 json 不符合接口约定", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.invalidCommand), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }

            });
        });
        it("输入 json 为不存在命令", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.invalidInterface), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }
            });
        });
        it("输入 json msgId 非法", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.invalidMsgId), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }
            });
        });
        it("输入 json respCode 非法", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.invalidRespCode), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }
            });
        });
        it("输入 json 包含多余项", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.invalidReduTerm), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }
            });
        });
        it("输入 json 缺少 msgId", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.invalidLackTerm), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }
            });
        });
        it("输入 json 格式合法", function (done) {
            inputParser.deviceInputCheck(JSON.stringify(testData.validCommand), function (err, result) {
                if (err) done(err);
                else {
                    console.log(result);
                }
                /*{ respCode: 100,
                 msgId: '11111111',
                 deviceCmdName: 'setChargingStart',
                 commandType: 'notify' }*/
            });
        });
    });
});

