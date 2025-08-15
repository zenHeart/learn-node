# buffer

## UTF-8 转义

当将字符串重新转义为 Buffer 数组时可能发生错误。
例如 `Buffer.from(new Buffer([0xdd]).toString())` 由于
0xdd 不是合法 UTF-8 字符会被转义为 `[0xef,0xbf,0xbd]` 该字符在
unicode 字符集中表示 [非法字符](https://apps.timwhitlock.info/unicode/inspect?s=%EF%BF%BD),只要在 js 编码中看到类似 `�` 的字符说明解析错误。

该转义会导致非预期的字符扩展,为了避免此现象建议将 buffer 转移为 hex 模式或采用 base64 编码后
在传送。
