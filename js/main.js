//hide main start button
$('.start-button').click(function() {
    $(this).hide();
});

//main trivia window panel
$('.start-game').click(function(){
  $('#slideout').toggleClass('on');
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

//main trivia window panel
$('.hint').click(function(){
  $('#album img').removeClass('blur');
  $('#hint').removeClass('blur2');
});
