//global variables
var wordChoices = ["unattractive", "hideous", "repugnant", "vile", "frightful", "horrible", "unpleasant", "ghastly", "awful"];
var userGuesses = [];
var computerWordArray = [];
var correctGuesses = [0];
var attempts = 0;
var nonLetter = document.getElementById("non-letter");

//computer chooses a word
var computerWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];

//computer writes correct number of blanks to page (for loop for word length)
for (var i = 0; i < computerWord.length; i++) {
    computerWordArray.push(computerWord.charAt(i));
    document.getElementById("word").innerHTML += "<span class=" + computerWord.charAt(i) + ">_ </span>";
}

//get array of only unique letters
var uniq = computerWordArray.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
}, []);

//reset function
function reset() {
    document.getElementById("try-again").textContent = "Press any letter to play again";
    document.getElementById("losing-word").textContent = "the word was: " + computerWord;
    document.getElementById("user-guesses").textContent = "";
    document.getElementById("blank").textContent = "";
    document.getElementById("word").innerHTML = "";
    attempts = 0;
    userGuesses = [];
    correctGuesses = [0];
    computerWordArray = [];
    computerWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    for (var i = 0; i < computerWord.length; i++) {
        computerWordArray.push(computerWord.charAt(i));
        document.getElementById("word").innerHTML += "<span class=" + computerWord.charAt(i) + ">_ </span>";
    };
    uniq = computerWordArray.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
}

//function for keyup
document.onkeyup = function (event) {

    //user guess = event.key
    //convert caps to lowercase
    var typedLetter = event.key;
    var userGuess = typedLetter.toLocaleLowerCase();

    //variable to replace the underscores with letters
    var letterReplace = document.getElementsByClassName(userGuess);

    //determine if guess is a letter
    if (event.keyCode > 64 && event.keyCode < 91) {

        nonLetter.innerHTML = "";

        //replaces original html after reset
        document.getElementById("blank").textContent = "Guess the letters in the word";
        document.getElementById("losing-word").textContent = "Guesses so far:";
        
        //check if user had guessed letter before
        if (!userGuesses.includes(userGuess)) {
            
            //adds user guess to list on screen if new guess
            document.getElementById("user-guesses").textContent += userGuess + " ";
            userGuesses.push(userGuess);
            
            //guesses that are correct and guesses less than unique letter length
            if (uniq.includes(userGuess) && correctGuesses.length < uniq.length) {
                correctGuesses.push(userGuess);
                for (var i = 0; i < letterReplace.length; i++) {
                    letterReplace[i].textContent = userGuess + " ";
                }
            }

            //all letters guessed
            else if (uniq.includes(userGuess) && correctGuesses.length === uniq.length) {
                document.getElementById("hangman-img").src = "https://i.pinimg.com/564x/72/37/aa/7237aa8562fa7b4147abe046ab3ba48e--brule-tim-obrien.jpg";
                for (var i = 0; i < letterReplace.length; i++) {
                    letterReplace[i].textContent = userGuess + " ";
                }
                reset();
            }

            //incorrect guess
            else if (!uniq.includes(userGuess) && attempts < 5) {
                attempts++
                document.getElementById("hangman-img").src = "assets/images/hangman-" + attempts + ".jpg";
            }

            //loss
            else {
                document.getElementById("hangman-img").src = "https://vignette.wikia.nocookie.net/timanderic/images/5/51/S2E7Carol.png";
                reset();                
            }
        }

        //letter has already been guessed
        else {
            nonLetter.innerHTML = "You already guessed that letter";
        }
    }

    //a non-letter is pressed
    else {
        nonLetter.innerHTML = "Letters only, please";
    }
};