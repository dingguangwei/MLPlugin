/* var http = require("http")  
var fs = require("fs")  
  
http.createServer(function(req,res){  
    var path = req.url;   
    console.log("path1: "+path)  
    if(path == "/"){  
        path = "/public/index.html";  
    }  
    sendFile(res,path);  
}).listen(8080)  
  
console.log('Server running at http://127.0.0.1:8080/');

function sendFile(res,path){  
    var path = process.cwd()+path;  
    fs.readFile(path,function(err,stdout,stderr){  
        if(!err){  
            var data = stdout;  
            var type = path.substr(path.lastIndexOf(".")+1,path.length)  
            res.writeHead(200,{'Content-type':"text/"+type});   //在这里设置文件类型，告诉浏览器解析方式  
            res.write(data);  
        }  
        res.end();  
    })  
}   */



var http = require('http');
var fs = require('fs');
var url = require('url');

// 创建服务器
http.createServer( function (request, response) {
   
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
   console.log(" > fileName : " + pathname);
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});    
         
         // 响应文件内容
         response.write(data.toString());        
      }
      //  发送响应数据
      response.end();
   });
}).listen(8080);
 
// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8080/');





/* var express = require("express");
var path = require("path");
var ejs = require("ejs");
var port = process.env.PORT || 8080;

var app = express();

app.set("views","./views");
app.engine("html",ejs.__express);
app.set("view engine","html");

app.use(express.static(path.join(__dirname, 'public')));
<link rel="stylesheet" href="/css/style.css">
app.listen(port);

console.log('Server running at http://127.0.0.1:8080/');


app.get("/",function(req,res){
    res.render("index");
}) */













