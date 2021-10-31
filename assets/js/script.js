console.log("Script.js Loaded");


// references to document items
let gameSurfaceEl = document.querySelector(".game-surface");
let introButEl = document.querySelector("start-button");
let gameHighScoreTitle = document.querySelector(".high-score-title");

// Global variables
let playerScore = 0;
let timeLeft = 100;
let startTimer = false;
let noAnswer = true;

let currentQuestion = 0;
let numCorrect = 0;
let finalScore = 0;
let currentScreen = "intro";
let lastScreen = "intro";
let gameOver = false;
let isScoreSaved = false;

let pauseTimer = false;

let numOfScores = 0;

// HACK
//let timerID = setInterval(function() {toggleTimer();}, 1000);
//clearInterval(timerID);



// Questions

let questionObjArr = [
    
    {
        questionNum: 1, 
        questionText: "Is the DOM built into the javaScript Language?",
        corrAnswer: "No",
        answer1: "Yes",
        answer2: "No",
        answer3: "If you add Moment.js",
        answer4: "DOM is not part of javaScript at all"
    },
    {
        questionNum: 2, 
        questionText: "If you are trying to focus on a specific element what code would you use?",
        corrAnswer: "document.querySelector('elementName')",
        answer1: "document.createElement('elementName')",
        answer2: "element.querySelect('elementName')",
        answer3: "document.querySelector('elementName')",
        answer4: "document.elementSelect('element')"
    },
    {
        questionNum: 3, 
        questionText: "How do you detect if a button has been clicked?",
        corrAnswer: "By using button.addEventListener('click', function())",
        answer1: "By using the button.click method",
        answer2: "By using button.addEvent('click', function())",
        answer3: "By using button.addListener('click',function())",
        answer4: "By using button.addEventListener('click', function())"
    },
    {
        questionNum: 4, 
        questionText: "Which is the correct order of code?",
        corrAnswer: "createElement and then appendChild",
        answer1: "createElement and then appendChild",
        answer2: "appendChild and then createElement",
        answer3: "createChild and then appendElement",
        answer4: "appendElement and then createChild"
    },

    {
        questionNum: 5, 
        questionText: "How do you delete a selected element?",
        corrAnswer: "selectedElement.remove()",
        answer1: "selected Element.remove()",
        answer2: "selectedElement.delete()",
        answer3: "selectedElement.remove()",
        answer4: "selectedElement.dependchild()"
    },
    {
        questionNum: 6, 
        questionText: "How do you select where an event came from?",
        corrAnswer: "event.target",
        answer1: "target.event",
        answer2: "event.event.target",
        answer3: "event.target.event",
        answer4: "event.target"
    },
    {
        questionNum: 7, 
        questionText: "What js object can you store data on a computer?",
        corrAnswer: "localStorage",
        answer1: "storageLocal",
        answer2: "localStorage",
        answer3: "storageLocation",
        answer4: "locationStorage"
    },
    {
        questionNum: 8, 
        questionText: "When you save data with localStorage, what do you need to do first?",
        corrAnswer: "JSON.stringify(data)",
        answer1: "JSON.stringify(data)",
        answer2: "JSON.string(data)",
        answer3: "JSON.parse(data)",
        answer4: "JSON.parseify(data)"
    },
    {
        questionNum: 9, 
        questionText: "When you load data with localStorage, what do you need to do first?",
        corrAnswer: "JSON.parse(data)",
        answer1: "JSON.parseify(data)",
        answer2: "JSON.stringify(data)",
        answer3: "JSON.string(data)",
        answer4: "JSON.parse(data)"
    },
    {
        questionNum: 10, 
        questionText: "What command do you to create a new branch on github?",
        corrAnswer: "git checkout -b <branch-name>",
        answer1: "git pull <branch-name>",
        answer2: "git merge -b <branch-name>",
        answer3: "git checkout <branch-name>",
        answer4: "git checkout -b <branch-name>"
    }

];

let totalQuestions = questionObjArr.length;

// Debug stuff
timeLeft = 19;

totalQuestions = 2;


