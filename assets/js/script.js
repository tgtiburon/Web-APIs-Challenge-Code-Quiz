console.log("Script.js Loaded");


// references to document items
let gameSurfaceEl = document.querySelector(".game-surface");
let introButEl = document.querySelector("start-button");

// Global variables
let playerScore = 0;
let timeLeft = 5;
let startTimer = false;
let noAnswer = true;

let currentQuestion = 0;
let numCorrect = 0;
let finalScore = 0;

/* let savedScores = [
    {
        name: "Player1",
        score: 5
    },
    {
        name: "Player2",
        score: 4
    },
    {
        name: "Player3",
        score: 3
    },
    {
        name: "Player4",
        score: 2
    },
    {
        name: "Player5",
        score: 1
    }

];// end of savedScores */




// Questions

let questionObjArr = [
    
    {
        questionNum: 1, 
        questionText: "1 + 1",
        corrAnswer: "2",
        answer1: "2",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    },
    {
        questionNum: 2, 
        questionText: "2 + 1",
        corrAnswer: "3",
        answer1: "3",
        answer2: "1",
        answer3: "4",
        answer4: "10"
    },
    {
        questionNum: 3, 
        questionText: "3 + 1",
        corrAnswer: "4",
        answer1: "4",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    },
    {
        questionNum: 4, 
        questionText: "4 + 1",
        corrAnswer: "5",
        answer1: "5",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    },

    {
        questionNum: 5, 
        questionText: "5 + 1",
        corrAnswer: "6",
        answer1: "6",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    },
    {
        questionNum: 6, 
        questionText: "6 + 1",
        corrAnswer: "7",
        answer1: "7",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    },
    {
        questionNum: 7, 
        questionText: "7 + 1",
        corrAnswer: "8",
        answer1: "8",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    },
    {
        questionNum: 8, 
        questionText: "8 + 1",
        corrAnswer: "9",
        answer1: "9",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    },
    {
        questionNum: 9, 
        questionText: "9 + 1",
        corrAnswer: "10",
        answer1: "10",
        answer2: "1",
        answer3: "3",
        answer4: "16"
    },
    {
        questionNum: 10, 
        questionText: "10 + 1",
        corrAnswer: "11",
        answer1: "11",
        answer2: "1",
        answer3: "3",
        answer4: "10"
    }

];

let totalQuestions = questionObjArr.length;
//  for debugging setting totalQuestions to 1
//totalQuestions = 1;
console.log(questionObjArr);

//ORIGINAL WORKED
let timerID = setInterval(function() {timerFunction();}, 1000);



// Functions

 /* let timers = function() {

     if(startTimer) {
         let countdown = function() {
         // do stuff
         counter.textContent = count;
         count--;
         if(count<0) {
              startTimer = false;
             //count = 5;
             clearInterval(timerID);
             console.log('finished');
         }
        }
     }
     let timerID = setInterval(function() {timerFunction();}, 1000);
     
 }// end timers */

let timerFunction = function() {
    console.log("In timerfunction")
    
    if  (startTimer)  {

        console.log("One second has passed");
        let timerH2El = document.querySelector(".time-left");
        timerH2El.textContent = "Time Left: " + timeLeft;
        
        if (timeLeft<= 0) {
            timeLeft = 0;
            drawFinalScoreUI ();
            startTimer = false;
           // timers();
            
        }
        timeLeft = timeLeft -1;

    } 
   
} // end timerFunction


let drawIntroUI = function() {
   
    
        gameSurfaceEl.setAttribute("style", "background-color:lightgrey");
        // create the start screen
        //let titleText 
    
        let gameDivEl = document.createElement("div");
        let gameh2El = document.createElement("h2");
        let gamePEl = document.createElement("p");
        let introButEl = document.createElement("button");

        // timer
        let timerH2El = document.querySelector(".time-left");
        timerH2El.textContent = "Time Left: " + timeLeft;

        gameh2El.textContent = "Welcome to the game";
        gamePEl.textContent = "This game is designed to help you study Web APIs. If you get a question incorrect you lose 5 seconds on the clock. If you get a question correct you get 1 second added to the timer. If the clock hits zero, the game is over!"; 
        //introButEl.innerHTML = "Press to start the quiz!";  
        introButEl.textContent = "To start press!"; 
        introButEl.id = "start-button";
            

        //tempText.textContent("test");
        gameSurfaceEl.appendChild(gameDivEl);

        gameDivEl.appendChild(gameh2El);
        gameDivEl.id = "game-div";

        //gameDivEl.id = "h2-intro";
        gameh2El.id = "h2-game";
        gameDivEl.appendChild(gamePEl);
        gameDivEl.appendChild(introButEl);
    
   

} //end drawIntroUI()


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

        // Randomize this later
        //
        //

        ans1ButtonButEl.textContent = questionObjArr[i].answer1;
        ans2ButtonButEl.textContent = questionObjArr[i].answer2;
        ans3ButtonButEl.textContent = questionObjArr[i].answer3;
        ans4ButtonButEl.textContent = questionObjArr[i].answer4;


 

        
   
    

}; // end askQuestions

