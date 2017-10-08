
// SOUND
var music = new Audio('vida-loca-compressed.mp3');
music.play();

var successSound = new Audio('success.wav');
var failureSound = new Audio('failure.wav');

// JESUS
var $jesusBox = $('#jesusBox')
var hasMouthOpen = false;
var jesusBoxLeftPosX = $jesusBox.position().left;
var jesusBoxRightPosX = $jesusBox.position().left + $jesusBox.width();
var jesusBoxTopPosY = $jesusBox.position().bottom + $jesusBox.width();

// FOOD
var $newFood = $("<div>", {class: "newFood"});
var foodPosX = 0;
var foodXCoordinates = [];
var foodBottomPosY;

// GAME CONFIG

var openMouthLength = 400; // how long does the mouth stay open
var defaultFoodFallDuration = 3000;
var jesusMovementSpeed = 250;


// GAME ASSETS
var jesusMouthClosed;
var jesusMouthOpen;

$(document).keydown(function(e) {
    switch (e.which) {
    case 37: //left arrow key
      if ( $jesusBox.position().left > 250 ) {
        $jesusBox.stop().animate({
            left: '-=250'
            });
          }
      else {}
      break;
    case 39: //right arrow key
      var rightBoundary = $('#game_container').width() - 250;
      jesusBoxRightPosX = $jesusBox.position().left + $jesusBox.width();
      if ( jesusBoxRightPosX < rightBoundary ) {
         $jesusBox.stop().animate({
            left: '+=250'
            });
      }
      else {}

      break;
    case 32: // space key
        hasMouthOpen = true;
        jesusBoxLeftPosX = $jesusBox.position().left;
        jesusBoxRightPosX = $jesusBox.position().left + $jesusBox.width();
        jesusBoxTopPosY = $jesusBox.position().top;
        $jesusBox.css('background',jesusMouthOpen);
        if (foodXCoordinates[0] > jesusBoxLeftPosX && foodXCoordinates[0] < jesusBoxRightPosX && foodBottomPosY >= jesusBoxTopPosY ) {
          successSound.play();
          $('body').css('background-color','black');
          $('#game_container').css('background-image','url(lightning.png),url(title.png)')
          $newFood.remove();

        }
        else if (foodXCoordinates[1] > jesusBoxLeftPosX && foodXCoordinates[1] < jesusBoxRightPosX && foodBottomPosY >= jesusBoxTopPosY ) {
          successSound.play();
          $('body').css('background-color','black');
          $newFood.remove();
        }
        else {
          $('body').css('background-color','00d2ff');
          failureSound.play();
        }
        setTimeout(function(){
          $('body').css('background-color','ffa9f0');
          $('#game_container').css('background-image','url(title.png)')
          hasMouthOpen = false;
        }, openMouthLength);
        break;
    }
});
var foodImgStock = []; //array width all food images
var foodImg;
function selectFoodImg(foodType) {
  foodImg = foodType[Math.floor(Math.random()*foodType.length)];
};


function spawnFood() {
  foodXCoordinates = [];
  $("#game_container").append($newFood);
  foodPosX = Math.floor(Math.random()*$('#game_container').width()); // set random horizontal position for food
  foodImg = "url:("+selectFoodImg(foodImgStock)+"),no-repeat,center,center";
  $newFood.css({'background':'url(food.png)','left':foodPosX,'top':'0'});
  // $newFood.css({'background-image':foodImg,'left':foodPosX});
  foodXCoordinates.splice(0,0,foodPosX);
  foodXCoordinates.splice(1,0,foodPosX + $newFood.width());
  setTimeout(animateFood($newFood),2000);
  console.log(foodXCoordinates);
  return foodXCoordinates;
};

spawnFood();

function animateFood(a) {
  a.animate({
    top: $('#game_container').height() - $newFood.height()
  }, {
    duration: defaultFoodFallDuration + Math.floor(Math.random()*4000),
    step: function() {
      foodBottomPosY = $(this).position().top + $(this).height();
    },
    complete: function(){
      foodCanBeEaten = true;
      spawnFood();
    }
  });
};
