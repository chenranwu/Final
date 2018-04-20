
var welcomebutton = $("#welcome_button");

welcomebutton.click(function(){
  $('#welcome_page').hide();
}
);


<<<<<<< HEAD
document.getElementById('welcome_button').addEventListener('click', function () {

  var state = {
    position: {
      marker: null,
      updated: null
    }
  };

  var originlocation = {"lat":0,"lng":0};

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

     map.loadImage('', function(error, image) {
     if (error) throw error;
     map.addImage('cat', image);
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
           "icon-image": "cat",
           "icon-size": 0.25
       }
   });
});


     });
   }
   else {
     alert("Unable to access geolocation API!");
   }


});
=======
// Plot Nearest Station using leafletKnn
var plotNearest = function(feature){
  nearest = leafletKnn(feature).nearest(L.latLng($('#lat').val(),$('#lon').val()), 1);
  nearestmarkers = [];
  _.each(nearest,function(obj){
    nearestmarkers.push(L.marker([obj.lat,obj.lon],{icon: myIcon}));
  });
  addNear=_.each(nearestmarkers,function(markers){markers.addTo(map);});
  return addNear;
};
>>>>>>> 86762aba19611da5a2ad0fe82ebefc36f470a6a0
