var time = 30;
var winPoints = 0;
var lossPoints = 0;
var noTimePoints = 0;
var chosenQuestion;
var correctAnswer;
var chosenObject;
var playerGuessed = false;
var display;
var i = 0;


var qaList = [
question1 = {
    q: "Which of the below is not a movie in the cyberpunk genre?",
    a: "- Mortal Engines",
    f1: "- Ready Player One",
    f2: "- Bladerunner",
    f3: "- Ghost In The Shell"
},

question2 = {
    q: "Which of the below is not a general attribute of the Cyberpunk genre?",
    a: "- Magic",
    f1: "- Dystopia",
    f2: "- Mega-Corporations",
    f3: "- Anti-Authoritarian"
},

question3 = {
    q: "The movie Blade Runner is based off of what book?",
    a: "- Do Androids Dream of Electric Sleep?",
    f1: "- Neuromancer",
    f2: "- The Stand",
    f3: "- Empty"
},


question4 = {
    q: "Cyberpunk is a sub-genre of what major genre?",
    a: "- Science Fiction",
    f1: "- Fantasy",
    f2: "- Drama",
    f3: "- Comedy"
},


question5 = {
    q: "Who is a famous cyberpunk author from the below?",
    a: "William Gibson",
    f1: "J.K. Rowling",
    f2: "George R.R. Martin",
    f3: "Edgar Allen Poe"
},
]

// Interval to track time
function timer() {
    intervalID = setInterval(timeDecrementer, 1000);
}


//time decrementer
function timeDecrementer() {
    if (time > 0) {
    time--;
    } 
    else if (time == 0 && playerGuessed == false) {
        playerGuessed = true;
        intermissionT();
    } else if (time == 0 && playerGuessed == true) {
        questionDisplay();
    }
    $("#timer").text("Time Left: " + time);

}

//Picks a question
function chooseQuestion() {
    chosenObject = qaList[i];
    
}

//displays the question/choices
function questionDisplay() {
    
    playerGuessed = false;
    display = $("<div>").addClass("display text").append(chosenObject.q);
    choice1 = $("<div>").addClass("choice text").append(chosenObject.a).attr("id", "answer");
    choice2 = $("<div>").addClass("choice text").append(chosenObject.f1).attr("id", "false");
    choice3 = $("<div>").addClass("choice text").append(chosenObject.f2).attr("id", "false");
    choice4 = $("<div>").addClass("choice text").append(chosenObject.f3).attr("id", "false");
    $(display).append(choice1, choice2, choice3, choice4);
    $("#question").append(display);

    $(".displayC").remove();
    $(".displayI").remove();
    $(".displayT").remove();

    if (i != qaList.length) {
        time = 30;
    }
  
}

//Correct Answer Intermission page
function intermissionC() {
    $(".display").remove();
    display = $("<div>").addClass("displayC").text("You got it! the right answer was " + chosenObject.a);
    $("#question").append(display);
    time = 5;
    i++;
    winPoints++;
    clearInterval(intervalID);
    timer();
    finish();
    chooseQuestion();
}


//Incorrect Answer Intermission page
function intermissionI() {
    $(".display").remove();
    display = $("<div>").addClass("displayI").text("Not quite, the correct answer is " + chosenObject.a);
    $("#question").append(display);
    time = 5;
    i++;
    lossPoints++;
    clearInterval(intervalID);
    timer();
    finish();
    chooseQuestion();
    }


//Timeout Answer Intermission page
function intermissionT() {
 
    $(".display").remove();
    display = $("<div>").addClass("displayT").text("Oops, you ran out of time... The correct answer was " + chosenObject.a);
    time = 5;
    i++;
    noTimePoints++;
    $("#question").append(display);
    clearInterval(intervalID);
    timer();
    finish();
    chooseQuestion();
    if (i == qaList) {
        i+ 2;
    }
    }


//Declares players choice and changes to intermission page
function onPlayerClick() {
    
    if ($(this).attr("id") == "false") {
        console.log("incorrect");
        playerGuessed = true;
        intermissionI();
    } else if ($(this).attr("id") == "answer") {
        console.log("correct");
        playerGuessed = true;
        intermissionC();
    }
}

//end Screen

function endScreen() {
    display = $("<div>").addClass("score-screen")
    yourPoints = $("<div>").addClass("points").text("You got " + winPoints + " correct!");
    yourWrongPoints = $("<div>").addClass("points").text("You got " + lossPoints + " wrong...");
    yourTimePoints = $("<div>").addClass("points").text("You failed to answer " + noTimePoints + " questions...");
    $(display).append(yourPoints, yourWrongPoints, yourTimePoints)
    $("#question").append(display);
    $("#timer").text("");
}
//Finish the game
function finish() {
    if (i > qaList.length) {
        $(".displayC").remove();
        $(".displayI").remove();
        $(".displayT").remove();
        time = "You're All Done!";
        noTimePoints--;
        endScreen();
        clearInterval(intervalID);
        console.log(winPoints);
        console.log(lossPoints);
        console.log(noTimePoints);

    }
    // clearInterval(intervalID);
}

// STARTER FUNCTION CALLS
timer();
$(document).on("click", ".choice", onPlayerClick);
chooseQuestion();
questionDisplay();

// choiceDisplay();
