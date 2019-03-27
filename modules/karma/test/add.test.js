const add = require('../src/add')
const {expect} = require('chai')

describe('add',function() {
    it('测试文件',function() {
        expect(add(1,1)).to.equal(2)
    )}
)}