// Functions

  let toggleTimer = function() {

   
    if (startTimer === true ) {
        //startTimer = true;
        let countDown = function() {
          
            console.log("timeLeft= " + timeLeft);
            if (pauseTimer === false) {
                timeLeft = timeLeft -1;
        
               };
            if(timeLeft < 0) {timeLeft = 0;}   
            
            let timerH2El = document.querySelector(".time-left");
            timerH2El.textContent = "Time Left: " + timeLeft;
            //console.log ("starting timer");

            if (timeLeft <= 0) {
                startTimer = false;
                   
                timeLeft = 0;
                clearInterval(timerID);
                timerID = null;
                //hideScreen(currentScreen);
                let timerH2El = document.querySelector(".time-left");
                timerH2El.textContent = "Final Score: " + playerScore;
                
                drawFinalScoreUI ();       
            }
        }
      
        let timerID= setInterval(countDown, 1000);
       
    }
    else {

        //let timerID = setInterval(function() {toggleTimer();}, 1000);
        //startTimer = true;
    }
     
 }// end toggleTimer 

// let timerFunction = function() {

//    if  (startTimer)  {
//        if (pauseTimer === false) {
//         timeLeft = timeLeft -1;

//        };
        
//         let timerH2El = document.querySelector(".time-left");
//         timerH2El.textContent = "Time Left: " + timeLeft;
        
//        if (timeLeft<= 0) {
//         startTimer = false;   
//            timeLeft = 0;
//             drawFinalScoreUI ();
           
//         }
//     }   
// } // end timerFunction

/*  
    initialSetup()  
    => called only at the beginning  to load stuff once
    args: none
*/
let initialSetup = function () {

    // load elements that will be omnipresent

    let gameDivEl = document.createElement("div");
    let gameh2El = document.createElement("h2"); 
    // High score and timer text
    let timerH2El = document.querySelector(".time-left");
    timerH2El.textContent = "Time Left: " + timeLeft;
    gameSurfaceEl.appendChild(gameDivEl);
    let highScoreH2El = document.querySelector(".high-score-title");
    highScoreH2El.textContent = "View High Score";

    gameDivEl.appendChild(gameh2El);
    gameDivEl.id = "game-div";
    gameh2El.id = "h2-game";

    let gamePEl = document.createElement("p");
    gameDivEl.appendChild(gamePEl);
    
    drawIntroUI(); 
}
/*  
    drawIntroUI()  
    => used to draw the introduction screen
    args: none
*/

let drawIntroUI = function() {
   
        
       
        let gameDivEl = document.querySelector("#game-div");
        let gameh2El = document.querySelector("#game-div>h2");
        let gamePEl = document.querySelector("p");
     
       let introButEl = document.createElement("button");
      
        gameDivEl.appendChild(introButEl);
      
        introButEl.textContent = "To start press!"; 
        introButEl.id = "start-button";
    
        // timer
        let timerH2El = document.querySelector(".time-left");
        timerH2El.textContent = "Time Left: " + timeLeft;

        gameh2El.textContent = "Welcome to the game";
        gamePEl.textContent = "This game is designed to help you study Web APIs. If you get a question incorrect you lose 5 seconds on the clock. If the clock hits zero, the game is over!"; 
       
        currentScreen = "intro";

} //end drawIntroUI()


/*  
    askQuestions() 
    => used to update to the next question in the list
    args: none
*/
let askQuestion = function() {
    
        let i = currentQuestion;
        let gameh2El = document.querySelector("#h2-game");
        let gamePEl = document.querySelector("p");
        let gameDivEl = document.querySelector("#game-div");


        let ans1ButtonButEl = document.querySelector("#ans1");
        let ans2ButtonButEl = document.querySelector("#ans2");
        let ans3ButtonButEl = document.querySelector("#ans3");
        let ans4ButtonButEl = document.querySelector("#ans4");
        
        gameh2El.textContent = "Question #" + questionObjArr[i].questionNum;
        gamePEl.textContent = questionObjArr[i].questionText;

        // eneable the buttons
        document.querySelector("#ans1").disabled = false;
        document.querySelector("#ans2").disabled = false;
        document.querySelector("#ans3").disabled = false;
        document.querySelector("#ans4").disabled = false;

        ans1ButtonButEl.textContent = questionObjArr[i].answer1;
        ans2ButtonButEl.textContent = questionObjArr[i].answer2;
        ans3ButtonButEl.textContent = questionObjArr[i].answer3;
        ans4ButtonButEl.textContent = questionObjArr[i].answer4;



        

}; // end askQuestions

