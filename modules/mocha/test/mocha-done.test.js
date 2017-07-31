var {expect} = require('chai');

function asyncAdd(a,b,cb) {
    setTimeout(function () {
        if(typeof a === 'number' && typeof b === 'number') {
            cb(null,a+b);
        } else {
            cb(new Error('input must number!'));
        }
    },100);
}
describe('test done',function () {
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
               done(e);
           }
           expect(result).to.be.equal(3);
           done();
       });
   })
});