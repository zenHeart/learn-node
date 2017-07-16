/**
 * Created by locke on 2017/1/17.
 */

/**
 * 测试结构
 * describe 表示测试套件为全局函数
 * it 为一个测试单元，包含在测试套件中
 * expect 为测试断言，包含在测试单元中*/
describe("jasmine 基础测试套件", function () {
    it("it 中包含一个断言", function () {
        var a = true;
        expect(a).toBe(true);
    });

    //一个测试单元中支持多个测试断言，当都正确时，该测试单元才算执行成功
    it("it 中包含多个断言", function () {
        var a = true;
        expect(a).toBe(true);
        expect(a + 1).toBe(2);
    });

    //测试套件支持多层嵌套
    describe("内层测试套件", function () {
        it("内层测试单元", function () {
            var a = true;
            expect(a).toBe(true);
        });
    });
});

/**
 * 测试断言
 * jasmine 支持如下的测试断言
 * */
describe("jasmine 断言测试套件", function () {
    it("toBe 使用 === 进行判断", function () {
        //toBe 支持任意类型
        expect(true).toBe(true);
        expect(1).toBe(1);
    });

    it("not.toBe toBe 结果取反", function () {
        expect(1).not.toBe(null);
    });

    it("toEqual 使用遍历比较两个变量结果是否相等", function () {
        //toEqual 比较对象
        expect({a: 12, b: 34}).toEqual({b: 34, a: 12});

        //toEqual 比较数组
        expect([1, 2, 4, 5]).toEqual([1, 2, 4, 5]);
    });

    it("toMatch 按照正则匹配字符串", function () {
        var message = "foo bar baz";

        expect(message).toMatch(/bar/);
        expect(message).toMatch("bar");

    });

    it("not.toMatch toMatch 取反", function () {
        var message = "foo bar baz";

        expect(message).not.toMatch(/quux/);
    });

    it("toBeDefined 变量定义后成立", function () {
        var a = {
            foo: "foo"
        };
        expect(a.foo).toBeDefined();
    });
    it("not.toBeDefined 变量未定义成立", function () {
        var a = {
            foo: "foo"
        };
        expect(a.bar).not.toBeDefined();
    });

    it("toBeUndefined 变量未定义成立", function () {
        var a = {
            foo: "foo"
        };

        expect(a.bar).toBeUndefined();
    });

    it("not.toBeUndefined 变量定义成立", function () {
        var a = {
            foo: "foo"
        };
        expect(a.foo).not.toBeUndefined();
    });

    it("toBeNull 变量类型为 null 时成立", function () {
        var a = null;
        var foo = "foo";

        expect(null).toBeNull();
    });

    it("toBeNull 变量类型不为 null 时成立", function () {
        var a = null;
        var foo = "foo";

        expect(null).toBeNull();
    });

    it("toBeTruthy 变量代表 true 时成立", function () {
        var a, foo = "foo";

        expect(foo).toBeTruthy();
    });

    it("not.toBeTruthy 变量代表 false 时成立", function () {
        var a, foo = "foo";

        expect(a).not.toBeTruthy();
    });

    it("toBeFalsy 变量代表 false 时成立", function () {
        var a, foo = "foo";

        expect(a).toBeFalsy();
    });

    it("not.toBeFalsy 变量代表 true 时成立", function () {
        var a, foo = "foo";
        expect(foo).not.toBeFalsy();
    });

    it("toContain 当数组或字符串中包含该元素时成立", function () {
        var a = ["foo", "bar", "baz", [1, 23]];
        var b = "foo bar baz";
        expect(a).toContain([1, 23]);
        expect(a).toContain("foo");
    });

    it("not.toContain 当数组或字符串中不包含该元素时成立", function () {
        var a = ["foo", "bar", "baz"];
        var b = "foo bar baz";
        expect(a).not.toContain("bar1");
        expect(b).not.toContain("foo1");
    });


    it("toBeLessThan 当小于某数时成立", function () {
        var pi = 3.1415926,
            e = 2.78;

        expect(e).toBeLessThan(pi);

    });
    it("not.toBeLessThan 当大于等于某数时成立", function () {
        var pi = 3.1415926,
            e = 2.78;

        expect(pi).not.toBeLessThan(e);

    });

    it("toBeGreaterThan 大于某数时成立", function () {
        var pi = 3.1415926,
            e = 2.78;

        expect(pi).toBeGreaterThan(e);

    });

    it("not.toBeGreaterThan 小于等于某数时成立", function () {
        var pi = 3.1415926,
            e = 2.78;

        expect(e).not.toBeGreaterThan(pi);
    });

    //todo 不清楚该函数功能
    it("toBeCloseTo 没看懂", function () {
        var pi = 3.1415926,
            e = 2.78;

        expect(5).not.toBeCloseTo(e, 2);
        expect(pi).toBeCloseTo(e, 0);
    });

    it("toThrow 当抛出异常符合结果时成立", function () {
        var baz = function () {
            throw 'what';
        };

        expect(baz).toThrow('what');
    });

    it("not.toThrow 当不抛出异常时成立", function () {
        var foo = function () {
            return 1 + 2;
        };
        var bar = function () {
            return a + 1;
        };

        expect(foo).not.toThrow();

        //这也表示不抛出异常
        expect(bar).toThrow();
    });

    it("toThrowError 当抛出错误符合结果时成立", function () {
        var foo = function () {
            throw new TypeError("foo bar baz");
        };


        expect(foo).toThrowError("foo bar baz");
        expect(foo).toThrowError(/bar/);
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, "foo bar baz");
    });
});