/*  
    isCorrect()  
    => used to check to see if the user picked the correct answer
    args: event  stores which button was clicked
*/
let isCorrect = function(event) {
   
    let i = currentQuestion;
//Set the answer the user chose into temp
    if (event.target.id === "ans1") {
        temp = questionObjArr[i].answer1;
    }
    if (event.target.id === "ans2") {
       temp = questionObjArr[i].answer2;
    }
    if (event.target.id === "ans3") {
        temp = questionObjArr[i].answer3;
    }
    if (event.target.id === "ans4") {
        temp = questionObjArr[i].answer4;
    }
  // get the correct answer
    let correctAnswer = questionObjArr[i].corrAnswer;
    // if the user is correct
 
    if (correctAnswer === temp) {
        
        // tell them they are correct
      let boolCorrectText = document.querySelector("#bool-correct-text");
      boolCorrectText.textContent = "Correct!";
      boolCorrectText.setAttribute("style", "color:green");
        // Wait one second before moving to the next question or the final score
      var timeOut = setTimeout(function() {
    
            boolCorrectText.setAttribute("style", "visibility:hidden;");
       
             // see if that was the last question
             if (currentQuestion >= (totalQuestions-1) || timeLeft <= 0)
             { 
                 startTimer = false;
                 //DEBUG
                 //toggleTimer();
                 playerScore = timeLeft;
                 timeLeft = 0;

                 //  NOT SURE ABOUT THIS
                // drawFinalScoreUI();
             } else {
                // itterate the question
                 currentQuestion++;
                 askQuestion();
             }
        },1000);
    } 

    else //User got it wrong
    {
        // take time away
        timeLeft = timeLeft -5;
        

        // Incorrect
        let boolCorrectText = document.querySelector("#bool-correct-text");
        boolCorrectText.textContent = "Wrong!";
        boolCorrectText.setAttribute("style", "color:red");

        // Wait a second before moving on.
        var timeOut = setTimeout(function() {
            boolCorrectText.setAttribute("style", "visibility:hidden;");
            // see if that was the last question
            if (currentQuestion >= (totalQuestions-1) || timeLeft <= 0)
            {  
                // Game over turn off timer
                startTimer = false;
                //toggleTimer();
                playerScore = timeLeft;
                timeLeft = 0;

                

                //NOT SURE ABOUT THIS
               // drawFinalScoreUI();
                // gameOver = true;

            } else {
                currentQuestion++;
                askQuestion();
            }
    
        },1000);
    }   
}// end isCorrect()

/*  
    drawQuestionUI()  
    => used to draw the first question.
    args: none
*/
let drawQuestionUI = function() {
 
    let gameDivEl = document.querySelector("#game-div");
    let gamePEl = document.createElement("p");
    gameDivEl.appendChild(gamePEl);
    let ans1ButtonButEl = document.createElement("button");
    ans1ButtonButEl.id = "ans1";
    let ans2ButtonButEl = document.createElement("button");
    ans2ButtonButEl.id = "ans2";
    let ans3ButtonButEl = document.createElement("button");
    ans3ButtonButEl.id = "ans3";
    let ans4ButtonButEl = document.createElement("button");
    ans4ButtonButEl.id = "ans4";

    gameDivEl.appendChild(ans1ButtonButEl);
    gameDivEl.appendChild(ans2ButtonButEl);
    gameDivEl.appendChild(ans3ButtonButEl);
    gameDivEl.appendChild(ans4ButtonButEl);

    // add correct or wrong to screen
    let boolCorrectText = document.createElement("div");
        gameDivEl.appendChild(boolCorrectText);
        boolCorrectText.id = "bool-correct-text";
        boolCorrectText.textContent = "";
      
    // see if the user has answered before iterating to next question
     askQuestion();
     currentScreen = "question";
            
}; // end drawQuestionUI

