var locArray = [
  {lt: 19.076, lg: 72.8777, loc: "Mumbai", col:'#E6CE7A', trackId:'6pjtY01rXw5UMuZvqyFIa5'},//Mumbai - Panjabi MC
  {lt: 37.5665, lg: 126.9780, loc: "Seoul", col: '#BF10C6', trackId:'2ySKRXKN58cbIlY1cxd80y'}, //Seoul - BTS (korea
  {lt: 55.7558, lg: 37.6173, loc: "Moscow", col: '#8F060C', trackId: '7kT89itHjfBO3zAb1V4S8w'}, //Moscow,
  {lt: 40.4168, lg: -3.7038, loc: "Madrid", col: '#FB24C2', trackId:'6oVIbnKNX4qH2NAwt1Y0gt'},//Madrid
  //{lt: 29.7604, lg: -95.3698, loc: "Houston", col: '#E6CE7A', trackId:'6lEIjrQNwJPecJ7mMXjhjo'},//Houston - Lil Troy
  //{lt: 53.3498, lg: -6.2603, loc: "Ireland", col: '#BF10C6', trackId:'03wrmep5c3Dr9JlOXPvFUX'},//Ireland - Celtic Women
  //{lt: 35.6895, lg: 139.6917, loc: "Japan", col: '#8F060C', trackId:'7CoHfAmqnUaU2qa9SGrMrx'},//Japan - Wagakki Band
  //{lt: 30.0444, lg: 31.2357, loc: "Egypt", col: '#FB24C2', trackId:'53Aw9tort7bhCcf1wEBoNv'}//Egypt - Sherine
];

var earth;
var markerArray = [];
var i = 0;
var milesDistance = 0;
var markerOrigin = [];
var score = 0;
var marker2;
var counter = 0;


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


//Creates the player marker and stores
//markers lat/long in markerOrigin variable
//for the getDistance and lineBetween functions
function createMarker(e) {
  // marker.removeFrom(earth);
  console.log("Latitude: " +e.latitude + ', ' + " Longitude: " + e.longitude);
  //generates a marker at user mouse click
  marker = WE.marker([e.latitude, e.longitude], 'yourguess.png', 100, 100);
  // marker.bindPopup("<b>Hello world!</b><br>I am  + milesDistance +  miles from" + locArray[i].loc +".<br /><span style='font-size:10px;color:#999'></span>", {maxWidth: 150, closeButton: true}).openPopup();
  //binds a pop up window to the marker

  markerOrigin = [e.latitude, e.longitude];
  // markerArray.push(marker);
  if (markerArray[0]) {
      markerArray[0].removeFrom(earth);
  }

    markerArray = [marker];
    // Pushes markerArray through a for loop to display markers on the globe
  // for(var i = 0; i < markerArray.length; i++) {
    //addTo function displays the marker on the globe;
    markerArray[0].addTo(earth);
    // if(markerArray.length > 2) {
    //   //this removes previous marker from globe and array
    //
    //   markerArray[1].removeFrom(earth);
    //
    // }
  // };

}

//Double click to add player marker to the globe.
//Press Enter to submit marker location and continue game flow
earth.on('dblclick', createMarker);

//Remove the correct location markers from the globe.
//Function is called in a setTimout after player submits marker.
function removeMarker() {
  marker2.removeFrom(earth);
  markerArray[0].removeFrom(earth);

}
//Distance between two markers ----> http://stackoverflow.com/questions/43167417/calculate-distance-between-two-points-in-leaflet
//Call the lineBetween function
//Calculate the score based on distance between markers
function getDistance(origin, destination, col) {
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
    console.log("The miles distance between points: " + milesDistance);

    //Game marker
    marker2 = WE.marker([destination[0], destination[1]], 'theanswer.png', 100, 100).addTo(earth);


    var lineA = {lt: origin[0], lg:origin[1]};
    var lineB = {lt: destination[0], lg: destination[1]};
    lineBetween(lineB, lineA, col);

    function addScore() {
     document.getElementById("score").innerHTML=('Score: ' + score);

    }

    if (milesDistance > 1000) {
      score += 10;
      addScore();
    } else if (milesDistance > 900) {
      score += 25;
      addScore();
    } else if (milesDistance > 800) {
      score += 50;
      addScore();
    } else if (milesDistance > 700) {
      score += 75;
      addScore();
    } else if (milesDistance > 600) {
      score += 100;
      addScore();
    } else if (milesDistance > 500) {
      score += 150;
      addScore();
    } else if (milesDistance > 400) {
      score += 350;
      addScore();
    } else if (milesDistance > 300) {
      score += 650;
      addScore();
    } else if (milesDistance > 200) {
      score += 950;
      addScore();
    } else if (milesDistance > 100) {
      score += 1250;
      addScore();
    } else {
      score+=2500;
      alert("You chose the exact location.");
    }
};
//
function toRadian(degree) {
    return degree*Math.PI/180;
};



//Draws the line between the two markers
function lineBetween(B, A, col) {
    coords = [];
    var N = 100;

    var m = (A.lt - A.lg) / (B.lt - B.lg)
    for (var i = 0; i < N; i++) {
        var lt = A.lt - i / N * (A.lt - B.lt);
        var lg = A.lg - i / N * (A.lg - B.lg)

        coords.push([lt, lg]);
        coords.unshift([lt, lg]);
    }
    var options = {color: col, opacity: 1, fillColor: col, fillOpacity: 0.1, weight: 5};
    polygon = WE.polygon(coords, options).addTo(earth);

  };
