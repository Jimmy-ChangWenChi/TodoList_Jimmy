const {Header} = require("./Header")

// function errorHandle(res){
//     const headers = {
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
//         'Content-Type': 'application/json'
//     }
//     res.writeHead(400,headers);
//     res.write(JSON.stringify({
//         "status": "false",
//         "message": "格式未填寫正確",
//     }));
//     res.end();
// }

// function errorHandleField(res){
//     const headers = {
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
//         'Content-Type': 'application/json'
//     }
//     res.writeHead(400,headers);
//     res.write(JSON.stringify({
//         "status": "false",
//         "message": "欄位未填寫正確",
//     }));
//     res.end();
// }
// function errorHandleJSON(res){
//     const headers = {
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
//         'Content-Type': 'application/json'
//     }
//     res.writeHead(400,headers);
//     res.write(JSON.stringify({
//         "status": "false",
//         "message": "格式未填寫正確",
//     }));
//     res.end();
// }
function successHandle(res,todos){
    res.writeHead(200,Header)
    res.write(JSON.stringify({
        status:"status",
        data:todos
    }))
    res.end();
}

function errorHandle(res,status,message){
    res.writeHead(status,Header);
    res.write(JSON.stringify({
        status:"false",
        message
    }))
    res.end();
}

//module.exports = errorHandle; // errorHandle 是 function 名稱
//exports.errorHandle;


//如果要引用多個function，寫法如下
module.exports = {
    // errorHandle,
    // errorHandleField,
    // errorHandleJSON,
    successHandle,
    errorHandle
}

//錯誤，還沒改正確
// exports.errorHandle();
// exports.errorHandleField();
// exports.errorHandleJSON();