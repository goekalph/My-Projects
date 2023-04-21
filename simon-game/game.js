var buttonColours =["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern = [];
var started = false;
var level =0;

 
$(document).keypress(function(){
    
        if (!started) {
      
          
            $("#level-title").text("Level " + level);
            nextSequence();
        
            started = true;
        
    }});   



function nextSequence(){
    userClickedPattern = [];
    var randomNumber= Math.floor((Math.random()*3))+1;
    var randomChosenColor= buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+buttonColours[randomNumber]).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level "+level);
    
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (gamePattern.length>0) {
        checkAnswer(userClickedPattern.length-1);
    }
    

});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}  

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
        
    }
    else {
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 1000);
          $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
  
      }

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
}