describe("jasmine 功能函数测试", function () {
    describe("fail 当单元测试执行失败时成立", function () {
        var foo = function (x, callBack) {
            if (x) {
                callBack();
            }
        };

        it("支持返回字符串", function () {
            foo(false, function () {
                fail("return fail message");
            });
        });

        it("支持返回错误对象", function () {
            foo(false, function () {
                fail(new Error('return error object'));
            });
        });
    });

    describe("beforeEach 在每次单元测试前会执行添加的函数", function () {
        describe("验证 beforeEach 的多次执行,初始变量 foo = []", function () {
            var foo = [];
            beforeEach(function () {
                foo.push(1);
            });

            it("beforeEach 第一次执行 foo 变为 [1]", function () {
                expect(foo).toEqual([1]);
            });

            it("beforeEach 第一次执行 foo 变为 [1,1]", function () {
                expect(foo).toEqual([1, 1]);
            });

            describe("内层测试套件也包含 beforeEach 时也会执行", function () {
                beforeEach(function () {
                    foo.push(1);
                });
                it("beforeEach 在内层测试套件执行 foo 变为 [1,1,1,1]", function () {
                    expect(foo).toEqual([1, 1, 1, 1]);
                });
            });
        });

        describe("验证 beforeEach 对 this 的复位功能,初始化 this.foo = 1", function () {
            beforeEach(function () {
                this.foo = 1;
            });

            it("beforeEach 验证 this.foo = 1,同时添加 this.bar = 2", function () {
                expect(this.foo).toEqual(1);
                this.bar = 2;
            });

            it("beforeEach 验证 this.foo = 1,this.bar 被删除", function () {
                expect(this.foo).toEqual(1);
                expect(this.bar).toBe(undefined);
            });
        });
    });

    describe("afterEach 在每次单元测试后会执行添加的函数初始变量 foo = []", function () {
        describe("验证 afterEach 的多次执行", function () {
            var foo = [];
            afterEach(function () {
                foo.push(1);
            });


            it("afterEach foo 为 []", function () {
                expect(foo).toEqual([]);
            });

            it("afterEach 第一次执行 foo 变为 [1]", function () {
                expect(foo).toEqual([1]);
            });
        });
    });

});

describe("beforeAll 在每个测试套件前会执行添加的函数", function () {
    var foo = [];
    beforeAll(function () {
        foo.push(1);
    });

    it("beforeAll 测试单元 foo = [1]", function () {
        expect(foo).toEqual([1]);
    });
});


describe("afterAll 在每个测试套件后会执行添加函数，初始 foo = []", function () {
    var foo = [];

    describe("内层测试套件添加 afterAll ", function () {
        afterAll(function () {
            foo.push(1);
        });

        it("foo 为 []", function () {
            expect(foo).toEqual([]);
        });
    });

    it("跳出内层测试套件后foo 变为 [1]", function () {
        expect(foo).toEqual([1]);
    });
});

describe("jasmine pending 测试套件", function () {
    xdescribe("xdescribe 可以挂起一组测试套件的运行", function () {
        var foo;

        beforeEach(function () {
            foo += 1;
        });

        it("is just a function, so it can contain any code", function () {
            expect(foo).toEqual(1);
        });


        it("is just a function, so it can contain any code", function () {
            expect(foo).toEqual(2);
        });
    });

    xit("xit 可以挂起一个测试单元的运行", function () {
        expect(true).toBe(false);
    });

    it("pending 在测试单元中使用可以挂起该测试并抛出挂起信息", function () {
        expect(true).toBe(false);
        pending('挂起该测试留待以后处理！');
    });
});

