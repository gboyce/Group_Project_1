//Create a Variable to hold the map
var earth;
var milesDistance = 0;
var coords = [];
var lineArray = [];
var markerArray = [];
var marker = [];
var polygon;
var score = 0;
var i = 0;

// Instantiate the wrapper
var spotifyApi = new SpotifyWebApi();

// Set the variables

// var trackId ='';
// var genre ='';
var artist ='';
var artist_id ='';
var album_art ='';
var preview_url ='';


var locArray = [
  {lt: 48.8566, lg: 2.35225, loc: "Paris", col:'#f511c7', trackId:'045sp2JToyTaaKyXkGejPy'},//Paris
  {lt: 39.9042, lg: 116.4074, loc: "Beijing", col: '#dfa819', trackId:'6lEIjrQNwJPecJ7mMXjhjo'}, //Beijing,
  {lt: 55.7558, lg: 37.6173, loc: "Moscow", col: '#aa58d0', trackId: '1EaKU4dMbesXXd3BrLCtYG'}, //Moscow,
  {lt: 40.1728, lg: -74.0059, loc: "New York", col: '#100ce3', trackId:'7KXjTSCq5nL1LoYtL7XAwS'}
];

//Function to Generate the 3D Map From WebGL Library
function initialize() {
  //Sets the Globe Position and Boundaries
  var mapBounds = [[-85, -180], [85, 180]];
  var mapMinZoom = 0;
  var mapMaxZoom = 8;
  var center = [0, 0];
  //Globe Start Position
  var options = {zoom: 2.8, position: center};
  earth = new WE.map('mapid', options);
  //Calls the map image layer from the Mapbox url -
  var layer = WE.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHVieWEiLCJhIjoiY2owZDFoMHRsMDAydDMzb2QzZWUycDNiayJ9.VWmWF8th7jYz_fTrJVwUpA', {
    bounds: mapBounds,
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom
  });
  layer.addTo(earth);

  // Start a simple rotation animation
  var before = null;
  requestAnimationFrame(function animate(now) {
    var c = earth.getPosition();
    var elapsed = before? now - before: 0;
    before = now;
    earth.setCenter([c[0], c[1] + 0.10*(elapsed/30)]);
    requestAnimationFrame(animate);
  });

}

initialize();


//Distance between two markers ----> http://stackoverflow.com/questions/43167417/calculate-distance-between-two-points-in-leaflet
function getDistance(origin, destination) {
    // Return distance in meters
    var lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    var metersDistance =  c * EARTH_RADIUS * 1000;

    // Convert meters to miles ---> http://stackoverflow.com/questions/20674439/how-to-convert-meter-to-miles
    milesDistance = Math.round(metersDistance*0.000621371192);
    console.log(milesDistance);


    function addScore() {
     document.getElementById("score").innerHTML=('Your score: ' + score);
    }

    if (milesDistance > 1000) {
      score += 100;
      addScore();
    } else if (milesDistance < 500) {
      score += 500;
      addScore();
    } else if (milesDistance < 200) {
      score += 1000;
      addScore();
    } else {
      alert("You are here.");
    }
};

function toRadian(degree) {
    return degree*Math.PI/180;
};

function lineBetween(B, A, x) {
    coords = [];
    var N = 100;

    var m = (A.lt - A.lg) / (B.lt - B.lg)
    for (var i = 0; i < N; i++) {
        var lt = A.lt - i / N * (A.lt - B.lt);
        var lg = A.lg - i / N * (A.lg - B.lg)

        coords.push([lt, lg]);
        coords.unshift([lt, lg]);
    }
    var options = {color: x, opacity: 1, fillColor: x, fillOpacity: 0.1, weight: 3};
    polygon = WE.polygon(coords, options).addTo(earth);

    // marker gets pushed into the marker array
    lineArray.push(polygon);
    //displays the marker on the globe
      for(var i = 0; i < lineArray.length; i++) {
    //addTo function displays the marker on the globe
        // lineArray[i].addTo(earth);
        if(lineArray.length > 2) {
    //this removes previous marker from globe and array
          // var destroyLine = lineArray[0];
          // destroyLine.destroy(earth);
          // lineArray[1].removeFrom(earth);
          lineArray.splice(0,1);
        }
      }

  };





function onMapClick(e) {

    x = locArray[i];
    y = locArray[i].col;



    //creates the line connecting user clickpoint to Houston
    getDistance([e.latitude, e.longitude], [locArray[i].lt, locArray[i].lg]);
    createMarker(e, x);
    marker.bindPopup("<b>Hello world!</b><br>I am " + milesDistance + " miles from" + locArray[i].loc +".<br /><span style='font-size:10px;color:#999'></span>", {maxWidth: 150, closeButton: true}).openPopup();
    var lineA = {lt: e.latitude, lg:e.longitude};
    var lineB = {lt: locArray[i].lt, lg: locArray[i].lg};
    lineBetween(lineB, lineA, y);


    i++
    if (i>4) {
      i=0;
    }
}







function createMarker(e, x) {
  // marker.removeFrom(earth);
  console.log("Latitude: " +e.latitude + ', ' + " Longitude: " + e.longitude);
//generates a marker at user mouse click
  marker = WE.marker([e.latitude, e.longitude], 'spotify.png', 32, 32);
//binds a pop up window to the marker
  // marker.bindPopup("<b>Hello world!</b><br>I am " + milesDistance + " miles from" + locArray[i].loc +".<br /><span style='font-size:10px;color:#999'></span>", {maxWidth: 150, closeButton: true}).openPopup();
//marker gets pushed into the marker array
  markerArray.push(marker);

// Pushes markerArray through a for loop to display markers on the globe
  for(var i = 0; i < markerArray.length; i++) {
//addTo function displays the marker on the globe;
    markerArray[i].addTo(earth);
    if(markerArray.length > 2) {
//this removes previous marker from globe and array
      markerArray[0].removeFrom(earth);
      markerArray[1].removeFrom(earth);

      markerArray.splice(0,1);
    }
  };

}

earth.on('dblclick', onMapClick);
