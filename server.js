//create Sever Example

const http = require("http");

const { v4 :uuidv4 }  = require("uuid");

const errorHandle = require("./errorHandle");



//const errHandleJSON = require('/.errorHandleJSON');


//control + C 停止node.js
//requestListener 要先寫 req後寫res(req,res), 不行寫(res,req);

const todos = [
    
];

const requestListener = (req,res) => {
    // const headers = {
    //     "content-type":"text/plain" 
    // }
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
       'Content-Type': 'application/json'
     }

    //console.log(req.method);
     let body = "";

     //node.js 原生語法
     req.on("data",chunk => {
         body += chunk;
     })


    //method 都是大寫;
    if (req.url=="/todos" && req.method =="GET"){
        res.writeHead(200,headers);
        //res.write("Server create done");
        res.write(JSON.stringify({
            "status":"success",
            "data":todos
        }))
        res.end();
    }else if(req.url=="/todos" && req.method =="DELETE"){
        todos.length = 0;
        res.writeHead(200,headers);
        res.write(JSON.stringify({
            "status":"success",
            "data":todos
        }));
        res.end();
    }else if(req.url.startsWith("/todos/") && req.method == "DELETE"){
        const id = req.url.split("/").pop();
        const index = todos.findIndex(element => element.id == id);

        if(index !== -1){
            todos.splice(index,1)
            res.writeHead(200,headers);
            res.write(JSON.stringify({
                "status":"success",
                "data":todos
            }));
            res.end();
        }else{
            errorHandle.errorHandle(res);
        }
    }else if(req.url =="/todos" && req.method =="POST"){
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

                    res.writeHead(200,headers);
                    res.write(JSON.stringify({
                        "status":"success",
                        "data":todos
                    }));
                    res.end();
                }else{
                    // res.writeHead(400,headers);
                    // res.write(JSON.stringify({
                    //     "status":"false",
                    //     "message":"欄位有誤"
                    // }));
                    // res.end();
                    errorHandle.errorHandleField(res);

                }
            }catch(error){
                //console.log(error);
                // res.writeHead(400,headers);
                // res.write(JSON.stringify({
                //     "status":"false",
                //     "message":"欄位有誤"
                // }));
                // res.end();

                errorHandle.errorHandleJSON(res);
            }
            //console.log(body);
        }) 
    }else if(req.url.startsWith("/todos/") && req.method == "PATCH"){
        req.on("end",()=>{ 
            try{
                const todo = JSON.parse(body).title; 
                const id = req.url.split("/").pop();
                const index = todos.findIndex(element => element.id == id);
                console.log(todo);
                if(index !== -1 && todo !== undefined){
                    todos[index].title = todo;

                    res.writeHead(200,headers);
                    res.write(JSON.stringify({
                        "status":"success",
                        "data":todos
                    }));
                    res.end();
                }else{
                    errorHandle.errorHandle(res);
                }   
            }catch(error){
                //console.log(error);
                // res.writeHead(400,headers);
                // res.write(JSON.stringify({
                //     "status":"false",
                //     "message":"欄位有誤"
                // }));
                // res.end();

                errorHandle.errorHandleJSON(res);
            }
            //console.log(body);
        })  
    }else if(req.method =="OPTIONS"){
        res.writeHead(200,headers);
        res.end();
    
    }else{  

        res.writeHead(404,headers);
        // res.write("not found 404");
        res.write(JSON.stringify({
            "status":"false",
            "message":"It's not found"
        }))
        res.end();
    }
}


const server = http.createServer(requestListener);

server.listen(3000);

//another way to write

/*
http.createServer(function(req,res)=>{
    res.writeHead(200,{"content-type":"text/plain"});
    res.write("Server create done");
    res.end();
}).listen(3000);
*/ 