error
===
---
**前言：记录在实验 node 是发现的暂时无法解决的 bug**

1. 文件路径查找失败
情况: 1. 在非 node 路径下运行 node 文件是会出现查无此文件的情况。
错误记录:
```
D:\work_software\wamp\www\wpiiot>node ..\node_lab\charger_project\charger.js
fs.js:640
  return binding.open(pathModule._makeLong(path), stringToFlags(flags), mode);
                 ^

Error: ENOENT: no such file or directory, open 'D:\work_software\wamp\www\wpiiot\database\device.json'
    at Error (native)
    at Object.fs.openSync (fs.js:640:18)
    at Object.fs.writeFileSync (fs.js:1333:33)
    at Object.read (D:\work_software\wamp\www\node_lab\charger_project\node_modules\lowdb\lib\file-sync.js:29:10)
    at LodashWrapper.db.read (D:\work_software\wamp\www\node_lab\charger_project\node_modules\lowdb\lib\_index.js:36:29)
    at module.exports (D:\work_software\wamp\www\node_lab\charger_project\node_modules\lowdb\lib\_index.js:96:15)
    at low (D:\work_software\wamp\www\node_lab\charger_project\node_modules\lowdb\lib\index.node.js:12:10)
    at D:\work_software\wamp\www\node_lab\charger_project\charger_databaseAPI.js:4:14
    at Object.<anonymous> (D:\work_software\wamp\www\node_lab\charger_project\charger_databaseAPI.js:207:1)
    at Module._compile (module.js:556:32)

````