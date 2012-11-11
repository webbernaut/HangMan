$(function() {                                                                                                                    

  var game            = new Round
  var guesses_view = new GuessesView({model: game});
  var puzzle_view = new PuzzleView({model: game});
  var scaffold_view = new ScaffoldView({model: game});
  var options_view    = new OptionsView({model: game})

});
