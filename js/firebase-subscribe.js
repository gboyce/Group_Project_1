// Initialize Firebase
var config = {
    apiKey: "AIzaSyBe-SHm7k9Qvn0mo9mbrrKCxLMbEmOEOzA",
    authDomain: "audio-buzz-subscribe.firebaseapp.com",
    databaseURL: "https://audio-buzz-subscribe.firebaseio.com",
    projectId: "audio-buzz-subscribe",
    storageBucket: "audio-buzz-subscribe.appspot.com",
    messagingSenderId: "715533879210"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
  var nameSubscribe = "";
  var emailSubscribe = "";
  var commentSubscribe = "";

  // Capture Button Click
  $("#add-user-subscription").on("click", function(event) {
    event.preventDefault();

    nameSubscribe = $("#name-input-subscription").val().trim();
    emailSubscribe = $("#email-input-subscription").val().trim();
    commentSubscribe = $("#comment-input-subscription").val().trim();


    // Code for the push
    dataRef.ref().push({

      nameSubscribe: nameSubscribe,
      emailSubscribe: emailSubscribe,
      commentSubscribe: commentSubscribe

    });
  });

  // Firebase watcher + initial loader HINT: .on("value")
  database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().nameSubscribe);
    console.log(snapshot.val().emailSubscribe);
    console.log(snapshot.val().commentSubscribe);


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
