//create Sever Example
//const { request } = require("express");

const http = require("http");

const { v4 :uuidv4 }  = require("uuid");

const{successHandle,errorHandle} = require("./Handle");

//const Headers = require("./Header");
const { Headers,Request_Method} = require("./Header");

//const errHandleJSON = require('/.errorHandleJSON');


//control + C 停止node.js
//requestListener 要先寫 req後寫res(req,res), 不行寫(res,req);

const todos = [];

const requestListener = (req,res) => {
    // const headers = {
    //     "content-type":"text/plain" 
    // }

    //console.log(req.method);
     let body = "";

     //node.js 原生語法
     req.on("data",chunk => {
         body += chunk;
     })


    //method 都是大寫;
    if (req.url == "/todos" && req.method == Request_Method.GET){
        // res.writeHead(200,headers);
        // //res.write("Server create done");
        // res.write(JSON.stringify({
        //     "status":"success",
        //     "data":todos
        // }))
        //res.end();
        //console.log("Go in");
        successHandle(res,todos);
    }else if(req.url=="/todos" && req.method == Request_Method.DELETE){
        // todos.length = 0;
        // res.writeHead(200,headers);
        // res.write(JSON.stringify({
        //     "status":"success",
        //     "data":todos
        // }));
        // res.end();
        todos.length = 0;
        successHandle(res,todos)
    }else if(req.url.startsWith("/todos/") && req.method == Request_Method.DELETE){
        const id = req.url.split("/").pop();
        const index = todos.findIndex(element => element.id == id);

        if(index !== -1){
            todos.splice(index,1)
            // res.writeHead(200,headers);
            // res.write(JSON.stringify({
            //     "status":"success",
            //     "data":todos
            // }));
            // res.end();
            successHandle(res,todos)
        }else{
            //errorHandle.errorHandle(res);
            errorHandle(res,400,`此 ${id} 刪除失敗`);
        }
    }else if(req.url =="/todos" && req.method ==Request_Method.POST){
        req.on("end",()=>{ 
            try{

            
                const title = JSON.parse(body).title;   
                console.log(title);
                if(title !== undefined){

                    const todo = {
                        "title":title,
                        "id":uuidv4()
                    };

                    todos.push(todo);

                    // res.writeHead(200,headers);
                    // res.write(JSON.stringify({
                    //     "status":"success",
                    //     "data":todos
                    // }));
                    // res.end();
                    successHandle(res,todos)
                }else{
                    // res.writeHead(400,headers);
                    // res.write(JSON.stringify({
                    //     "status":"false",
                    //     "message":"欄位有誤"
                    // }));
                    // res.end();
                    //errorHandle.errorHandleField(res);
                    errorHandle(res,400,"資料有誤");
                }
            }catch(error){
                //console.log(error);
                // res.writeHead(400,headers);
                // res.write(JSON.stringify({
                //     "status":"false",
                //     "message":"欄位有誤"
                // }));
                // res.end();

                //errorHandle.errorHandleJSON(res);
                errorHandle(res,400,"建立失敗")
            }
            //console.log(body);
        }) 
    }else if(req.url.startsWith("/todos/") && req.method == Request_Method.PATCH){
        req.on("end",()=>{ 
            try{
                const todo = JSON.parse(body).title; 
                const id = req.url.split("/").pop();
                const index = todos.findIndex(element => element.id == id);
                console.log(todo);
                if(index !== -1 && todo !== undefined){
                    todos[index].title = todo;

                    // res.writeHead(200,headers);
                    // res.write(JSON.stringify({
                    //     "status":"success",
                    //     "data":todos
                    // }));
                    // res.end();
                    successHandle(res,todos);
                }else{
                    //errorHandle.errorHandle(res);
                    errorHandle(res,400,"Data error")
                }   
            }catch(error){
                //console.log(error);
                // res.writeHead(400,headers);
                // res.write(JSON.stringify({
                //     "status":"false",
                //     "message":"欄位有誤"
                // }));
                // res.end();

                //errorHandle.errorHandleJSON(res);
                errorHandle(res,400,"Create error");
            }
            //console.log(body);
        })  
    }else if(req.method == "OPTIONS"){
        res.writeHead(200,Headers);
        res.end();
    
    }else{  

        // res.writeHead(404,headers);
        // // res.write("not found 404");
        // res.write(JSON.stringify({
        //     "status":"false",
        //     "message":"It's not found"
        // }))
        // res.end();

        errorHandle(res,400,"It's not found")
    }
}


const server = http.createServer(requestListener);

//server.listen(process.env.PORT || 3000); // process.env.PORT 跟 process.env.Port 不同
server.listen(3000);



//another way to write

/*
http.createServer(function(req,res)=>{
    res.writeHead(200,{"content-type":"text/plain"});
    res.write("Server create done");
    res.end();
}).listen(3000);
*/ 