//桩函数表示，不会直接调用原函数，而是利用 spyOn 函数生成的测试对象来替代正式函数。
//通过监听替身函数来验证函数的执行机制是否正确
describe("jasmine Spy 测试套件", function () {
    describe("spyOn 监听桩函数", function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    bar = value;
                }
            };

            spyOn(foo, 'setBar');

            foo.setBar(123);
            foo.setBar(456, 'another param');

        });

        it("toHaveBeenCalled 当监听的桩函数被调用时成立", function () {
            expect(foo.setBar).toHaveBeenCalled();
        });


        it("toHaveBeenCalledTimes 桩函数的执行次数符合条件时成立", function () {
            expect(foo.setBar).toHaveBeenCalledTimes(2);
        });

        it("toHaveBeenCalledWith 当桩函数执行的输入参数符合调用栈时成立", function () {
            expect(foo.setBar).toHaveBeenCalledWith(123);
            expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
        });
    });

    describe("spyOn.and.callThrough() 实现对实际值的修改", function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    bar = value;
                }
            };

            spyOn(foo, 'setBar').and.callThrough();

            foo.setBar(123);
            foo.setBar(456, 'another param');

        });

        it("验证实际参数被修改", function () {
            expect(bar).toBe(456);
        });
    });

    describe("spyOn.and.returnValue 设定桩函数的返回值", function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    bar = value;
                }
            };
            spyOn(foo, 'setBar').and.returnValue(745);

            foo.setBar(123);
            foo.setBar(456, 'another param');

        });

        it("验证实际参数被修改", function () {
            console.log(foo);
            expect(foo.setBar(123)).toBe(745);
            expect(foo.setBar(23)).toBe(745);
            expect(foo.setBar).toHaveBeenCalledTimes(4);
        });
    });

    describe("spyOn.and.returnValues 设定桩函数的返回值队列", function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    bar = value;
                }
            };
            spyOn(foo, 'setBar').and.returnValues("fetched first", "fetched second");
        });

        it("验证返回值队列", function () {
            expect(foo.setBar).not.toHaveBeenCalled();
            expect(foo.setBar(12)).toEqual("fetched first");
            expect(foo.setBar()).toEqual("fetched second");
            expect(foo.setBar()).toBeUndefined();
            expect(foo.setBar).toHaveBeenCalledTimes(3);
        });
    });

    describe("spyOn.and.callFake 设定桩函数的回调函数", function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    bar = value;
                }
            };

            //回调参数中包含桩函数的输入参数
            spyOn(foo, 'setBar').and.callFake(function () {

                return 1001;
            });
        });

        it("验证桩函数回调函数返回值", function () {
            expect(foo.setBar(12, 123, 12)).toEqual(1001);
        });
    });

    describe("spyOn.and.throwError 设定桩函数的返回错误", function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    bar = value;
                }
            };

            spyOn(foo, "setBar").and.throwError("桩函数返回错误");
        });

        it("throws the value", function () {
            expect(function () {
                foo.setBar(123)
            }).toThrowError("桩函数返回错误");
        });
    });

    describe("<Object>.<method>.and.stub 桩函数利用此函数停止对原始函数的修改", function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    bar = value;
                }
            };

            spyOn(foo, "setBar").and.callThrough();
        });

        it("验证对原始值的修改", function () {
            foo.setBar(123);
            expect(bar).toBe(123);
        });

        it("验证 stub 阻止对原始的修改", function () {
            expect(bar).toBe(123);
            foo.setBar(5);
            expect(bar).toBe(5);
            //阻止对原始值的修改，利用桩函数代替
            //此时  bar = 5
            foo.setBar.and.stub();

            //桩函数阻止对实际值的修改
            foo.setBar(7);
            expect(bar).toBe(5);
        });
    });
});

