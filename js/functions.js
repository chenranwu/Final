
//switch navibar
(function($) {

	var tabs =  $(".navbar-nav ml-auto li a");

	tabs.click(function() {
		var masthead = this.hash.replace('/','');
		tabs.removeClass("nav-link js-scroll-trigger");
		$(this).addClass("nav-link js-scroll-trigger");
    $("#masthead> aside").hide();
    $(masthead).fadeIn(200);
	});

})(jQuery);


$('.navbar-nav ml-auto li').click(function(){
    $('.navbar-nav ml-auto li').removeClass('nav-item');
    $(this).addClass('nav-item');
});

var welcomebutton = $("#welcome_button");

welcomebutton.click(function(){
  $('#welcome_page').hide();
}
);

var targetPoint = turf.point([28.965797, 41.010086], {"marker-color": "#0F0"});
var points = turf.featureCollection([
    turf.point([28.973865, 41.011122]),
    turf.point([28.948459, 41.024204]),
    turf.point([28.938674, 41.013324])
]);

var nearest = turf.nearestPoint(targetPoint, points);
