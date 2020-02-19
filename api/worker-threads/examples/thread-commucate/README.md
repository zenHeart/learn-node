## 主线程和 thread 通信
1. 主线程采用 [`new Worker(filename[,options])`](https://nodejs.org/dist/latest-v13.x/docs/api/worker_threads.html#worker_threads_new_worker_filename_options) 实例化 thread
   1. 使用 `workerData` 字段向 thread 传入初始值
2. 子线程通过 workerData 字段接收初始值,采用 `parentPort` 句柄向主线程发消息和接收主线程消息
3. 主线程利用实例化的 `work.postMessage` 向子线程发消息并接收子线程消息