describe("<Object>.<method>.calls.* 被替换为桩的函数所带有的方法", function () {
    var foo, bar = null;

    beforeEach(function () {
        foo = {
            setBar: function (value) {
                bar = value;
            }
        };

        spyOn(foo, "setBar");
    });

    it("<Object>.<method>.calls.any 当被监听的桩函数被调用时返回 ture", function () {
        expect(foo.setBar.calls.any()).toEqual(false);

        foo.setBar();

        expect(foo.setBar.calls.any()).toEqual(true);
    });

    it("<Object>.<method>.calls.count 返回监听的桩函数被调用次数", function () {
        expect(foo.setBar.calls.count()).toEqual(0);

        foo.setBar();
        foo.setBar();

        expect(foo.setBar.calls.count()).toEqual(2);
    });

    it("<Object>.<method>.calls.argsFor(index) 返回监听的桩函数被调用栈的参数索引", function () {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
        expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
    });

    it("<Object>.<method>.calls.allArgs 返回监听的桩函数被调用栈的所有参数数组", function () {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.allArgs(1)).toEqual([[123], [456, "baz"]]);
    });

    it("<Object>.<method>.calls.all 返回监听的桩函数被调用的描述", function () {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.all()).toEqual([{object: foo, args: [123], returnValue: undefined}, {
            object: foo,
            args: [456, "baz"],
            returnValue: undefined
        }]);
    });

    it("<Object>.<method>.calls.mostRecent 返回最近一次监听的桩函数被调用的描述", function () {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.mostRecent()).toEqual({object: foo, args: [456, "baz"], returnValue: undefined});
    });

    it("<Object>.<method>.calls.first 返回第一次监听的桩函数被调用的描述", function () {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.first()).toEqual({object: foo, args: [123], returnValue: undefined});
    });

    it("<Object>.<method>.calls.first 返回第一次监听的桩函数被调用的描述", function () {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.first()).toEqual({object: foo, args: [123], returnValue: undefined});
    });

    it("<Object>.<method>.calls.<all | mostRecent | first>.object 返回对应监听的桩函数指代的 this 环境", function () {
        var spy = jasmine.createSpy('spy');
        var baz = {
            fn: spy
        };
        var quux = {
            fn: spy
        };
        baz.fn(123);
        quux.fn(456);

        expect(spy.calls.first().object).toBe(baz);
        expect(spy.calls.mostRecent().object).toBe(quux);

        foo.setBar(1);
        expect(foo.setBar.calls.mostRecent().object).toBe(foo);
    });

    it("<Object>.<method>.calls.reset 清空测试桩的调用记录", function () {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.any()).toBe(true);

        foo.setBar.calls.reset();

        expect(foo.setBar.calls.any()).toBe(false);
    });
});

describe("spy 创建桩的方法", function () {
    describe("createSpy 用来创建桩对象", function () {
        var whatAmI;

        beforeEach(function () {
            whatAmI = jasmine.createSpy('whatAmI');

            whatAmI("I", "am", "a", "spy");
        });

        it("and.identity 获取桩对象的名称", function () {
            expect(whatAmI.and.identity()).toEqual('whatAmI');
        });

    });

    describe("createSpyObj 创建一组桩", function () {
        var tape;

        beforeEach(function () {
            tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

            tape.play();
            tape.pause();
            tape.rewind(0);
        });

        it("验证测试桩被创建", function () {
            expect(tape.play).toBeDefined();
            expect(tape.pause).toBeDefined();
            expect(tape.stop).toBeDefined();
            expect(tape.rewind).toBeDefined();
        });

        it("测试测试桩组被使用", function () {
            expect(tape.play).toHaveBeenCalled();
            expect(tape.pause).toHaveBeenCalled();
            expect(tape.rewind).toHaveBeenCalled();
            expect(tape.stop).not.toHaveBeenCalled();
        });

    });
});

