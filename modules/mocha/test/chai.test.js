const {assert,should,expect} = require('chai');

describe('测试 chai 不同的断言库',function(){
    /**
     * assert 断言库类似 node 自带断言库
     *
     * {@link} http://chaijs.com/api/assert/
     */
    describe('assert 断言测试',function () {
        it('assert',function () {
            assert(1,'表达式为真,断言成功!');
        });

        //todo fail 用来抛出断言错误
        //todo 测试原理就是没有捕获异常
        it('fail',function () {
            try{
                assert.fail(1,2,'assert error','+');
            } catch(e) {
                assert(e.actual === 1,'比较 actual');
                assert(e.expected === 2,'比较 expected');
                assert(e.message === 'assert error','比较 message');
                assert(e.operator === '+','比较 operator');
            }
        });
        //isOk 类似 assert
        it('isOk',function () {
            assert.isOk(true,'判断输入值是否为真');
        });
        //isNotOk 断言为假成功
        it('isNotOk',function () {
            assert.isNotOk(false,'判断输入值是否为假');
        });
        //equal 断言为假成功
        //只是 == 判断
        it('equal',function () {
            assert.equal(1,'1','判断实际值和期望值是否相同');
        });
        //strictEqual 严格模式断言
        //=== 判断
        it('strictEqual',function () {
            assert.strictEqual(1,1,'判断实际值和期望值完全相等');
        });
        //deepEqual 用于对象断言
        //=== 判断
        it('deepEqual',function () {
            assert.deepEqual({a:1},{a:1},'判断对象相等');
        });
        //notEqual 断言为假成功
        //只是 == 判断
        it('notEqual',function () {
            assert.notEqual(1,2,'判断实际值和期望值不相同断言成功');
        });
        //严格模式断言假为真
        it('notStrictEqual',function () {
            assert.notEqual(1,2,'严格模式断言假为真');
        });
        //对象不相等时为真
        it('notDeepEqual',function () {
            assert.notDeepEqual({a:1},{a:2},'对象不等时为真');
        });
        it('isAbove',function () {
            assert.isAbove(6,2,' > 期望值时为真');
        });
        it('isAtLeast',function () {
            assert.isAtLeast(6,6,' >= 期望值时为真');
        });
        it('isBelow',function () {
            assert.isBelow(6,210,'< 期望值时为真');
        });
        it('isAtMost',function () {
            assert.isAtMost(210,210,'<= 期望值时为真');
        });
        it('isTrue',function () {
            assert.isTrue(true,'只断言布尔值为真时才成功');
        });
        it('isNotTrue',function () {
            assert.isNotTrue('1','非言布尔真时才成功');
        });
        it('isFalse',function () {
            assert.isFalse(false,'只断言布尔值为假时才成功');
        });
        it('isNotFalse',function () {
            assert.isNotFalse(true,'只断言非布尔值假时才成功');
        });
        it('isNull',function () {
            assert.isNull(null,'只断为 null 时才成功');
        });
        it('isNotNull',function () {
            assert.isNotNull({},'只断非 null 时才成功');
        });
        it('isNaN',function () {
            assert.isNaN(NaN,'只断 NaN 时才成功');
        });
        it('isNotNaN',function () {
            assert.isNotNaN(null,'只断非 NaN 时才成功');
        });
        it('exists',function () {
            assert.exists(1,'值非 null 和 undefined 时为真');
        });
        it('notExists',function () {
            assert.notExists(null,'值为 null 和 undefined 时为真');
        });
        it('isUndefined',function () {
            assert.isUndefined(undefined,'值为 undefined 时为真');
        });
        it('isDefined',function () {
            assert.isDefined(null,'值非 undefined 时为真');
        });
        it('isFunction',function () {
            assert.isFunction(it,'值为 function  时为真');
        });
        it('isNotFunction',function () {
            assert.isNotFunction(null,'值非 function  时为真');
        });
        it('isObject',function () {
            assert.isNotFunction({},'值为 object  时为真');
        });
        it('isNotObject',function () {
            assert.isNotObject(1,'值非 object  时为真');
        });
        it('isArray',function () {
            assert.isArray([],'值为 array  时为真');
        });
        it('isNotArray',function () {
            assert.isNotArray(1,'值非 array  时为真');
        });
        it('isString',function () {
            assert.isString('df','值为 string  时为真');
        });
        it('isNotString',function () {
            assert.isNotString(1,'值非 string  时为真');
        });
        it('isNumber',function () {
            assert.isNumber(1,'值为 number 时为真');
        });
        it('isNotNumber',function () {
            assert.isNotNumber('1','值非 number 时为真');
        });
        it('isFinite',function () {
            assert.isFinite(1,'值有限时为真');
        });

    });
    describe('expect 断言测试',function () {

    });
    describe('should 断言测试',function () {

    });
})