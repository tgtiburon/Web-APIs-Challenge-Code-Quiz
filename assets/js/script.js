console.log("Script.js Loaded");


// references to document items
let gameSurfaceEl = document.querySelector(".game-surface");
let introButEl = document.querySelector("start-button");

// Global variables
let playerScore = 0;
let timeLeft = 50;

// Questions

let questionObjArr = [
    
    {
        questionNum: 1, 
        questionText: "1 + 1",
        questionAnswer: "2",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    },
    {
        questionNum: 2, 
        questionText: "2 + 1",
        questionAnswer: "3",
        foil1: "1",
        foil2: "4",
        foil3: "10"
    },
    {
        questionNum: 3, 
        questionText: "3 + 1",
        questionAnswer: "4",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    },
    {
        questionNum: 4, 
        questionText: "4 + 1",
        questionAnswer: "5",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    },

    {
        questionNum: 5, 
        questionText: "5 + 1",
        questionAnswer: "6",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    },
    {
        questionNum: 6, 
        questionText: "6 + 1",
        questionAnswer: "7",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    },
    {
        questionNum: 7, 
        questionText: "7 + 1",
        questionAnswer: "8",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    },
    {
        questionNum: 8, 
        questionText: "8 + 1",
        questionAnswer: "9",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    },
    {
        questionNum: 9, 
        questionText: "9 + 1",
        questionAnswer: "10",
        foil1: "1",
        foil2: "3",
        foil3: "16"
    },
    {
        questionNum: 10, 
        questionText: "10 + 1",
        questionAnswer: "11",
        foil1: "1",
        foil2: "3",
        foil3: "10"
    }

];
console.log(questionObjArr);






// Functions

let startGame = function() {
    //debugger;
    gameSurfaceEl.setAttribute("style", "background-color:lightgrey");
    // create the start screen
    //let titleText 
   // debugger;
    let testDivEl = document.createElement("div");
    let introh2El = document.createElement("h2");
    let introPEl = document.createElement("p");
    let introButEl = document.createElement("button");

    introh2El.textContent = "Welcome to the game";
    introPEl.textContent = "This game is designed to help you study Web APIs. If you get a question incorrect you lose 5 seconds on the clock.  If the clock hits zero, the game is over!"; 
    //introButEl.innerHTML = "Press to start the quiz!";  
    introButEl.textContent = "To start press!"; 
    introButEl.id = "start-button";
          

    //tempText.textContent("test");
    gameSurfaceEl.appendChild(testDivEl);
    testDivEl.appendChild(introh2El);
    testDivEl.id = "h2-intro";
    testDivEl.appendChild(introPEl);
    testDivEl.appendChild(introButEl);
   
    


}
let startButtonHandler = function(event) {
    //Start button was hit.
    //setup HTML for question portion
    //debugger;
    if (event.target.id === "start-button") {
        console.log("event.id = start-button");

    };
    console.log(event);
   // console.log("Start button was clicked");
    let testDivEl = document.querySelector("div");
    let introh2El = document.querySelector(".game-surface>div>h2");
    let introPEl = document.querySelector("p");
    
    let introButEl = document.querySelector("button");
    introButEl.style.display = 'none';
    introh2El.textContent = "We are in questions now!!!!!!";
}

//Function calls
startGame();




// Event Listeners
gameSurfaceEl.addEventListener("click", startButtonHandler);
