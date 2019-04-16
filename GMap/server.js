var cookieParser = require('cookie-parser') 
var datos_acceso = require('./js/datos_acceso')
var http = require('http');
var request = require('request')
var fs = require('fs');
var express = require('express');

var app = express(); 
app.use(cookieParser())

var valores = {"grant_type":"authorization_code",
    "client_id": datos_acceso.client_id,
    "client_secret": datos_acceso.client_secret,
    "redirect_uri": datos_acceso.redirect_uri,
    "code": ""}; 

var options = {
   url:'https://api.mercadolibre.com/oauth/token', 
   form: valores, 
   method: "POST",
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json' 
   }
};

var preguntarAML = function(error,response,body) {
  fs.writeFile('./json/token.json',body, function (err) {if (err) throw err;});
  console.log(body); 
  console.log(error); 
}


app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" ); 
    
    var uuid_sesion = (Math.random() * (1 - 200) + 200).toString()
    res.cookie('session_id', uuid_sesion, { maxAge: 900000, httpOnly: true });
    
    console.log('uuid_sesion: '+uuid_sesion)
})


app.get('/logued_in', function (req, res) {
    session_cookie = req.cookies['session_id'] 
    console.log(session_cookie); 
    
    if (req.query.error != null){ 
        console.log('error '+req.query.error)
    };

    
    valores.code = req.query.code 
    console.log('codigo acceso:\n') 
    console.log(valores.code)
    console.log('pido token\n')

    var req = request.post(options, preguntarAML);
    res.send('<input type="button" onclick="location.href=\'http://localhost:8081/map.html\'" value="Mapa" />') 
})

app.get('/buyerData.json',function(req,response){
            response.writeHead(200, {  
                'Content-Type': 'application/json'  
            });  

            fs.readFile('json/buyerData.json', function (err, data) {
                if (err) throw err;
                var bd = JSON.parse(data);  
                response.end(JSON.stringify(bd));
            });
})

app.get('/map.html', function (req, res) {
    res.sendFile( __dirname + "/" + "map.html" ); 
    
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server de MercadoLibre4AO, en http://%s:%s", host, port)
})