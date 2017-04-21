var earth;

//3D Map Generator From WebGL Library
function initialize() {
  //Sets the map position and boundaries
  var mapBounds = [[-85, -180], [85, 180]];
  var mapMinZoom = 0;
  var mapMaxZoom = 5;
  var center = [0, 0];
  var options = {zoom: 2.8, position: center};
  earth = new WE.map('mapid', options);
  //Calls the map image layer from the Mapbox url -
  var layer = WE.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHVieWEiLCJhIjoiY2owZDFoMHRsMDAydDMzb2QzZWUycDNiayJ9.VWmWF8th7jYz_fTrJVwUpA', {
    bounds: mapBounds,
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom
  });
  layer.addTo(earth);
}

initialize();


// Start a simple rotation animation
var before = null;
requestAnimationFrame(function animate(now) {
  var c = earth.getPosition();
  var elapsed = before? now - before: 0;
  before = now;
  earth.setCenter([c[0], c[1] + 0.4*(elapsed/30)]);
  requestAnimationFrame(animate);
});



var showInfo = function(e) {
console.log("Latitude: " +e.latitude + ', ' + " Longitude: " + e.longitude);
}
earth.on('click', showInfo);

//hide start button
$('.start-button').click(function() {
    $(this).hide();
});

//trivia window
$('.start-game').click(function(){
  $('#slideout').toggleClass('on');
});