let drawQuestionUI = function() {
   
    //setup the ui for questions:
    let gameh2El = document.querySelector("#h2-game");
    let gamePEl = document.querySelector("p");
    let gameDivEl = document.querySelector("#game-div");
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

    // see if the user has answered before iterating to next question
     askQuestion();
            
}; // end drawQuestionUI

let drawHighScoresUI = function(nameInput) {
  
    // remove UI items we don't need anymore
    let gamePEl = document.querySelector("p");
    gamePEl.remove();
    let submitButtonButEl = document.querySelector("#submit"); 
    submitButtonButEl.remove();
    let nameInputEl = document.querySelector("INPUT");
    nameInputEl.remove();
   
    
    //Update stuff we do need!
    let gameh2El = document.querySelector("#h2-game");
    gameh2El.textContent = "High Scores";


    // add a list for high scores
    let gameDivEl = document.querySelector("#game-div");
    let highScoreOlEl = document.createElement("ol");
    let highScore1liEL = document.createElement("li");
    let highScore2liEL = document.createElement("li");
    let highScore3liEL = document.createElement("li");
    let highScore4liEL = document.createElement("li");
    let highScore5liEL = document.createElement("li");
    

    gameDivEl.appendChild(highScoreOlEl);
 

    highScoreOlEl.appendChild(highScore1liEL);
    highScoreOlEl.appendChild(highScore2liEL);
    highScoreOlEl.appendChild(highScore3liEL);
    highScoreOlEl.appendChild(highScore4liEL);
    highScoreOlEl.appendChild(highScore5liEL);


    let buttonHolderDivEl = document.createElement("div");
    buttonHolderDivEl.id = "button-holder";
    gameDivEl.appendChild(buttonHolderDivEl);
    buttonHolderDivEl.setAttribute("style", "display:flex; min-width: 50%;");

    let goBackButtonButEl = document.createElement("button");
    goBackButtonButEl.id = "go-back";
    let clearHighScoresButEl = document.createElement("button");
    clearHighScoresButEl.id = "clear-high-scores";
    buttonHolderDivEl.appendChild(goBackButtonButEl);
    buttonHolderDivEl.appendChild(clearHighScoresButEl);
    goBackButtonButEl.setAttribute("style", "color: blue");
    goBackButtonButEl.textContent = "Go Back"
    clearHighScoresButEl.setAttribute("style", "color: blue");
    clearHighScoresButEl.textContent = "Clear High Scores"

//h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");

   // loadHighScores();


   // debug test...using load in the display high scores

   let savedScores = localStorage.getItem("scores");
  
    if (!savedScores) {
        savedScores = [];
      for (let k = 0; k < 5; k++) {
        score = 0;

        let name = "Name";
        const newScore =  {name, score};
        savedScores[k] = (newScore);
          
      }
    } else {
        savedScores = JSON.parse(savedScores);

    }
  
    
    console.log(savedScores);

    

    // Lets see if the new score is higher and reorder the array
    //if 
   // let tmpScore = [].concat(savedScores);
    score = timeLeft;
    let name = nameInput;
    const newScore =  {name, score};


    // add the new info to the array
    savedScores[5] = (newScore);
    //savedScores[5].Score = 'finalScore';
    // make a storage array


    // lets sort the array
    //savedScores.sort((firstItem, secondItem) => firstItem.score - secondItem.score);
    savedScores.sort((firstItem, secondItem) =>  secondItem.score - firstItem.score);

    // now set the list back down to 5 members

    savedScores.splice(5);


    highScore1liEL.textContent = (savedScores[0].name + " " + savedScores[0].score);
    highScore2liEL.textContent = (savedScores[1].name + " " + savedScores[1].score);
    highScore3liEL.textContent = (savedScores[2].name + " " + savedScores[2].score);
    highScore4liEL.textContent = (savedScores[3].name + " " + savedScores[3].score);
    highScore5liEL.textContent = (savedScores[4].name + " " + savedScores[4].score);
    
     // Use localStorage to save high scores and retrieve them
    saveHighScores(savedScores);
    

}; //end drawHighScoresUI

