// var locArray = [
//   {lt: 48.8566, lg: 2.35225, loc: "Paris", col:'#f511c7', trackId:'045sp2JToyTaaKyXkGejPy'},//Paris
//   {lt: 39.9042, lg: 116.4074, loc: "Beijing", col: '#dfa819', trackId:'6lEIjrQNwJPecJ7mMXjhjo'}, //Beijing,
//   {lt: 55.7558, lg: 37.6173, loc: "Moscow", col: '#aa58d0', trackId: '1EaKU4dMbesXXd3BrLCtYG'}, //Moscow,
//   {lt: 40.1728, lg: -74.0059, loc: "New York", col: '#100ce3', trackId:'7KXjTSCq5nL1LoYtL7XAwS'}
// ];
//
// var arrayIndex = 0;
//
//
//
//
//
//
//
// function lineBetween(B, A, x) {
//     coords = [];
//     var N = 100;
//
//     var m = (A.lt - A.lg) / (B.lt - B.lg)
//     for (var i = 0; i < N; i++) {
//         var lt = A.lt - i / N * (A.lt - B.lt);
//         var lg = A.lg - i / N * (A.lg - B.lg)
//
//         coords.push([lt, lg]);
//         coords.unshift([lt, lg]);
//     }
//     var options = {color: x, opacity: 1, fillColor: x, fillOpacity: 0.1, weight: 3};
//     polygon = WE.polygon(coords, options).addTo(earth);
//
//     // marker gets pushed into the marker array
//     lineArray.push(polygon);
//     //displays the marker on the globe
//       for(var i = 0; i < lineArray.length; i++) {
//     //addTo function displays the marker on the globe
//         // lineArray[i].addTo(earth);
//         if(lineArray.length > 2) {
//     //this removes previous marker from globe and array
//           // var destroyLine = lineArray[0];
//           // destroyLine.destroy(earth);
//           // lineArray[1].removeFrom(earth);
//           lineArray.splice(0,1);
//         }
//       }
//
//   };
//
//
//
//
//
// function onMapClick(e) {
//
//     x = locArray[i];
//     y = locArray[i].col;
//
//
//
//     //creates the line connecting user clickpoint to Houston
//     getDistance([e.latitude, e.longitude], [locArray[i].lt, locArray[i].lg]);
//     createMarker(e, x);
//     marker.bindPopup("<b>Hello world!</b><br>I am " + milesDistance + " miles from" + locArray[i].loc +".<br /><span style='font-size:10px;color:#999'></span>", {maxWidth: 150, closeButton: true}).openPopup();
//     var lineA = {lt: e.latitude, lg:e.longitude};
//     var lineB = {lt: locArray[i].lt, lg: locArray[i].lg};
//     lineBetween(lineB, lineA, y);
//
//
//     i++
//     if (i>4) {
//       i=0;
//     }
// }
//
//
//
// function createMarker(e, x) {
//   // marker.removeFrom(earth);
//   console.log("Latitude: " +e.latitude + ', ' + " Longitude: " + e.longitude);
// //generates a marker at user mouse click
//   marker = WE.marker([e.latitude, e.longitude], 'spotify.png', 32, 32);
// //binds a pop up window to the marker
//   // marker.bindPopup("<b>Hello world!</b><br>I am " + milesDistance + " miles from" + locArray[i].loc +".<br /><span style='font-size:10px;color:#999'></span>", {maxWidth: 150, closeButton: true}).openPopup();
// //marker gets pushed into the marker array
//   markerArray.push(marker);
//
// // Pushes markerArray through a for loop to display markers on the globe
//   for(var i = 0; i < markerArray.length; i++) {
// //addTo function displays the marker on the globe;
//     markerArray[i].addTo(earth);
//     if(markerArray.length > 2) {
// //this removes previous marker from globe and array
//       markerArray[0].removeFrom(earth);
//       markerArray[1].removeFrom(earth);
//
//       markerArray.splice(0,1);
//     }
//   };
//
// }
