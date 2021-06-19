const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');



//createServer method:creates a very basic minimal server object using an existing http.server class
//it takes a request handler callback function as parameter(as arrow func) this req handler is called everytime the server received the request.
//this request handler takes two obj as parameter (req,req)
//we do not create the (response/res) obj ourselves,we recieve it along w/ the incoming request, then we add the data to the res & send it back.
// Req & Res are types of objects called streams.
//With Streams: data is not transmitted all at once but in chunk that read piece by pice.
//The req obj gices us access to the headers using req.headers
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    if(req.method === 'GET'){
        let fileUrl = req.url;
        if(fileUrl === '/'){
            fileUrl= '/index.html';
        }
        const filePath = path.resolve('./public' + fileUrl)
        const fileExt = path.extname(filePath);
        if(fileExt === '.html'){
            fs.access(filePath,err=>{
                if(err){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                fs.createReadStream(filePath).pipe(res);
            });
        }else{
            res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
    // console.log(req.headers);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><body><h1>Hello World!</h1></body></html>');
});
server.listen(port, hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})
