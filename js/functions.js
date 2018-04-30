
var welcomebutton = $("#welcome_button");
var originlocation = { lat: 0, lng: 0 };
let timer;
const updatePtSrc = (point) => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          point.lng,
          point.lat,
        ]
      }
    }]
  },
});

const updateCircleLyr = (lyrName, radius, mapping) =>
  // test if layer exists
  mapping.getLayer(lyrName) && map.setPaintProperty(lyrName, 'circle-radius', radius);

welcomebutton.click(function () {
  $('#welcome_page').hide();
}
);


document.getElementById('welcome_button').addEventListener('click', function () {

  var state = {
    position: {
      marker: null,
      updated: null
    }
  };

  var updatePosition = function (lat, lng, updated) {
    state.position.updated = updated;
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
      originlocation.lat = position.coords.latitude;
      originlocation.lng = position.coords.longitude;

      map.flyTo({
        center: [
          originlocation.lng,
          originlocation.lat],
        zoom: 17
      });

      map.loadImage('https://raw.githubusercontent.com/chenranwu/Final/master/img/people.png', function (error, image) {
        if (error) throw error;
        map.addImage('people', image);

        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [
                    originlocation.lng,
                    originlocation.lat,
                  ]
                }
              }]
            }
          },
          layout: {
            'icon-image': 'people',
            'icon-size': 0.20
          }
        });

        // calculate the dynamic's point circle layer src in map;
        const ptSrc = updatePtSrc(originlocation);
        map.addSource('dynamicPt', ptSrc);
        map.addLayer({
          id: 'dynamicPt',
          type: 'circle',
          source: 'dynamicPt',
          paint: {
            'circle-color': 'yellow',
            'circle-opacity': 0.75,
            'circle-radius': 5
          }
        })

        // listen to the map data event, when map finished loading layer, set interval
        map.on('data', ev => {
          if (ev.dataType === 'source' && ev.isSourceLoaded) {
            let i = 1;
            timer = window.setInterval(() => {
              if (i < 50) {
                const radius = i * 5;
                updateCircleLyr('dynamicPt', radius, map);
                i++;
              } else {
                // // if want to stop when reached max, stop.
                // can also to be canlled by other events
                // window.clearInterval(timer)
                // if want to be a infinite loop
                i = 1;
              }
              // update per 100ms
            }, 100)
          }
        });
      });
    });
  }
  else {
    alert("Unable to access geolocation API!");
  }
});


var targetPoint = turf.point([originlocation.lng, originlocation.lat]);
var points = turf.featureCollection([
  turf.point([28.973865, 41.011122]),
  turf.point([28.948459, 41.024204]),
  turf.point([28.938674, 41.013324])
]);

var nearest = turf.nearestPoint(targetPoint, points);
