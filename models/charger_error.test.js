var ChargerError = require('../../tool/charger_error');
var sysConst = require('../../config/sys.conf');
var expect = require('chai').expect;

describe('test constructor ChargerError',function () {
   it('test respond code 4',function () {
       try{
           throw new ChargerError(ERR_STATUS.BAD_REQUEST);
       }
       catch(e) {
           expect(e.message).to.deep.equal({
           code:4,msg:'bad request'}
           );
       }

   }) ;
   it('unexpected respond code ',function () {
       try{
           throw new ChargerError(5);
       }
       catch(e) {
           expect(e.message).to.not.equal({
           code:4,msg:'bad request'}
           );
       }

   }) ;

});