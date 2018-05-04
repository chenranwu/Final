
var welcomebutton = $("#welcome_button");
var originlocation = { lat: 0, lng: 0 };
var framesPerSecond = 20;
var initialOpacity = 0.5;
var opacity = initialOpacity;
var initialRadius = 3;
var radius = initialRadius;
var maxRadius = 1000;

function openNav() {
    document.getElementById("mySidenav").style.width = "225px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className =
        x.previousElementSibling.className.replace("w3-black", "w3-blue");
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className =
        x.previousElementSibling.className.replace("w3-blue", "w3-black");
    }
}


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

        map.addSource('point', {
                "type": "geojson",
                "data": {
                    "type": "Point",
                    "coordinates": [
                      originlocation.lng,
                      originlocation.lat,
                    ]
                }
            });

            map.addLayer({
                "id": "point",
                "source": "point",
                "type": "circle",
                "paint": {
                    "circle-radius": initialRadius,
                    "circle-radius-transition": {duration: 0},
                    "circle-opacity-transition": {duration: 0},
                    "circle-color": "#373635",
                    "circle-stroke-color": "#729cc2",
                    "circle-stroke-width": 3,
                    "circle-pitch-alignment": "map"
                },
            });

            map.addLayer({
                "id": "point1",
                "source": "point",
                "type": "circle",
                "paint": {
                    "circle-radius": initialRadius,
                    "circle-color": "#729cc2",
                    "circle-stroke-color": "#729cc2",
                    "circle-pitch-alignment": "map"
                },
            });


            function animateMarker(timestamp) {
                setTimeout(function(){
                    requestAnimationFrame(animateMarker);

                    radius += (maxRadius - radius) / framesPerSecond;
                    opacity -= ( .9 / framesPerSecond );

                    if (opacity <= 0) {
                        radius = initialRadius;
                        opacity = initialOpacity;
                    }

                    map.setPaintProperty('point', 'circle-radius', radius);
                    map.setPaintProperty('point', 'circle-opacity', opacity);



                }, 3000 / framesPerSecond);

            }

            // Start the animation.
            animateMarker(0);
            Demo1.className += " w3-show";
            Demo1.previousElementSibling.className =
            Demo1.previousElementSibling.className.replace("w3-black", "w3-blue");
            openNav();

      });
    });
  }
  else {
    alert("Unable to access geolocation API!");
  }
});
