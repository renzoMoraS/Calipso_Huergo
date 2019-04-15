const fs = require('fs');
var request = require("request")

var url = "https://api.mercadolibre.com/orders/search?seller=425828201&access_token="

fs.readFile('../ServerFede/token.json', function(err, data) {
    var my_token = JSON.parse(data);
    url = url + my_token["access_token"];

    request({url: url,json: true}, function (error, response, bodi) {
        var name;
        var lat;
        var long;
        var latlong;
		if (!error && response.statusCode === 200) {
            if (Object.keys(bodi.results).length != undefined){
                for (var i = 0; i < Object.keys(bodi.results).length; i++) {
                    name = JSON.stringify(bodi.results[i].buyer.nickname);
                    lat = JSON.stringify(bodi.results[i].shipping.receiver_address.latitude);
                    long = JSON.stringify(bodi.results[i].shipping.receiver_address.longitude);
                    latlong = '{ "name" : ' + name + ', "lat" : "' + lat + '", "long" : "'+ long + '"}' + '\n';
                    fs.appendFile('../GMap/buyerData.json',latlong, function (err) {if (err) throw err;});     
                }
            }else{
                console.log('error indefinido');    
            }    
        }else{
            console.log('error '+ statusCode);
        }
    });
});