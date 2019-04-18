const fs = require('fs');
var request = require("request")


exports.buscarCompradores=function(){
    console.log("BUSCANDO COMPRADORES")
    fs.readFile('./json/token.json', function(err, data) {
    var my_token = JSON.parse(data);
    var burl = "https://api.mercadolibre.com/orders/search?seller="+ my_token["user_id"] +"&access_token="+ my_token["access_token"];

    request({url: burl,json: true}, function (error, response, bodi) {
        var name;
        var lat;
        var long;
        var latlong;
		if (!error && response.statusCode === 200) {
            if (Object.keys(bodi.results).length != undefined){
                for (var i = 0; i < Object.keys(bodi.results).length; i++) {
                    name = bodi.results[i].buyer.nickname;
                    lat = JSON.stringify(bodi.results[i].shipping.receiver_address.latitude);
                    long = JSON.stringify(bodi.results[i].shipping.receiver_address.longitude);
                    latlong = { "name" : name , "lat" : lat , "long" : long };

                    fs.readFile('./json/buyerData.json', function(errore, dataso) {
                        var bjason = JSON.parse(dataso);
                        if (Object.keys(bjason.Address).length != 0) {
                            for (var j = 0; j < Object.keys(bjason.Address).length; j++) {
                                if (JSON.stringify(bjason.Address[j]) != JSON.stringify(latlong) && j == JSON.stringify(bjason.Address).length) {
                                    bjason.Address[Object.keys(bjason.Address).length] = latlong;
                                    fs.writeFile('./json/buyerData.json',JSON.stringify(bjason), function (errore) {if (errore) throw errore;});
                                }
                            }
                        } else {
                            bjason.Address[Object.keys(bjason.Address).length] = latlong;
                            fs.writeFile('./json/buyerData.json',JSON.stringify(bjason), function (errore) {if (errore) throw errore;});
                        }                                
                    });  
                   
                }
            }else{
                console.log('error indefinido');    
            }    
        }else{
            console.log('error '+ response.statusCode);
        }
    });
    });
} 