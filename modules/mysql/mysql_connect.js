//- MYSQL Module
const mysql = require('mysql');
const util = require('util');

const DB = {
    HOST: 'localhost',
    USER: 'locke',
    PASSWORD: '111111',
    NAME: 'test_ChargeDB'
};
const DB_CONFIG = {
        host: DB.HOST,
        user: DB.USER,
        password: DB.PASSWORD,
        database: DB.NAME,
        connectionLimit: 10, //控制连接数量
        connectTimeout: 1000 * 10, // 超时 10 s 进行重连
        waitForConnections: true, //防止队列消息未响应
        // useConnectionPooling: true 关闭连接池
    };

var dbReconnectNum = 0;
var mysqlHandle = mysql.createPool(DB_CONFIG);


//-
//- Establish a new connection
//-
mysqlHandle.getConnection(function(err){
    if(err) {
        // mysqlErrorHandling(connection, err);
        console.log("\n\t *** Cannot establish a connection with the database. ***");

         reconnect(mysqlHandle);
    }else {
        console.log("\n\t *** New connection established with the database. ***")
    }
});


//-
//- Reconnection function
//-
function reconnect(connection){
    console.log("\n New connection tentative...");

    //- Create a new one
    connection = mysql.createPool(DB_CONFIG);

    //- Try to reconnect
    connection.getConnection(function(err){
        if(err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect(connection), 2000);
        }else {
            console.log("\n\t *** New connection established with the database. ***")
            return connection;
        }
    });
}


//-
//- Error listener
//-
mysqlHandle.on('error', function(err) {

    //-
    //- The server close the connection.
    //-
    if(err.code === "PROTOCOL_CONNECTION_LOST"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(mysqlHandle);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(mysqlHandle);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(mysqlHandle);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
    }

    else{
        console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
        return reconnect(mysqlHandle);
    }

});


//-
//- Export
//-
module.exports = mysqlHandle;