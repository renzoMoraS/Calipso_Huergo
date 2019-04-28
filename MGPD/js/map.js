const fs = require('fs');
var request = require("request");


exports.buscarCompradores=function(){
    console.log("BUSCANDO COMPRADORES");
    fs.readFile('./json/token.json', function(err, data) {
        var my_token = JSON.parse(data);
        var burl = "https://api.mercadolibre.com/orders/search?seller="+ my_token["user_id"] +"&order.status=paid&access_token="+ my_token["access_token"];

        request({url: burl,json: true}, function (error, response, bodi) {
            var name;
            var lat;
            var long;
            var latlong;
            var cont = 0;
            var same = false;
		    if (!error && response.statusCode === 200) {
                fs.writeFile('./json/buyerData.json','{"Address":[]}', function (errore) {if (errore) throw errore;});
                
                fs.readFile('./json/buyerData.json', function(errore, dataso) {
                    var bjason = JSON.parse(dataso);
                    if (Object.keys(bodi.results).length != undefined && Object.keys(bodi.results).length != 0 ){
                        for (var i = 0; i < Object.keys(bodi.results).length; i++) {
                            console.log(bodi.results[i].shipping);
                            if (bodi.results[i].shipping.receiver_address != undefined && bodi.results[i].shipping.receiver_address.id != null){
                                name = bodi.results[i].buyer.nickname;
                                lat = JSON.stringify(bodi.results[i].shipping.receiver_address.latitude);
                                long = JSON.stringify(bodi.results[i].shipping.receiver_address.longitude);
                                latlong = { "name" : name , "lat" : lat , "long" : long };
                            
                                bjason.Address[cont] = latlong;
                                fs.writeFile('./json/buyerData.json',JSON.stringify(bjason), function (errore) {if (errore) throw errore;});
                                cont++;
                            }else{console.log('No se puede saber la ubicacion del comprador');} 
                        }
                    }
                    
                });
            }else{console.log('error '+ response.statusCode);}
        });
    });
}
