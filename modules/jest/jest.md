jest
===

## 注意项
### 测试文件模式
jest 默认识别 `(default: [ '**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)' ])`
如下模式,可以利用 [testMatch](https://facebook.github.io/jest/docs/en/configuration.html#testmatch-array-string)
修改默认文件识别.

### 预启动设置
1. 配置 package.json 添加如下启动文件

    ```json
    {
     "jest": {
        "globalSetup": "<rootDir>/tests/globalSetupTest.js"
      }
    }
    ```

2. 在对应位置添加如下模式的启动文件
    
    ```js
    const serverLog = require('debug')('socket:server');
    
    const socketError = require('../src/services/error');
    
    const config = require('config');
    const ClientServer = require('../packages/socker-server/src/ClientServer');
    
    const clientServer = new ClientServer();
    
    const apiAuth = require('../src/device/api/1-auth');
    
    module.exports = async function() {
    /*
        clientServer.listen(config.SOCKET_PORT,'0.0.0.0',function () {
            serverLog(`listen ${config.SOCKET_PORT}`);
        });
    
    //注入错误显示服务
        clientServer.service('err',socketError);
    
        clientServer.use(1,apiAuth);*/
    
    }; 
    ```

> 注意此模式下,变量不可全局引用,目前为 jest bug.