/*  
    drawHighScoreUI()  
    => used to draw the high score screen
    args: nameInput    name of the user
*/

let drawHighScoresUI = function(nameInput) {
  
  let gameDivEl = document.querySelector("div");
  let gameh2El = document.querySelector("#game-div>h2");
  let gamePEl = document.querySelector("p");
  gamePEl.textContent = "";
  gameh2El.textContent = "High Scores";
    
    // add a list for high scores
    gameDivEl = document.querySelector("#game-div");
    let highScoreOlEl = document.createElement("ol");
    let highScore1liEL = document.createElement("li");
    highScore1liEL.id = "1-score";
    let highScore2liEL = document.createElement("li");
    highScore2liEL.id = "2-score";
    let highScore3liEL = document.createElement("li");
    highScore3liEL.id = "3-score";
    let highScore4liEL = document.createElement("li");
    highScore4liEL.id = "4-score";
    let highScore5liEL = document.createElement("li");
    highScore5liEL.id = "5-score";
    
    gameDivEl.appendChild(highScoreOlEl);
    // highScoreOlEl.appendChild(highScore1liEL);
    // highScoreOlEl.appendChild(highScore2liEL);
    // highScoreOlEl.appendChild(highScore3liEL);
    // highScoreOlEl.appendChild(highScore4liEL);
    // highScoreOlEl.appendChild(highScore5liEL);

    let buttonHolderDivEl = document.createElement("div");
    buttonHolderDivEl.id = "button-holder";
    gameDivEl.appendChild(buttonHolderDivEl);
   
    let goBackButtonButEl = document.createElement("button");
    goBackButtonButEl.id = "go-back";
    let clearHighScoresButEl = document.createElement("button");
    clearHighScoresButEl.id = "clear-high-scores";
    buttonHolderDivEl.appendChild(goBackButtonButEl);
    buttonHolderDivEl.appendChild(clearHighScoresButEl);
    if(gameOver === true) {
        goBackButtonButEl.textContent = "New Attempt"
    }
    else {
        goBackButtonButEl.textContent = "Go Back"
    }
        clearHighScoresButEl.textContent = "Clear High Scores"
        let savedScores = localStorage.getItem("scores");
    
    if (!savedScores) {
        savedScores = [];
    //   for (let k = 0; k < 5; k++) {
    //     score = 0;
    //     let name = "Name";
    //     const newScore =  {name, score};
    //     savedScores[k] = (newScore);    
    //   }
          numOfScores = 0;
    } else {
        savedScores = JSON.parse(savedScores);
         numOfScores = savedScores.length;

    }
    // only show high scores that exist
    if(numOfScores  > 0){   
        highScoreOlEl.appendChild(highScore1liEL);
        highScore1liEL.textContent = (savedScores[0].name + " " + savedScores[0].score);
    }
    if(numOfScores > 1) {
        highScoreOlEl.appendChild(highScore2liEL);
        highScore2liEL.textContent = (savedScores[1].name + " " + savedScores[1].score);
    }
    if(numOfScores > 2) {
        highScoreOlEl.appendChild(highScore3liEL);
       
        highScore3liEL.textContent = (savedScores[2].name + " " + savedScores[2].score);
    }
    if(numOfScores > 3) {
        highScoreOlEl.appendChild(highScore4liEL);     
        highScore4liEL.textContent = (savedScores[3].name + " " + savedScores[3].score);

    }
    if(numOfScores > 4) {
        highScoreOlEl.appendChild(highScore5liEL);
        highScore5liEL.textContent = (savedScores[4].name + " " + savedScores[4].score);
    }
    
   
    currentScreen = "highscores";
    
}; //end drawHighScoresUI

