
//load data
var url = "https://raw.githubusercontent.com/zhaoanbei/practicum_data/master/pred426.geojson";

// Some data to render. The IDs are the NUTS area IDs


function getColor(d) {
      d = Number(d);
    return  d > 5000   ? '#f46d43' :
            d > 0   ?  '#fee090' :
            d > (-10000)    ? '#e0f3f8' :
            d > (-12000)   ? '#abd9e9' :
            d > (-14000)   ? '#74add1' :
                        '#4575b4';
}

function getHeight(d) {
      d = Number(d);
    return  d > 5000   ? '#f46d43' :
            d > 0   ?  '#fee090' :
            d > (-10000)    ? '#e0f3f8' :
            d > (-12000)   ? '#abd9e9' :
            d > (-14000)   ? '#74add1' :
                        '#4575b4';
}



map.on('load', function() {
  // Insert the layer beneath any symbol layer.
 var layers = map.getStyle().layers;

 var labelLayerId;
 for (var i = 0; i < layers.length; i++) {
     if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
         labelLayerId = layers[i].id;
         break;
     }
 }
  // Insert the 3-D Building layer
 map.addLayer({
     'id': '3d-buildings',
     'source': 'composite',
     'source-layer': 'building',
     'filter': ['==', 'extrude', 'true'],
     'type': 'fill-extrusion',
     'minzoom': 5,
     'paint': {
         'fill-extrusion-color': '#aaa',

         'fill-extrusion-height': 0,
         'fill-extrusion-base': [
             "interpolate", ["linear"], ["zoom"],
             5, 0,
             5.05, ["get", "min_height"]
         ],
         'fill-extrusion-opacity': 0.6
     }
 }, labelLayerId);

    map.addSource('hex', { type: 'geojson', data: url });
    map.getSource('hex').setData(url);
    map.addLayer({
        "id": "hex-3d",
        "type": "fill-extrusion",
        "source": "hex",
        "paint":{
          'fill-extrusion-opacity': 0.75,
          "fill-extrusion-color": {
            "property": 'pred10',
            "stops": [
              [0, 'hsl(203,73%,67%)'],
              [50, 'hsl(187,56%,69%)'],
              [100, 'hsl(161,47%,76%)'],
              [200, 'hsl(44,45%,99%)'],
              [300, 'hsl(36,53%,99%)'],
              [450, 'hsl(30,62%,99%)'],
              [700, 'hsl(14,73%,96%)'],
              [1000, 'hsl(353,71%,84%)'],
              [2500, 'hsl(335,99%,62%)'],
              [5000, 'hsl(356,99%,50%)'],
              [10000, 'hsl(356,99%,27%)'],
              [20000, 'hsl(356,100%,13%)']]},
          'fill-extrusion-height':{
            "property": 'pred10',
            "stops": [
              [0, 200],
              [50, 250],
              [100, 300],
              [200, 400],
              [300, 500],
              [450, 600],
              [700, 700],
              [1000, 800],
              [2500, 1000],
              [5000, 2000],
              [10000, 3000],
              [20000, 5000]]},
        },
        "layout": {
        }
    });
openNav();
});

var docks=[[10,pred10],[15,pred15],[20,pred20],[25,pred25],[30,pred30],[35,pred35]];

var swatches = document.getElementById('swatches');
var layer = document.getElementById('layer');

docks.forEach(function(dock) {
    var swatch = document.createElement('button');
    swatch.style.value = dock[0];
    property=dock[1];
    swatch.addEventListener('click', function() {
        map.setPaintProperty(layer.value, 'property', property);
    });
    swatches.appendChild(swatch);
});

map.addControl(new mapboxgl.NavigationControl());
/*
    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
           layers: ['test']
         });

        if (!features.length) {
        return;
      }
      var feature = features[0];
      console.log(feature);
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>' + feature.properties.name + '</h3><p>' +
      feature.properties.addressStreet + '</p><h4><strong>' +
       feature.properties.bikesAvailable + '</strong> Bikes</h4><h4><strong>' +
       feature.properties.docksAvailable + '</strong> Docks </h4>'
)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
    });*/
