var {assert,expect,should} = require('chai');
should();

describe('assert style',function() {
    it('test typeof',function() {
        assert.typeOf('str', 'string', 'VALUE IS STRING');
    })
});

describe('expect style',function() {
    it('test typeof',function() {
        expect('str').to.be.a('string');
    })
})

describe('should style',function() {
    it('test typeof',function() {
        'str'.should.be.a('string');
    })
})