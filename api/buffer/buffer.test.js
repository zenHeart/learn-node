describe('Buffer utf-8 转义',function() {
    it('验证非法 utf-8 字符会被转移为 ef bf bd',function() {
        let testData = {
            input:new Buffer([0xaa]),
            expect:new Buffer([0xef,0xbf,0xbd])
        };

		expect(Buffer.from(testData.input.toString())).toEqual(testData.expect);
    });
    it('验证非法 utf-8 字符会按照逐个字符转义为非法字符转移为 ef bf bd',function() {
        let testData = {
            input:new Buffer([0xaa,0x30,0x8f,0xff]),
            expect:new Buffer([0xef,0xbf,0xbd,0x30,0xef,0xbf,0xbd,0xef,0xbf,0xbd])
        };

		// 注意引擎会逐个解析字符若无法用 utf-8 解析则返回 `0xef,0xbf,0xbd`
		expect(Buffer.from(testData.input.toString())).toEqual(testData.expect);
    });

})