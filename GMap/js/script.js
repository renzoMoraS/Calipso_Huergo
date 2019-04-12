 // JavaScript source code
function inicializar() {
    //Opciones del mapa
    var OpcionesMapa = {
        center: new google.maps.LatLng(-24.5000000, -69.2500000),
        mapTypeId: google.maps.MapTypeId.SATELLITE, //ROADMAP  SATELLITE HYBRID TERRAIN
        mapMaker: true,
        zoom: 3
    };
 
    var miMapa;
    //constructor
    miMapa = new google.maps.Map(document.getElementById('mapa'), OpcionesMapa);

    var geocoder = new google.maps.Geocoder();

    var address = "Aristobulo del Valle 1444, Barracas, Ciudad Autonoma de Buenos Aires, Buenos Aires, Argentina";
    if(address!=''){
        // Llamamos a la función geodecode pasandole la dirección que hemos introducido en la caja de texto.
        geocoder.geocode({ 'address': address}, function(results, status){
            if (status == 'OK'){
                // Posicionamos el marcador en las coordenadas obtenidas
                miMapa.marker = new google.maps.Marker({position: {lat: 0, lng: 0}});
                miMapa.marker.setPosition(results[0].geometry.location);
                miMapa.marker.setMap(miMapa.map);
            }else{
                console.log(status);
            }
        });
    }
}
 
function CargaScript() {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=inicializar';
    document.body.appendChild(script);                 
}
 
window.onload = CargaScript;

