
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
	x = document.getElementById("Demo1");
	x.className += " w3-show";
	x.previousElementSibling.className =
	x.previousElementSibling.className.replace("w3-black", "w3-blue");
}
);

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
//get number of docks



$('.window2').hide();
$('.window3').hide();


//get number of docks


$(document).ready(function () {
	var dock=15;
	var count="pred15";
	var cost = "cost15";
	var balance = "costben15";
	document.getElementById('range-picker').addEventListener('click', function(e) {
		x = document.getElementById("Demo2");
		x.className += " w3-show";
		x.previousElementSibling.className =
		x.previousElementSibling.className.replace("w3-black", "w3-blue");
		map.setPaintProperty('hex-3d', "fill-extrusion-color",{
			"property":count,"stops": [
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
			[20000, 'hsl(356,100%,13%)']]});
		map.setPaintProperty('hex-3d', 'fill-extrusion-height',{
			"property": count,
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
				[20000, 5000]]});
		map.setPaintProperty('hex-2d', "fill-extrusion-color",{
				"property":count,"stops": [
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
				[20000, 'hsl(356,100%,13%)']]});
		var sizeList = document.getElementById('range-picker').children;
		for (var i = 0; i <= sizeList.length - 1; i++) {
			console.log(sizeList[i].classList);
			if (sizeList[i].classList.contains('active')) {
				console.log(i);
				dock= 5*(i+2);
				count = "pred" + dock;
				cost = "cost" + dock;
				balance = "costben"+ dock;
				sizeList[i].classList.remove('active');
			}
		}
		e.target.classList.add('active');
	});
    $('.bar-container input[type="checkbox"]').change(function () {
        if (!this.checked){
					console.log("1");
					$('.window2').hide();
					$('.window3').hide();
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
				}
        else{
						x = document.getElementById("Demo3");
						x.className += " w3-show";
						x.previousElementSibling.className =
						x.previousElementSibling.className.replace("w3-black", "w3-blue");
					map.removeLayer("hex-3d");
			    map.addLayer({
			        "id": "hex-2d",
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
									"fill-extrusion-height":10,
			        },
			        "layout": {
			        }
			    });
					map.addLayer({
					        "id": "hex-2d-hover",
					        "type": "fill-extrusion",
					        "source": "hex",
					        "paint":{
					          'fill-extrusion-opacity': 0.75,
					          "fill-extrusion-color": "yellow",
										"fill-extrusion-height":10,
					        },
					        "filter": ["==", "idhex", ""],
					        "layout": {
					        }
					    });
					map.on("click", "hex-2d", function(e) {
						x = document.getElementById("Demo4");
						x.className += " w3-show";
						x.previousElementSibling.className =
						x.previousElementSibling.className.replace("w3-black", "w3-blue");
					    map.setFilter("hex-2d-hover", ["==", "idhex", e.features[0].properties.idhex]);
							console.log(5);
          $('#tripcount-num').text(e.features[0].properties[count]);
          $('#cost-num').text("$"+ e.features[0].properties[cost]);
          $('#cost-benefit-num').text("$"+e.features[0].properties[balance]);
          $('#population-num').text(e.features[0].properties.pop);
          $('#median-age-num').text(e.features[0].properties.age);
          $('#medincome-num').text("$"+ e.features[0].properties.income);
          $('#dis-CBD-num').text(parseInt(e.features[0].properties.dis_cbd) + " ft");
          $('#dis-septa-num').text(parseInt(e.features[0].properties.dis_sub) + " ft");
          $('#dis-crime-num').text(parseInt(e.features[0].properties.dis_10crim) + " ft");
					});
					$('.window2').show();
					$('.window3').show();}
    });
});