let saveHighScores = function(savedScores) {
    // shows as [object Object]
    //localStorage.setItem("tasks", tasks);
    localStorage.setItem("scores", JSON.stringify(savedScores));
  }//end saveTasks()
  

/* let loadHighScores = function() {
    let savedScores = localStorage.getItem("scores");
  
    if (!savedScores) {
      return false;
    }
  
    savedScores = JSON.parse(savedScores);
    console.log(savedScores);

    
  
   
  };//end loadHighScores()
 */
let drawFinalScoreUI = function() {
    
    let gameDivEl = document.querySelector("#game-div");

    let gameh2El = document.querySelector("#h2-game");
    let gamePEl = document.querySelector("p");
    gameh2El.textContent = "Final Score!";
    gamePEl.textContent = "More to come!";

    let ans1ButtonButEl = document.querySelector("#ans1");
    let ans2ButtonButEl = document.querySelector("#ans2");
    let ans3ButtonButEl = document.querySelector("#ans3");
    let ans4ButtonButEl = document.querySelector("#ans4");

    // remove the buttons
    ans1ButtonButEl.remove();
    ans2ButtonButEl.remove();
    ans3ButtonButEl.remove();
    ans4ButtonButEl.remove();

    let nameInputEl = document.createElement("INPUT");
    nameInputEl.setAttribute("type", "text");
    gameDivEl.appendChild(nameInputEl);

    let submitButtonButEl = document.createElement("button");
    submitButtonButEl.id = "submit";
    submitButtonButEl.textContent = "Submit";
    gameDivEl.appendChild(submitButtonButEl);

     

    

}

let isCorrect = function(event) {
   
    let i = currentQuestion;

    if (event.target.id === "ans1") {
        pickedAnswer = 1;
    }
    if (event.target.id === "ans2") {
        pickedAnswer = 2;
    }
    if (event.target.id === "ans3") {
        pickedAnswer = 3;
    }
    if (event.target.id === "ans4") {
        pickedAnswer = 4;
    }
   
    let correctAnswer = questionObjArr[i].corrAnswer;
    if(pickedAnswer === 1 ) {
        temp = questionObjArr[i].answer1;
    }
    else if (pickedAnswer === 2 ) 
    {
        temp = questionObjArr[i].answer2;
    } 
    else  if(pickedAnswer === 3 )
     {
        temp = questionObjArr[i].answer3;
    }
    else  if(pickedAnswer === 4 ) 
    {
        temp = questionObjArr[i].answer4;
    }

    if (correctAnswer === temp) {
        
        numCorrect++;
        console.log("You got this many correct " + numCorrect);
        currentQuestion ++;
        timeLeft = timeLeft + 2;
        askQuestion();
    } 
    else //User got it wrong
    {
        // take time away
        currentQuestion ++;
        timeLeft = timeLeft -5;
        askQuestion();



    }
    // I could just check the questionObjArr but for debugging

    if (currentQuestion >= (totalQuestions-1))
    {
        
        // Game over turn off timer
        startTimer = false;
        drawFinalScoreUI();
        
        
        
    }


    
    
    

}// end isCorrect()


let buttonHandler = function(event) {
    //Start button was hit.
    //setup HTML for question portion
 
    if (event.target.id === "start-button") {
        console.log("event.id = start-button");
      
        let gameDivEl = document.querySelector(".game-surface>div");
        let gameh2El = document.querySelector(".game-surface>div>h2");
        let gamePEl = document.querySelector("p");
        // we don't need the start button for now...so hide it
        let introButEl = document.querySelector("button");
        introButEl.style.display = 'none';


        gameh2El.textContent = "We are in questions now!!!!!!";
        //turn on the timer
        startTimer = true;
        //timers();
        //let timerID = setInterval(function() {timerFunction(this);}, 1000);
        //time to ask questions
        drawQuestionUI();
      

    } 
    // clicked the submit button to store initials
    else if (event.target.id === "submit") {
        

        let nameInput = document.querySelector("INPUT").value;
        //let initialText = nameInputEl.getAttribute("TEXT");
        console.log("Initials: " + nameInput);
        // pass the name to the drawHighScoresUI
        drawHighScoresUI(nameInput);
        
    }
    else if ((event.target.id ==="ans1")|| (event.target.id ==="ans2")||(event.target.id ==="ans3")||(event.target.id ==="ans4")) {
        isCorrect(event);
        console.log("clicked an answer button going to isCorrect()");
        
    }


    
        


    

    
   // console.log(event);
   // console.log("Start button was clicked");

}//end buttonHandler()



//Function calls
drawIntroUI();




// Event Listeners
gameSurfaceEl.addEventListener("click", buttonHandler);
