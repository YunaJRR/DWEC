document.addEventListener("DOMContentLoaded", (event) => {

    console.log("DOM fully loaded and parsed");
    const selDifficulty = document.querySelector(".difficulty");
    const helpText = document.querySelector(".help-text");
    const recordText = document.querySelector(".records");
    const attempts = document.querySelector(".attempts");
    const btn = document.getElementById("btn-guess");
    const displayGame = document.getElementById("game");
    const reset = document.getElementById("reset");
    const guessText = document.getElementById("input-number");

    let max = 0;
    let guess = 0;
    let attemptsNum = 0;
    let attemptMax;
    let randomNumber;
    let difficultyIsSelected = false;
    let numberGuessed = false;
    let difficulty;
    

    displayGame.style.display = "none";
    
    
    
    // Al seleccionar una dificultad se muestra el juego, el número de intentos disponibles y se determina el número aleatorio
    selDifficulty.addEventListener("change", (event) => {
        displayGame.style.display = "block";
        if (event.target.value==="easy") {
            attemptMax = 5;
            attempts.textContent = 'Número de intentos: '.concat(attemptMax);
            max = 10;
            
        } else if (event.target.value==="medium") {
            attemptMax = 7;
            attempts.textContent = 'Número de intentos: '.concat(attemptMax);
            max = 50;
        } else if (event.target.value==="hard"){
            attemptMax = 10;
            attempts.textContent = 'Número de intentos: '.concat(attemptMax);
            max = 100;
        }
        difficulty = event.target.value;

        randomNumber = Math.floor(Math.random() * max)+1;
        difficultyIsSelected = true;
        selDifficulty.disabled = true;
        if(localStorage.getItem(event.target.value)!= null){
            recordText.textContent = 'Récord actual: '.concat(localStorage.getItem(event.target.value)).concat(' intentos.');
        }
    });

    // Al enviar el intento clicando en el botón, se comprueba si el número es mayor, menor o igual que el número a adivinar
    btn.addEventListener("click", () => {
        if((difficultyIsSelected == true) && (numberGuessed==false) && attemptMax>0 && guessText.value != ""){
            guess = document.getElementById("input-number").value;
            guessText.value = "";
            attemptsNum++;
            attempts.textContent = 'Número de intentos: '.concat(attemptMax-attemptsNum);

            if (guess < randomNumber) {
                helpText.textContent = guess.concat(' es demasiado bajo.'); 
            } else if (guess > randomNumber) {
                helpText.textContent = guess.concat(' es demasiado alto.');
            } else {
                helpText.textContent = 'Has ganado! El número era: '.concat(guess);
                numberGuessed = true;

                // Si el número de intentos es un nuevo récord, se almacena en el localStorage
                if(attemptsNum < localStorage.getItem(difficulty) || localStorage.getItem(event.target.value)!= null){
                    saveRecord(difficulty, attemptsNum);
                }
            }
            if(attemptsNum==attemptMax && numberGuessed==false){
                helpText.textContent = 'Te has quedado sin intentos! El número era: '.concat(randomNumber);
            }
            
        }
    });
    
    // Si el usuario desea resetear el juego se restablecen todos los valores
    reset.addEventListener("click", () => {
        displayGame.style.display = "none";
        selDifficulty.disabled = false;
        difficultyIsSelected = false;
        numberGuessed=false;
        selDifficulty.selectedIndex = 0;
        helpText.textContent = '';
        guessText.value = "";
        attemptsNum = 0;
        
        
    });
    
    // Función para guardar el nuevo record en el localStorage
    function saveRecord(key, attemptsNum){
        localStorage.setItem(key, attemptsNum);
    }
});
