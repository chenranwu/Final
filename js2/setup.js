
mapboxgl.accessToken = 'pk.eyJ1Ijoid2NoZW5yYW4iLCJhIjoiY2pmNGNpc2I4MTBzdDJ3bXFpY29ya216cyJ9.MYjrBjhUl9-lj2WU7Ekdww';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 13,
    center: [-75.163746, 39.952560],
    pitch: 60,
    bearing: 9.5,
    hash: true,
});
map.addControl(new mapboxgl.NavigationControl());
/*var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    if(layerId == 'customized'){
       map.setStyle('http://osm-liberty.lukasmartinelli.ch/style.json');
    }
    else{
       map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
    }

}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}
*/
