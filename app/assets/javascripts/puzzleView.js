$(function(){
  window.PuzzleView = Backbone.View.extend({
    el: $("#word"),
    initialize: function() {
      this.model.bind("newGameEvent", this.resetWord, this);
      this.model.bind("guessGameEvent", this.resetWord, this);
    },
    events: {

    },
    
    resetWord: function () {
      var textElement = $("#text");
      textElement.html("");
      var phrase = this.model.get("current_phrase"); 
      var word = $(document.createElement("span"));
      word.html("");
      word.addClass("word");
      var line_length = 0;
      for (var i = 0; i < phrase.length; i++){
        //console.log("word", word.html()); 
        if (phrase[i] == " "){
          //console.log("line_length is ", line_length);
          if (line_length > 22){
            textElement.append("<br />");
            textElement.append(word);
            line_length = word.find(".phrase_letter").size();
          }
          else{
            textElement.append(word);
          }
          word = $(document.createElement("span"));
          word.html("");
          word.addClass("word");
          line_length += 3;
        }
        else{
          l = $(document.createElement("span"));
          l.html(phrase[i]);
          l.addClass("phrase_letter");
          word.append(l);
          line_length += 1;


        }
        if (i == phrase.length - 1){
          //console.log("line_length is ", line_length);
          if (line_length > 22){
            textElement.append("<br />");
          }
          textElement.append(word);
        }
        //var l = $(document.createElement("span"));
        //l.html(phrase[i]);
        //if (l.html() != " "){
          
        /*
        if (phrase[i] == " "){
         
          l.addClass("space");
        }
        else{
          l.addClass("phrase_letter");
        }
        */

        //phraseElement.append(l);
      }
      //console.log(phrase);
      //console.log(textElement.html());
    },
  });
});
