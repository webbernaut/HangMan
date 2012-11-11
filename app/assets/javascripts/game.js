$(function(){
  $.ajaxSetup({ cache: false }); 
  window.Round = Backbone.Model.extend({
    defaults:{
      person: { 
        "4" : $("#head"), 
        "3" : $("#torso"),
        "2" : $("#left-arm"),
        "1" : $("#right-arm"),
        "0" : $("#left-leg"),
        "-1" : $("#right-leg"),
      
      },
    },
  
    initialize: function() {
      this.set({
        state: "alive",
        rem_guesses: 5,
        game_key: null,
        
      });
    },
    fresh_game: function(){
      var _this = this;
      var email = {email: "azimpradhan@gmail.com"}
      email = JSON.stringify(email);
      var new_game_url = "http://hangman.coursera.org/hangman/game";
      new_game_url += "?data=";
      new_game_url += email;
      new_game_url += "&callback=?"
      function getNewGame(game){
        _this.set({state: "alive"});
        _this.set({rem_guesses: "5"});
        _this.set({last_guess_status: null});
        _this.set({game_key: game.game_key}); 
        _this.set({current_phrase: game.phrase});
        _this.trigger("newGameEvent", game);
        //console.log(game);
      }
      $.getJSON(new_game_url, getNewGame);
    },

    guess: function(){
      var _this = this;
      if (_this.get("state") == "won" || _this.get("state") == "lost") return;

      var letter = _this.get("selected_letter");
      var key = _this.get("game_key");
      var supposition = {guess: letter}
      supposition = JSON.stringify(supposition);
      var guess_url = "http://hangman.coursera.org/hangman/game/";
      guess_url += key;
      guess_url += "?data=";
      guess_url += supposition;
      guess_url += "&callback=?";
      function processGame (game) {
        _this.set({state: game.state});
        _this.set({current_phrase: game.phrase});
        if (game.num_tries_left == _this.get("rem_guesses")){
          _this.set({last_guess_status: true});
        }
        else{
          _this.set({last_guess_status: false});
          _this.set({rem_guesses: game.num_tries_left});
        }
        _this.trigger("guessGameEvent", game);
        //console.log(game);
      }
      $.getJSON(guess_url, processGame);
    },
    
  });
    
});
