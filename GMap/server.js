var http = require('http');  
var url = require('url');  
var fs = require('fs');  

var server = http.createServer(function(request, response) {  
    var path = url.parse(request.url).pathname;  
    switch (path) {  
        case '/index.html':  
            fs.readFile(__dirname + path, function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    response.write(data);  
                    response.end();  
                }  
            });  
            break;
        case '/buyerData.json':
            response.writeHead(200, {  
                'Content-Type': 'application/json'  
            });  

            fs.readFile('./buyerData.json', function (err, data) {
                if (err) throw err;
                var bd = JSON.parse(data);  
                response.end(JSON.stringify(bd));
              });
                
            break;
    }  
});  

server.listen(8082); 