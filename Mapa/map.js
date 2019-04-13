const fs = require('fs');
var request = require("request")

var url = "https://api.mercadolibre.com/orders/search/archived?seller=425828201&access_token="

fs.readFile('../ServerFede/token.json', function(err, data) {
  var my_token = JSON.parse(data);
  url = url + my_token["access_token"];

  request({url: url,json: true}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			for (var i = 0; i <= body.available_filters[6].values.length; i++) {
				if (body.available_filters[6].values[i] != undefined) {
				console.log(body.available_filters[6].values[i].id);
				}
			}
    }else{
      console.log(body);
    }
  });
});
//shipping.service_id


//  var direccion = comprador.shipping.receiver_address.country.name+ ", " +comprador.shipping.receiver_address.state.name + ", " +comprador.shipping.receiver_address.city.name+ ", " +comprador.shipping.receiver_address.address_line+"\n"+"\n";
//  fs.appendFile('./LugaresDeMisCompradores.txt',direccion, function (err) {if (err) throw err;});

