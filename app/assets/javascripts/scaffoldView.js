$(function() {
  window.ScaffoldView = Backbone.View.extend({
    //el: $("#body_parts"),
    initialize: function(){
      this.model.bind("newGameEvent", this.clearParts, this);
      this.model.bind("guessGameEvent", this.displayParts, this);

    },
    //events: {},
    clearParts: function(){
      //console.log("printing parts");
      jQuery.each(this.model.get("person"), function (index, part){
        part.css("opacity", "0.0");

      });

    },
    displayParts: function(){
      //console.log(this.model.get("rem_guesses"));
      if (this.model.get("last_guess_status") == false) {
        var bodypart = this.model.get("person")[this.model.get("rem_guesses")];
        //console.log("bodypart", bodypart);
        bodypart.animate({opacity: 1.0});
      }



    },
  });
});
