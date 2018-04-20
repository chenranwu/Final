
var welcomebutton = $("#welcome_button");

welcomebutton.click(function(){
  $('#welcome_page').hide();
}
);


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
