$(function() {
  window.OptionsView = Backbone.View.extend({                                                                                     
    el: $("#options"),
    initialize: function() {
    },
    events: {
      'click #new_game': 'startNewGame',
    },
    startNewGame: function() {
      this.model.fresh_game();
      //console.log("you clicked new game");
    },
  });

});
