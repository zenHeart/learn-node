## net

## 注意事项
### 任意监听端口
为了实现随机分配 port 端口.
可以不给 listen 赋值,这在测试 socket 接口时很方便.

> 注意不赋值时会产生 ipv6 的地址,若保证为 ipv4,可以给 host
赋值为 ipv4 地址.

### socket.localAddress

注意这些值在 `connect` 触发后才被赋予.
否则为空.