/*  
    savedHighScores()  
    => used to saved the high score in the savedScores object.
    args: savedScores   ...scores saved as an object
*/
let saveHighScores = function(savedScores) {
    // shows as [object Object]
    //localStorage.setItem("tasks", tasks);
    localStorage.setItem("scores", JSON.stringify(savedScores));
  }//end saveTasks()
  
  /*  
    drawFinalScoreUI()  
    => used to draw the final score of the game.
        player can input their name
    args: none
*/
let drawFinalScoreUI = function() {

    if (currentScreen === "question")
    {
        hideScreen("question"); //maybe?
    }  
    let gameDivEl = document.querySelector("#game-div");

    let gameh2El = document.querySelector("#h2-game");
    let gamePEl = document.querySelector("p");
    gameh2El.textContent = "Final Score!";
    gamePEl.textContent = "Input your initials please:";

    let nameInputEl = document.createElement("INPUT");
    nameInputEl.setAttribute("type", "text");
    gameDivEl.appendChild(nameInputEl);

    let submitButtonButEl = document.createElement("button");
    submitButtonButEl.id = "submit";
    submitButtonButEl.textContent = "Submit Name";
    gameDivEl.appendChild(submitButtonButEl);

    currentScreen = "final";

   
    

}

/*  
    hideScreen()  
    => used to hide the current screen so we can load
        the High Scores screen.
    args: currentScreen  -- passes the currentScreen to hide
*/

let hideScreen = function(currentScreen) {
  
    if (currentScreen === "intro") {
        let introButEl = document.querySelector("#start-button");
        introButEl.remove();
        let gamePEl = document.querySelector("p"); 
        gamePEl.textContent = "";
        lastScreen = "intro";
    }
    else if (currentScreen === "question") {
        let ans1ButtonButEl = document.querySelector("#ans1");
        let ans2ButtonButEl = document.querySelector("#ans2");
        let ans3ButtonButEl = document.querySelector("#ans3");
        let ans4ButtonButEl = document.querySelector("#ans4");
        let gamePEl = document.querySelector("p");

        gamePEl.textContent = "";

        ans1ButtonButEl.remove();
        ans2ButtonButEl.remove();
        ans3ButtonButEl.remove(); 
        ans4ButtonButEl.remove(); 

        let boolCorrectText = document.querySelector("#bool-correct-text");
        boolCorrectText.remove();
        lastScreen = "question";

    }
    else if (currentScreen=== "final") {

        let nameInputEl = document.querySelector("INPUT");
        nameInputEl.remove();
        let submitButtonButEl = document.querySelector("#submit");
        submitButtonButEl.remove();
        let gamePEl = document.querySelector("p");
        gamePEl.textContent = "";
        lastScreen = "final";
    }
    else if (currentScreen === "highscores") {

        // Only remove high scores that exist
       // if(numOfScores = 1) {
         //   let highScore1liEL = document.getElementById("1-score");

            
       // }


         // add a list for high scores
        
        // let highScore2liEL = document.getElementById("2-score");
        // let highScore3liEL = document.getElementById("3-score");
        // let highScore4liEL = document.getElementById("4-score");
        // let highScore5liEL = document.getElementById("5-score");


        // remove the ordered list and all its children
        let highScoreOlEl = document.querySelector("ol");
        highScoreOlEl.remove(); 
        // highScoreOlEl.remove(); 
        // highScore1liEL.remove(); 
        // highScore2liEL.remove(); 
        // highScore3liEL.remove();    
        // highScore4liEL.remove(); 
        // highScore5liEL.remove(); 
    
        let buttonHolderDivEl = document.querySelector("#button-holder");
        buttonHolderDivEl.remove(); 
    }
  
}// hideScreen

/*  
    buttnHandler()  
    => used to handle the button clicks
    args: none
*/

