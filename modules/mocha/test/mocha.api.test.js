const {expect,assert,should} = require('chai');
const fs = require('fs');

describe('test done api',function () {
    function asyncAdd(a,b,cb) {
        setTimeout(function () {
            if(typeof a === 'number' && typeof b === 'number') {
                cb(null,a+b);
            } else {
                cb(new Error('input must number!'));
            }
        },100);
    }

    describe('test  done',function () {
        it('test direct done',function (done) {
            fs.stat('.',done);
        });
        it('test direct done error',function (done) {
            fs.stat('test/dirt-txt1',function (err) {
                if(err) {
                    done();
                }
            });
        })
        it('test done function',function (done) {
            asyncAdd(1,2,function (e,result) {
                if(e) {
                    done(e);
                }
                expect(result).to.be.equal(3);
                done();
            });
        });
        it('test done error',function (done) {
            asyncAdd(1,'2',function (e,result) {
                if(e) {
                    done();
                }
            });
        })
    });
});

describe('test generate',function () {
    function add() {
        return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
            return prev + curr;
        }, 0);
    }

    describe('add()', function() {
        var tests = [
            {args: [1, 2],       expected: 3},
            {args: [1, 2, 3],    expected: 6},
            {args: [1, 2, 3, 4], expected: 10}
        ];

        tests.forEach(function(test) {
            it('correctly adds ' + test.args.length + ' args', function() {
                var res = add.apply(null, test.args);
                assert.equal(res, test.expected);
            });
        });
    });
});

/*
describe('only test',function () {
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

});*/
