function inicializar(){

    var map = L.map('map').setView([-17.0568696, -64.9912286], 3);

        mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; ' + mapLink + ' Contributors',maxZoom: 18,}).addTo(map);
    
        fs.readFile('../Mapa/buyerData.json', function(err, data) {
            var marks = JSON.parse(data);
            
            var map = L.map('map').setView([-17.0568696, -64.9912286], 3);
            mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
            L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 18,
                }).addTo(map);
    
            for (var i = 0; i < marks.length; i++) {
                marker = new L.marker([marks[i].lat,marks[i].long]).bindPopup(marks[i].name).addTo(map);
            }
        });
}

window.onload = inicializar;

/* 


        $.getJSON( "../../Mapa/buyerData.json", function( data ) {
        var marks = JSON.parse(data);
    
        for (var i = 0; i < marks.length; i++) {
            marker = new L.marker([marks[i].lat,marks[i].long]).bindPopup(marks[i].name).addTo(map);
        }
        });

*/

