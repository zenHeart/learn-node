const {expect} = require('chai');

describe('only test',function () {
    describe.only('test only describe',function () {
        it.only('test it only',function () {
            expect(3).to.be.equal(3);
        });
        it('test it without only',function () {
            expect(3).to.be.equal(3);
        });
    });

    describe('has only test in describe',function () {
        it.only('test it only',function () {
            expect(3).to.be.equal(3);
        });
        it('test it without only',function () {
            expect(3).to.be.equal(3);
        });
    });


    describe('without only test  in describe',function () {
        it('test it only',function () {
            expect(3).to.be.equal(3);
        });
        it('test it without only',function () {
            expect(3).to.be.equal(3);
        });
    });
});
