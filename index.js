function startAgain()
{
  level = 0;
  started = false;
  ai_sequance = [];
}



function clickAnimation(idOfButton)
{
  $("#" + idOfButton).addClass("pressed");
  setTimeout(function()
{
  $("#" + idOfButton).removeClass("pressed");
}, 200);
}
//------------------------------------------------------------------------------
function soundPlay(key) {
  switch (key)
  {
    case "btn green":
      var sound_1 = new Audio("green.mp3");
      sound_1.play();
      clickAnimation("green");
      break;
    case "btn red":
      var sound_2 = new Audio("red.mp3");
      sound_2.play();
      clickAnimation("red");
      break;
    case "btn yellow":
      var sound_3 = new Audio("yellow.mp3");
      sound_3.play();
      clickAnimation("yellow");
      break;
    case "btn blue":
      var sound_4 = new Audio("blue.mp3");
      sound_4.play();
      clickAnimation("blue");
      break;
    default:
  }
}

//------------------------------------------------------------------------------

function ai()
{
  user_sequance = [];
  var aiPick;
  level += 1;
  $("#level-title").text("level " + level);  //updates the h1 to level 1 level to and so on.

  var random_number = Math.floor(Math.random() * 4); //generates a random number

  aiPick = sequance[random_number];    //plays the sound of the selected button
  soundPlay(aiPick);
  ai_sequance.push(aiPick)
  started = true;
}
//-----------------------------------------------------------------------------
function ans_correct(currentIndex)
{
  if(user_sequance[currentIndex] === ai_sequance[currentIndex])
  {
    console.log("Success");
    if(user_sequance.length === ai_sequance.length)
    {
      setTimeout(function(){
        ai();
      }, 1000);
    }
  }
  else
  {
    console.log("Fail");
    var wrong_sound = new Audio("wrong.mp3")
    setTimeout(function(){
      wrong_sound.play();
      $("body").addClass("game-over")
    }, 100);
    setTimeout(function()
    {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      startAgain();
    }, 3000);

  }

}

//--------------------------------start-----------------------------------------
var ai_sequance = [];
var user_sequance = [];
var sequance = ["btn green", "btn red", "btn yellow", "btn blue"];
var started = false;
var level = 0;

$(document).keypress(function()
{
  if (!started)
  {
    ai();
  }
})

  $(".btn").click(function() //When user clickes on the button
  {

    if (started) //if the user presses any button only then ull be able to click the button!
    {
      var btn_class = $(this).attr("class");   //btn_class will get the class of the button which we will click on!

      user_sequance.push(btn_class);  //and then it will add the class in the array of user_sequance

      soundPlay(btn_class);  //then it will play the sound of the specific button

      ans_correct(user_sequance.length - 1);

    }
  });
