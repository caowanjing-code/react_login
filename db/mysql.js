const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react-redux-login'
})
connection.connect(function (err) {
    if (err) {
        console.error('error connecting:' + err.stack)
    }
    console.log('连接数据库成功');
})
// 查找
function selects(sql,callback) {
    connection.query(sql,function (error, results) {
        if (error) console.log(error);
        callback(results);
    });
    //connection.end();//会导致调用时被关闭，出错cannot enqueue quit after invoking quit
}
//添加
function inserts(sql,data,callback) {
    connection.query(sql, data, function (error, results) {
        if (error) console.log(error);
        callback(results);
    })   
    //connection.end();
}
//修改
function updates(sql,callback) {
    connection.query(sql, function (error, results) {
        if (error) console.log(error);
        callback(results);
        //console.log('changeRows:' + results.changeRows + 'rows');
    });
    //connection.end();
}
//删除
function deletes(sql,data,callback) {    
    connection.query(sql,data, function (error, results) {
        if (error) console.log(error);
        callback(results);
        //console.log('affectedRows:' + results.affectedRows + 'rows');
    });
    //connection.end();
}


module.exports={
    selects,
    inserts,
    updates,
    deletes
}
