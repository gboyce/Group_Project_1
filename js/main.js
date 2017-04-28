
//hide main start button
$('.start-button').click(function() {
    $(this).hide();
});

//main trivia window panel
$('.start-game').click(function(){
  spotifyUpdate();
});

//scoreboard window panel
$('.score-btm').click(function(){
  $('#slideout-score').toggleClass('on');
});

//answer window panel
$('.answer-btm').click(function(){
  $('#slideout-answer').toggleClass('on');
});

//hint window panel
$('.hint').click(function(){
  $('#slideout').toggleClass('on');

});

$('#submit-answer').click(function() {
      getDistance(markerOrigin, [locArray[i].lt, locArray[i].lg], locArray[i].col);
      //alert("Miles Distance: " + milesDistance + " Score: " + score + "The answer is: " + locArray[i].loc);
      $('#answer').text('Answer: ' + locArray[i].loc);
      $('#distance').text('Distance off by: ' + milesDistance);
      $('#currentScore').text('You scored ' + score + ' points on this round, keep going!');
      showMeAnswer();
      i++

      //When Player submits the marker - it triggers timeout
      //to remove the markers
      setTimeout(removeMarker, 3000);

      //
      if (i>7) {

        //i=0;
        pauseMusic();
        alert('hey')
        revealInstructions();


      }

      //if (i === 2) {

      //}

      else {
      setTimeout(spotifyUpdate, 7000);
      setTimeout(hideMyAnswer, 7000);


    }

});


//due to markers not getting removed we have to reload the page
$('.gameover').click(function(){
  window.location.reload(true);

});

//function to pause music after game is done
function pauseMusic() {
    document.getElementById('pause').click();
}
pauseMusic();

//show me the answer after i submit
function showMeAnswer() {
    document.getElementById('showAnswer').click();
}
//hide the answers and play the next song
function hideMyAnswer() {
    document.getElementById('showAnswer').click();
}

//show instructions on load
function revealInstructions() {
    document.getElementById("revealInstructions").click();
}

revealInstructions();
