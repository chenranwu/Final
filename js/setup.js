
mapboxgl.accessToken = 'pk.eyJ1Ijoid2NoZW5yYW4iLCJhIjoiY2pmNGNpc2I4MTBzdDJ3bXFpY29ya216cyJ9.MYjrBjhUl9-lj2WU7Ekdww';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 14,
    center: [-75.163746, 39.952560],
    pitch: 60,
    bearing: 9.5,
    hash: true,
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

map.addControl(geocoder);
