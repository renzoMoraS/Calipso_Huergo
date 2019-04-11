const fs = require('fs');
var request = require("request")

var url ='https://api.mercadolibre.com/users/test_user?access_token=';
var method="POST";
var headers={"Content-Type" : "application/json", "site_id":"MLA"};
var form ='{"site_id":"MLA"}'


fs.readFile('../Mapa/token.json', function(err, data) {
	var my_token = JSON.parse(data);
	url = url + my_token["access_token"];
	console.log(url);
	request.post({url: url,form:form ,headers:headers,json: true}, function (error, response, body) {
		var myuser = JSON.stringify(body);
		fs.writeFile('./userTest2.json',myuser, function (err) {if (err) throw err;});

	});
});