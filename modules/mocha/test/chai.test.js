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
        it('isBoolean',function () {
            assert.isBoolean(true,'为 bool 值时为真');
        });
        it('isNotBoolean',function () {
            assert.isNotBoolean(1,'非 bool 值时为真');
        });
        it('typeOf',function () {
            assert.typeOf(1,'number','判断数据类型为给定类型');
        });
        it('notTypeOf',function () {
            assert.notTypeOf(1,'string','判断数据类型不为给定类型');
        });
        it('instanceOf',function () {
            assert.instanceOf({},Object,'判断对象是给定类型');
        });
        it('notInstanceOf',function () {
            assert.notInstanceOf({},Array,'判断对象非给定类型');
        });
        it('include',function () {
            assert.include([1,2,3],1,'数组中含有给定值');
            assert.include('hello world','llo','判断字符串中含有子字符串');
            assert.include({a:1,b:2},{a:1},'对象中含有对应键值对');
        });
        it('notInclude',function () {
            assert.notInclude([1,2,3],4,'数组不含有给定值');
            assert.notInclude('hello world','lloe','判断字符串中不含有子字符串');
            assert.notInclude({a:1,b:2},{a:2},'对象中不含有对应键值对');
        });
        //todo 注意还是第一层的比较,只不过变成了引用类型
        it('deepInclude',function () {
            assert.deepInclude([[1,2,3],[5,6]],[5,6],'数组含有给定值');
            assert.deepInclude({a:{a:1},b:1},{a:{a:1}},'查找字段中包含键值对');

        });
        it('notDeepInclude',function () {
            assert.notDeepInclude([[1,2,3],[5,6]],5,'数组不含有给定值');
            assert.notDeepInclude({a:1,b:2},{a:2},'对象中不含有对应键值对');
        });
        //注意递归查找的限制条件
        it('nestedInclude',function () {
            assert.nestedInclude({a:{a:1},b:1},{'a.a':1},'递归查找字段中包含键值对');
            assert.nestedInclude({a:{'[.a]':1},b:1},{'a.\\[\\.a\\]':1},'出现 [,],. 字符需要使用 \\');

        });
        it('notNestedInclude',function () {
            assert.notNestedInclude({a:{a:1},b:1},{'a.a':2},'递归查找字段中包含键值对');
        });
        //注意递归查找的限制条件
        it('deepNestedInclude',function () {
            assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}},'递归比较引用类型');
            assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}},'注意 .,[,] 需要 \\ 转义递归比较引用类型');

        });
        it('notDeepNestedInclude',function () {
            assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}});
            assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
        });
        it('ownInclude',function () {
            assert.ownInclude({ a: 1 }, { a: 1 },'只检查自有属性的包含');
        });
        it('notOwnInclude',function () {
            Object.prototype.b = 2;
            assert.notOwnInclude({ a: 1 }, { b: 2 },'验证费自有属性');
        });
        it('deepOwnInclude',function () {
            assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
        });
        it('notDeepOwnInclude',function () {
            assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
        });
        it('match',function () {
            assert.match('foobar', /^foo/m, 'regexp matches');
        });
        it('notMatch',function () {
            assert.notMatch('foobar', /^foog/m, 'regexp does not match');
        });
        //验证包含某属性,自由和继承均包含
        it('property',function () {
            assert.property({ tea: { green: 'matcha' }}, 'tea');
            assert.property({ tea: { green: 'matcha' }}, 'toString');
        });
        it('notProperty',function () {
            assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
        });
        it('deepPropertyVal',function () {
            assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
        });
        //验证包含某属性,并且值为完全相等
        it('notDeepPropertyVal',function () {
            assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
            assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
            assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
        });
        it('deepNestedPropertyVal',function () {
            assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
        });
        it('notDeepNestedPropertyVal',function () {
            assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
            assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
            assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
        });
        it('lengthOf',function () {
            assert.lengthOf([1,2,3], 3, 'array has length of 3');
            assert.lengthOf('foobar', 6, 'string has length of 6');
        });

        //测试是否包含键名
        it('hasAnyKeys',function () {
            assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
            assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
            assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
            assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
        });

        //测试是否包含键名
        it('hasAnyKeys',function () {
            assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
            assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
            //todo 不理解此时的断言库,比较值有问题
            // assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
            // assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
       })
       //todo 跟多的断言库参考具体 {@link} http://chaijs.com/api/assert/#method_hasanykeys

    });
    describe('expect 断言测试',function () {


    });
    describe('should 断言测试',function () {
        it('expect 填入实际值,to.be.equal 填入期望值',function () {
            expect(1,'断言整数相等成功').to.equal(1);
        });
        it('not 取反',function () {
            expect(1).to.not.equal(2);
        });
        it('deep 为严格相等模式',function () {
            expect(1).to.deep.equal(1);
        });
        it('nested 比较索引值',function () {
            expect({a:{a:1}}).to.nested.include({'a.a':1});
        });
        it('include 测试包含子集',function () {
            expect({a:{a:1}}).to.nested.include({'a.a':1});
        });
        it('own 判断自有属性',function () {
            expect({a:{a:1}}).to.have.own.property('a');
        });
        it('order 验证数组顺序相同',function () {
            expect([1, 2]).to.have.ordered.members([1, 2])
                .but.not.have.ordered.members([2, 1]);
            expect([1, 2, 3],'include 只对起始值是包含才可').to.include.ordered.members([1, 2])
                .but.not.include.ordered.members([2, 3]);
        });
        it('any 对象包含键名的其中之一为真',function () {
            expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
        });
        //an 可以达到相同的效果
        it('a 判断类型',function () {
            expect('foo').to.be.a('string');
            expect({a: 1}).to.be.an('object');
            expect(null).to.be.a('null');
            expect(undefined).to.be.an('undefined');
            expect(new Error).to.be.an('error');
            expect(Promise.resolve()).to.be.a('promise');
            expect(new Float32Array).to.be.a('float32array');
            expect(Symbol()).to.be.a('symbol');
        });
        it('include 判断确定包含子集',function () {
            expect('foobar').to.include('foo');
            expect([1, 2, 3]).to.include(2);
            expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
            expect(new Set([1, 2])).to.include(2);
            expect(new Map([['a', 1], ['b', 2]])).to.include(2);
            expect([1, 2, 3]).to.be.an('array').that.includes(2);
        });

    });
})