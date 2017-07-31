var {expect} = require('chai');
describe('test done',function () {
    it('test direct done',function (done) {
        fs.stat('test/dirt-txt',done);
    });
    it('test direct done error',function (done) {
        fs.stat('test/dirt-txt1',done);
    })
});

