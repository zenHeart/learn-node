/**
 * Created by locke on 2017/3/24.
 */
var chargerOta = require('../../tool/ota');
var expect = require('chai').expect;



describe('测试 chargerOta 函数库', function () {
    var testName =  {
        valid:'WPI-EVCharger_K64F_20161011_V1.0.2.bin',
        valid2:'WPI-V0.0.2.bin',
        noWPI:'WPQ-EVCharger_K64F_20161011_V0.0.2.bin',
        extename:'WPQ-EVCharger_K64F_20161011_V0.0.2.sql',
        noVersion:'WPQ-EVCharger_K64F_20161011_V0.0.02.bin',
        empty:'',
    };
    describe('测试 checkFileName 函数', function () {
        it('合法文件名', function () {
            expect(chargerOta.checkFileName(testName.valid)).to.be.true;
        });
        it('合法文件名 2', function () {
            expect(chargerOta.checkFileName(testName.valid2)).to.be.true;
        });

        it('首部不是 WPI', function () {
            expect(chargerOta.checkFileName(testName.noWPI)).to.be.false;
        });
        it('尾部不是 bin', function () {
            expect(chargerOta.checkFileName(testName.extename)).to.be.false;
        });

        it('版本号非法', function () {
            expect(chargerOta.checkFileName(testName.noVersion)).to.be.false;
        });

        it('输入为空', function () {
            expect(chargerOta.checkFileName(testName.empty)).to.be.false;
        });

    });
});

chargerOta.checkFileName('WPI-EVCharger_K64F_20161011_V0.0.002')
/*chargerOta.saveVersion('12','12.bin',function (err,data) {
    if(err) {
        console.log(err);
    }else{
        console.log(data);
    }

});*/
