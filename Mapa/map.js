const fs = require('fs');
var request = require("request")

var url = "https://api.mercadolibre.com/orders/1986165555?access_token="

fs.readFile('../ServerFede/token.json', function(err, data) {
  var my_token = JSON.parse(data);
  url = url + my_token["access_token"];

  request({url: url,json: true}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
      var mybuyer = JSON.stringify(body);
      fs.writeFile('./buyerData.json',mybuyer, function (err) {if (err) throw err;});
    }else{
      console.log(body);
    }
  });
});

fs.readFile('./buyerData.json', function(err, data) {

  var comprador = JSON.parse(data);
  var direccion = comprador.shipping.receiver_address.country.name+ ", " +comprador.shipping.receiver_address.state.name + ", " +comprador.shipping.receiver_address.city.name+ ", " +comprador.shipping.receiver_address.address_line+"\n"+"\n";
  fs.appendFile('./LugaresDeMisCompradores.txt',direccion, function (err) {if (err) throw err;});

});

