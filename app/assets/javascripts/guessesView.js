$(function() {
  
  window.GuessesView = Backbone.View.extend({
    el: $("#letters"),
    initialize: function() {
      this.model.bind("newGameEvent", this.render, this);
      this.model.bind("guessGameEvent", this.disableCharacter, this);
      this.model.bind("newGameEvent", this.updateGuessesLeft, this);
      this.model.bind("guessGameEvent", this.updateGuessesLeft, this);
    },
    events: {
      'click .clickable': 'letterGuessed'
    },
    render: function() {

      $("#status").html("");

      $("#first_row").html("");
      $("#second_row").html("");
      $("#third_row").html("");
      var letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L','Z', 'X', 'C', 'V', 'B', 'N', 'M'];
      for (var i = 0; i < letters.length; i++){
        var l = $(document.createElement("button"));
        l.html(" " + letters[i]+ " ");
        l.addClass("clickable");
        l.addClass("button");
        l.attr("letter", letters[i]);
        if (i < 10){
          l.addClass("first_row");
          $("#first_row").append(l);
        }
        else if (i < 19){
          l.addClass("second_row");
          $("#second_row").append(l);
        }
        else{
          l.addClass("third_row");
          $("#third_row").append(l);
        }
      }
    },
    letterGuessed: function(event) {
      if (this.model.get("state") == "lost") return;
      
      var target = $(event.target);
      this.model.unset("target")
      this.model.set({selected_letter: target.attr("letter"), target: target});
      this.model.guess();
    },                                                                                                                            
    disableCharacter: function(response) {      
      //console.log(this.model.get("last_guess_status"));
      var trg = this.model.get("target");
      trg.attr("disabled", true);
      if (this.model.get("last_guess_status") == true) {
        //trg.addClass("correct");
      }
      else{
        trg.animate({opacity: 0.0});
        trg.addClass("incorrect");

      }
    },
    updateGuessesLeft: function(){
      var guesses_left = parseInt(this.model.get("rem_guesses"));
      guesses_left += 1;
      if (this.model.get("state") != "alive"){
        this.hideButtons();
        if (this.model.get("state") == "won"){
            //console.log("You Won!");
            $("#status").html("You Won!");
            $("#status").animate({opacity: 1.0});

        }
        else if (this.model.get("state") == "lost"){
            //console.log("You Lost!");
            $("#status").html("You Lost!");
            $("#status").animate({opacity: 1.0});

        }
      }
      $("#num_guesses_row").html("Incorrect Guesses Remaining: " + guesses_left);
    },
    hideButtons: function(){
      var btns = $("#letters").find(".button");
      jQuery.each(btns, function(index, btn){
        $(btn).animate({opacity: 0.0});
      });


    }
  })
});

