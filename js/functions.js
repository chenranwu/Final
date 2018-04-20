
var welcomebutton = $("#welcome_button");

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
