// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDYuJ7B_cjZSSnzmjYdIaWIJMlMSZGUXeM",
    authDomain: "topplayersinfo.firebaseapp.com",
    databaseURL: "https://topplayersinfo.firebaseio.com",
    projectId: "topplayersinfo",
    storageBucket: "topplayersinfo.appspot.com",
    messagingSenderId: "33598845866"
  };
  firebase.initializeApp(config);


  var dataRef = firebase.database();

  // Initial Values
  var name = "";
  var finalScore = 0;

  // Capture Button Click
  $("#add-user").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    finalScore = $("#score").text();
    console.log('this is your final score: ' + finalScore);


    // Code for the push
    dataRef.ref().push({

      name: name,
      finalScore: finalScore

    });
  });

  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  dataRef.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().name);

    // full list of items to the well
    $("#full-member-list").prepend("<div class='player'><span id='name'> " + childSnapshot.val().name + " </span><span id='score'> " + childSnapshot.val().finalScore + " </span></div>");

    $('.player').attr('myscore', childSnapshot.val().finalScore);

  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    // Change the HTML to reflect
    $("#name-display").html(snapshot.val().name);
  });
