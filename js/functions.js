
var welcomebutton = $("#welcome_button");
var originlocation = {"lat":0,"lng":0};

welcomebutton.click(function(){
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



   var updatePosition = function(lat, lng, updated) {
     state.position.updated = updated;
   };

   if ("geolocation" in navigator) {
     navigator.geolocation.getCurrentPosition(function(position) {
       updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
       originlocation.lat = position.coords.latitude;
       originlocation.lng = position.coords.longitude;
       console.log(originlocation);
       map.flyTo({
           center: [
               originlocation.lng,
               originlocation.lat],
           zoom: 17
       });

       var currentlocation = {
         "type": "Point",
         "coordinates": [
            originlocation.lng,
            originlocation.lat,
        ]
      };

     map.loadImage('https://raw.githubusercontent.com/chenranwu/Final/master/img/people.png', function(error, image) {
     if (error) throw error;
     map.addImage('people', image);
     map.addLayer({
       "id": "points",
       "type": "symbol",
       "source": {
           "type": "geojson",
           "data": {
               "type": "FeatureCollection",
               "features": [{
                   "type": "Feature",
                   "geometry": currentlocation
               }]
           }
       },
       "layout": {
           "icon-image": "people",
           "icon-size": 0.20
       }
   });
   plotNearest();
});


     });
   }
   else {
     alert("Unable to access geolocation API!");
   }


});

// Plot Nearest Station using leafletKnn
var plotNearest = function(feature){
  console.log(targetPoint);
  nearest = leafletKnn(feature).nearest(L.latLng($('#lat').val(),$('#lon').val()), 1);
  nearestmarkers = [];
  _.each(nearest,function(obj){
    nearestmarkers.push(L.marker([obj.lat,obj.lon],{icon: myIcon}));
  });
  addNear=_.each(nearestmarkers,function(markers){markers.addTo(map);});
  return addNear;
};

var targetPoint = turf.point([originlocation.lng, originlocation.lat]);
var points = turf.featureCollection([
    turf.point([28.973865, 41.011122]),
    turf.point([28.948459, 41.024204]),
    turf.point([28.938674, 41.013324])
]);

var nearest = turf.nearestPoint(targetPoint, points);
