
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
  if ($.trim($(this).text()) === 'Show Scoreboard') {
        $(this).text('Hide Scoreboard');
    } else {
        $(this).text('Show Scoreboard');
    }

    return false;
});



//scoreboard window panel
$('.hint').click(function(){
  $('#slideout').toggleClass('on');
  if ($.trim($(this).text()) === 'Show Hint') {
        $(this).text('Hide Hint');
    } else {
        $(this).text('Show Hint');
    }

    return false;
});

$(document).keypress(function(e) {
  if(e.which == 13) {
      spotifyUpdate();
    }

});
