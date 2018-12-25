const path = require('path');
const getPath = require('./internal/getPath');
describe('path.join 方法的作用范围',function() {
    it('测试 join 方法',function() {
        let testData = {
            input:[__dirname,'df'],
            expect:__dirname+'/df'
        };

        expect(path.join.apply(path,testData.input)).toEqual(testData.expect);
    });

    it('测试传递 __dirname 给内部函数',function() {
        expect(getPath({
            root:path.join(__dirname,'internal')
        })).toEqual({
            root:__dirname+'/internal'
        })

    })
})