describe("jasmine 对象方法测试", function () {
    it("any 比较参数的构造器,生成期望类型的对象", function () {
        //生成空对象
        expect({}).toEqual(jasmine.any(Object));

        //生成数字 12
        expect(12).toEqual(jasmine.any(Number));
    });

    it("anything 当比较参数非 undefined 和 null 时执行成功", function () {
        expect(2).toEqual(jasmine.anything());
    });

    it("objectContaining 当比较对象中包含期望的键值对时比较成功", function () {
        var foo = {
            a: 1,
            b: 2,
            bar: "baz"
        };
        expect(foo).toEqual(jasmine.objectContaining({
            bar: "baz"
        }));

        expect(foo).not.toEqual(jasmine.objectContaining({
            c: 37
        }));
    });

    it("arrayContaining 当比较数组中包含期望的键值对时比较成功", function () {
        var foo = [{a: 'test'}, 2, [1, 2, 3]];

        expect(foo).toEqual(jasmine.arrayContaining(
            [{a: 'test'}, 2]
        ));

        expect(foo).not.toEqual(jasmine.objectContaining(
            [[1, 2, 3, 4]]
        ));
    });

    it("stringMatching 比较对象中的字符串", function () {
        expect({foo: 'bar'}).toEqual({foo: jasmine.stringMatching(/^bar$/)});
        expect({foo: 'foobarbaz'}).toEqual({foo: jasmine.stringMatching('bar')});
    });

    it("stringMatching 比较对象中的字符串", function () {
        expect({foo: 'bar'}).toEqual({foo: jasmine.stringMatching(/^bar$/)});
        expect({foo: 'foobarbaz'}).toEqual({foo: jasmine.stringMatching('bar')});
    });

    describe("clock 创建时钟", function () {
        var timerCallback;

        beforeEach(function () {
            timerCallback = jasmine.createSpy("timerCallback");
            jasmine.clock().install();
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it("实现测试单元的异步调用", function () {
            setTimeout(function () {
                timerCallback();
            }, 100);
            //jasmine.clock().tick 表示函数延迟执行时间
            expect(timerCallback).not.toHaveBeenCalled();

            jasmine.clock().tick(101);

            expect(timerCallback).toHaveBeenCalled();
        });

        it("实现测试单元的间隔调用", function () {
            setInterval(function () {
                timerCallback();
            }, 100);

            expect(timerCallback).not.toHaveBeenCalled();

            jasmine.clock().tick(101);
            expect(timerCallback.calls.count()).toEqual(1);


            jasmine.clock().tick(50);
            expect(timerCallback.calls.count()).toEqual(1);

            jasmine.clock().tick(50);
            expect(timerCallback.calls.count()).toEqual(2);
        });

        describe("模拟时间对象", function () {
            it("模拟函数的执行时间", function () {
                var baseTime = new Date(2013, 9, 23);

                jasmine.clock().mockDate(baseTime);

                jasmine.clock().tick(50);
                expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
            });
        });
    });
});

describe("asymmetricMatch 用户定义的比较函数", function () {
    var tester = {
        asymmetricMatch: function (actual) {
            var secondValue = actual.split(',')[1];
            return secondValue === 'bar';
        }
    };

    it("在 expect 中使用", function () {
        expect("foo,bar,baz,quux").toEqual(tester);
    });

    describe("在测试桩中使用", function () {
        it("测试传入的参数", function () {
            var callback = jasmine.createSpy('callback');

            callback('foo,bar,baz');

            expect(callback).toHaveBeenCalledWith(tester);
        });
    });
});

describe("done 实现异步的单元测试", function () {
    var value;

    beforeEach(function (done) {
        setTimeout(function () {
            value = 0;
            done();
        }, 1);
    });

    //只有单 done 执行后单元测试才会运行
    it("done 在测试单元中使用 done 只有当该测试执行完后才可执行下一个测试单元", function (done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });

    describe("长时间的单元测试举例", function () {
        beforeEach(function (done) {
            done();
        }, 1000);

        //可以利用 it 可选的参数来设置单元测试的执行时间
        it("产生一个 2 s 的间隔", function (done) {
            setTimeout(function () {
                done();
            }, 1000);
        }, 10001);

        afterEach(function (done) {
            done();
        }, 1000);
    });

    describe("done.fail 当异步测试执行失败时抛出异常", function () {
        var foo = function (x, callBack1, callBack2) {
            if (x) {
                setTimeout(callBack1, 0);
            } else {
                setTimeout(callBack2, 0);
            }
        };

        it("测试 done.fail", function (done) {

            foo(true,
                done,
                function () {
                    done.fail("Second callback has been called");
                }
            );
        });
    });
});

describe("customMatchers 用户自定匹配器", function () {
    /** 自定义匹配器
     * 1. 创建自定义匹配器对象
     * 2. 添加匹配器方法 toBeGoofy
     *      * compare 函数表实际值和期望值
     *      * 定义返回的 message
     * */

    var customMatchers = {
        toBeGoofy: function (util, customEqualityTesters) {
            return {
                compare: function (actual, expected) {

                    if (expected === undefined) {
                        expected = '';
                    }

                    var result = {};
                    result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);

                    if (result.pass) {

                        result.message = "Expected " + actual + " not to be quite so goofy";
                    } else {
                        result.message = "Expected " + actual + " to be goofy, but it was not very goofy";
                    }
                    return result;
                }
            };
        }
    };

    describe("addMatchers 添加自定匹配器", function () {
        beforeEach(function () {
            jasmine.addMatchers(customMatchers);
        });

        it("is available on an expectation", function () {
            expect({
                hyuk: 'gawrsh'
            }).toBeGoofy();
        });

        it("can take an 'expected' parameter", function () {
            expect({
                hyuk: 'gawrsh is fun'
            }).toBeGoofy(' is fun');
        });

        it("can be negated", function () {
            expect({
                hyuk: 'this is fun'
            }).not.toBeGoofy();
        });
    });


});