let buttonHandler = function(event) {
    //Start button was hit.
    //setup HTML for question portion
    console.log(event.target);
   
    if (event.target.id === "start-button") {
        console.log("event.id = start-button");

        startTimer = true;

        toggleTimer();
        hideScreen("intro");
        drawQuestionUI();
    } 
    // clicked the submit button to store initials
    else if (event.target.id === "submit") {

        //debugger;
        
        let nameInputEl = document.querySelector("INPUT").value;
        let score = playerScore;
       // let name = "";
        
        let name = nameInputEl;
        if (name === "")
        { name = "Anonymous"};
        const newScore =  {name, score};
        // add the new info to the array
        let savedScores = localStorage.getItem("scores");
        
  
        if (!savedScores) {
            savedScores = [];
            //const newScore =  {name, score};
            //savedScores[0] = (newScore);    
          
        } else {
            savedScores = JSON.parse(savedScores);
    
        }
        let numOfScores = savedScores.length;

        // add newscore to the end of the array
        savedScores[numOfScores] = (newScore);
        numOfScores ++;
        // lets sort the array
        savedScores.sort((firstItem, secondItem) =>  secondItem.score - firstItem.score);
        // now set the list back down to a max of 5
        if(numOfScores >5) {numOfScores = 5};
        savedScores.splice(numOfScores);

        // Use localStorage to save high scores and retrieve them
        saveHighScores(savedScores);
        console.log("Initials: " + nameInputEl);
        // pass the name to the drawHighScoresUI
        hideScreen("final");
        gameOver=true;
        drawHighScoresUI(name);
    
    }
    else if ((event.target.id ==="ans1")|| (event.target.id ==="ans2")||(event.target.id ==="ans3")||(event.target.id ==="ans4")) {
       
        isCorrect(event);
   
        // lets turn off buttons until the new question
       
        document.querySelector("#ans1").disabled = true;
        document.querySelector("#ans2").disabled = true;
        document.querySelector("#ans3").disabled = true;
        document.querySelector("#ans4").disabled = true;
    
    }
    else if (event.target.id === "go-back") {
        console.log("Go back clicked!!!!");
        // we hit go back...what was the last page
        //if it was high score restart
        // otherwise go back to lastPage

        if(lastScreen === "question") {
            // since we are asking questions turn on the timer again
            //debug
            pauseTimer = false;
           // toggleTimer();
           // startTimer = true;
            hideScreen("highscores");
            drawQuestionUI();
            
        }
         else if ( gameOver === true) {
           // if the game is over reload the game
            location.reload();

        }
         else if (lastScreen === "intro") {
            hideScreen("highscores");
            drawIntroUI();
        }
         else if (lastScreen === "final") {
            hideScreen("highscores");
            drawFinalScoreUI();
            lastScreen = "highscores";
        }
        
    }
    else if (event.target.id === "clear-high-scores") {
        console.log("ClearHighScores!!!!!!");
        savedScores = [];

        // let savedScores = localStorage.getItem("scores");
        // savedScores = JSON.parse(savedScores);
        // // lets put in dummy scores since they cleared scores.
        //     for (let k = 0; k < 5; k++) {
        //        score = "";
        //        name = "";
        //         const newScore =  {name, score};
        //         savedScores[k] = (newScore);
        //     }
        localStorage.setItem("scores", JSON.stringify(savedScores));
        hideScreen("highscores");
        drawHighScoresUI();
             
        // let highScore1liEL = document.getElementById("1-score");
        // let highScore2liEL = document.getElementById("2-score");
        // let highScore3liEL = document.getElementById("3-score");
        // let highScore4liEL = document.getElementById("4-score");
        // let highScore5liEL = document.getElementById("5-score");
               
        //  highScore1liEL.hidden = true;
        //  highScore2liEL.hidden = true;
        //  highScore3liEL.hidden = true;
        //  highScore4liEL.hidden = true;
        //  highScore5liEL.hidden = true;
       // let highScoreOlEl = document.querySelector("ol");
       // highScoreOlEl.remove(); 
    
    }
    else if (event.target.id === "high-score-title") {
  
        console.log(event.target);
        console.log("high score clicked");
        // pause time while in high score screen
        //DEBUG
        pauseTimer = true;
       // toggleTimer();
        //startTimer = false;
        lastScreen = currentScreen;
        hideScreen(currentScreen);

        //new current screen
        currentScreen = "highscores";
        drawHighScoresUI();

    }

}//end buttonHandler()



//Function calls
initialSetup();




// Event Listeners
document.addEventListener("click", buttonHandler)
