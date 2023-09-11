
var buttonColours = ["red","blue","green","yellow"]; // passo 3A, novo array com a sequencia de cores 

var gamePattern = []; //Passo A5 - criar um array vazio 
userClickedPattern = []; //b1

var started = false;
var level = 0;

 $(document).keypress(function(){
    if(!started){
     $("#level-title").text("Level " + level);
     nextSequence();
     started = true;
      }});

 $(".btn").click(function(){ //B2 detecta quando um dos buttons foi clicado 
    
    var userChosenColour = $(this).attr("id"); // b3 variavel que armazena o mesmo id do botão que foi clicado 
    userClickedPattern.push(userChosenColour); // B4 adiciona o botão que foi clicado ao array user userClickedPattern
    
    playSound(userChosenColour); // C1 quando essa função for ativada, com o clique, vai tocar um som.  
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success");

    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
        }
     
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
      
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
} 
/////
function nextSequence(){ // passo A1 - criar uma função 
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4); // passo A2 - dentro da função criar um nª aleatorio entre 0 e 3
    var randomChosenColours = buttonColours[randomNumber];// passo A4 - criar uma variavel, e usar o randomNumber para selecionar um item do buttonColours 
    gamePattern.push(randomChosenColours);// Passo A6 - adicionar o que foi gerado no randomChoseColours no final do array vazio
    
    $("#" +randomChosenColours).fadeIn(100).fadeOut(100).fadeIn(100); // seleciona o ID com randomChoseColours, criar uma animação 
    playSound(randomChosenColours); // refatorar o codigo para funcionar nesta função
 }
//////////////////////////////////////

function playSound(name){  // criar um função com o parametro de entrada name.
    var audio = new Audio ("sound/"+randomChosenColours+".mp3")
    audio.play(); // selecionar um som para tocar 
}

//////
function animatePress(currentColour) { // 1 criar uma nova funçãoo
    $("#" + currentColour).addClass("pressed"); //   //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    setTimeout(function(){ //   //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    $("#" + currentColour).removeClass("pressed");
        },100);
    }

    function startOver () {
        level = 0;
        gamePattern=[];
        started = false;
    }