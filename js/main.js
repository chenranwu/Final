
//load data
var url = 'https://www.rideindego.com/stations/json/';

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

         'fill-extrusion-height': [
             "interpolate", ["linear"], ["zoom"],
             5, 0,
             5.05, ["get", "height"]
         ],
         'fill-extrusion-base': [
             "interpolate", ["linear"], ["zoom"],
             5, 0,
             5.05, ["get", "min_height"]
         ],
         'fill-extrusion-opacity': .6
     }
 }, labelLayerId);

    map.addSource('rideindego', { type: 'geojson', data: url });
    map.getSource('rideindego').setData(url);
    map.loadImage('https://raw.githubusercontent.com/chenranwu/Final/master/img/bike.png', function(error, image) {
    if (error) throw error;
    map.addImage('bike', image);
    map.addLayer({
        "id": "test",
        "type": "symbol",
        "source": "rideindego",
        "paint": {
          "icon-opacity":0.8
        },
        "layout": {
            "icon-image": "bike",
            "icon-size": 0.04
        }
    });
});
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
      feature.properties.addressStreet + '</p><p>'+ feature.properties.openTime +  "~" + feature.properties.closeTime + '</p><h4><strong>' +
       feature.properties.bikesAvailable + '</strong> Bikes</h4><h4><strong>' +
       feature.properties.docksAvailable + '</strong> Docks </h4>' + '<button class="w3-button w3-blue" id="choose" style="margin-left:10px;">Choose This Station</button>'
)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);
      Demo2.className += " w3-show";
      Demo2.previousElementSibling.className =
      Demo2.previousElementSibling.className.replace("w3-black", "w3-blue");

      $("#choose").click(function(e) {
        var rounturl;
        var destination;
            rounturl = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + originlocation.lng+ ',' + originlocation.lat + ';' + feature.properties.longitude + ',' + feature.properties.latitude + '?access_token=pk.eyJ1Ijoid2NoZW5yYW4iLCJhIjoiY2pmNGNpc2I4MTBzdDJ3bXFpY29ya216cyJ9.MYjrBjhUl9-lj2WU7Ekdww';
            console.log(rounturl);
            $.getJSON(rounturl,function(){console.log("success");}).done(function(rount){
              console.log(rount);
              onerount = rount.routes[0].geometry;
              console.log(onerount);
              onerount = decode(onerount);
              _.each(onerount,function(array){
                var temp = 0;
                temp = array[0];
                array[0] = array[1];
                array[1] = temp;
              });
              console.log(onerount);
              map.addLayer({
                  "id": "firstroute",
                  "type": "line",
                  "source": {
                       "type": "geojson",
                       "data": {
                       "type": "Feature",
                       "properties": {},
                       "geometry": {
                             "type": "LineString",
                             "coordinates": onerount
                        }
                  }
              },
                 "layout": {
                 "line-join": "round",
                 "line-cap": "round"
              },
                 "paint": {
                    "line-color": "#519AD6",
                    "line-width": 3,
                    "line-dasharray": [3,3]
             }
               });
               Demo3.className += " w3-show";
               Demo3.previousElementSibling.className =
               Demo3.previousElementSibling.className.replace("w3-black", "w3-blue");
            });
            map.addSource('singlepoint', {
                 "type": "geojson",
                 "data": {
                 "type": "FeatureCollection",
                 "features": []
                          }
               });

           map.addLayer({
                 "id": "destpoint",
                 "source": "singlepoint",
                 "type": "circle",
                 "paint": {
                 "circle-radius": 10,
                 "circle-color": "#007cbf"
                }
               });

             geocoder.on('result', function(ev) {
             map.getSource('singlepoint').setData(ev.result.geometry);
             destination=ev.result;
             console.log(destination);
             Demo4.className += " w3-show";
             Demo4.previousElementSibling.className =
             Demo4.previousElementSibling.className.replace("w3-black", "w3-blue");
         });
         $("#Go").click(function(e) {
           var rounturl2;
               rounturl2 = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + destination.center[0] + ',' + destination.center[1] + ';' + feature.properties.longitude + ',' + feature.properties.latitude + '?access_token=pk.eyJ1Ijoid2NoZW5yYW4iLCJhIjoiY2pmNGNpc2I4MTBzdDJ3bXFpY29ya216cyJ9.MYjrBjhUl9-lj2WU7Ekdww';
               console.log(rounturl2);
               $.getJSON(rounturl2,function(){console.log("success");}).done(function(rount){
                 console.log(rount);
                 onerount = rount.routes[0].geometry;
                 console.log(onerount);
                 onerount = decode(onerount);
                 _.each(onerount,function(array){
                   var temp = 0;
                   temp = array[0];
                   array[0] = array[1];
                   array[1] = temp;
                 });
                 console.log(onerount);
                 map.addLayer({
                     "id": "secondroute",
                     "type": "line",
                     "source": {
                          "type": "geojson",
                          "data": {
                          "type": "Feature",
                          "properties": {},
                          "geometry": {
                                "type": "LineString",
                                "coordinates": onerount
                           }
                     }
                 },
                    "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                 },
                    "paint": {
                       "line-color": "#79ABB5",
                       "line-width": 5,
                }
                  });
               });
         });

      });

    });
});

map.addControl(new mapboxgl.NavigationControl());
