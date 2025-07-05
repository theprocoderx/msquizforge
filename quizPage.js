const questionTab = document.querySelector('.question-tab');
const optionAText = document.querySelector('.option-a >h6');
const optionBText = document.querySelector('.option-b >h6');
const optionCText = document.querySelector('.option-c >h6');
const optionDText = document.querySelector('.option-d >h6');
const optionTab = document.querySelector('.option-tab');
const options = document.querySelectorAll('.options');
const timer = document.querySelector('.timer');
const nextButton = document.querySelector('.next-button');
const questionProgress = document.querySelector('.question-progress');
const timeUp = document.querySelector('.time-up');
const correctSound = document.querySelector('.correct-sound')
const wrongSound = document.querySelector('.wrong-sound')
const audioIcon = document.getElementById("audioIcon");
const audioToggle = document.getElementById("audioToggle");
const retryButton = document.getElementById("retry-button");

let countdown = 31;
let questionNumber =0;
let userResult =0;
let countClearId;

const questionSet = [
  [
    '1. Inside which HTML element do we put the JavaScript?',
    ['<js>', '<scripting>', '<javaScript>', '<script>', 'option-d'],
  ],
  [
    "2. What does the 'boolean' data type mean in JavaScript?",
    [
      'It represents floating-point numbers',
      'It represents whole numbers',
      'It represents true or false values',
      'It represents strings',
      'option-c',
    ],
  ],
  [
    "3. What does the 'null' data type represent in JavaScript?",
    [
      'It represents arrays',
      'It represents an absence of a value',
      'It represents functions',
      'It represents true or false values',
      'option-b',
    ],
  ],
  [
    '4. What data type is used to assign any number in JavaScript?',
    ['integer', 'float', 'number', 'double', 'option-c'],
  ],
  [
    '5. What is an example of non-primitive data type?',
    ['string', 'undefined', 'object', 'boolean', 'option-c'],
  ],
  [
    '6. What is typeof null?',
    ['null', 'undefined', 'primitive', 'object', 'option-d'],
  ],
  [
    '7. How would you convert a number to a string in JavaScript?',
    [
      'Using the parseFloat() function',
      'By concatenating with an empty string',
      'Using the toString() method',
      'Both B and C',
      'option-b',
    ],
  ],
  [
    '8. How would you convert a string to a number in JavaScript?',
    [
      'Using the toNumber() method',
      'By concatenating with a number',
      'Using the parseInt() or parseFloat() functions',
      'By using the stringify() method',
      'option-b',
    ],
  ],
  [
    '9. Which data type in JavaScript is used to represent large numbers?',
    ['Float', 'Double', 'Integer', 'BigInt', 'option-d'],
  ],
  [
    "10. What's the most basic difference between using let and const for creating variables in JavaScript?",
    [
      'Variables declared with let can be reassigned, while variables declared with const cannot.',
      'Variables declared with const are scoped to the function level, while variables declared with let are scoped to the block level.',
      'Variables declared with let have global scope, while variables declared with const have local scope.',
      'Variables declared with const are automatically hoisted to the top of their scope, while variables declared with let are not.',
      'option-a',
    ],
  ],
  [
    "11. What is the difference between using 'let' and 'var' for creating variables in JavaScript?",
    [
      'There is not difference between let and var both are same.',
      'let variables can not be accessed outside of a block while var variables can be accessed outside of a block',
      "Variables declared with 'let' cannot be reassigned after initialization, while variables declared with 'var' can be reassigned.",
      'None of the above',
      'option-b',
    ],
  ],
  [
    '12. Which of the following statements about variable naming rules in JavaScript is correct?',
    [
      'Variable names cannot begin with a number.',
      'Variable names can include special characters such as @ or #.',
      'Variable names are case-insensitive.',
      'Variable names can contain spaces.',
      'option-a',
    ],
  ],
  [
    '13. What is the recommended convention for naming variables in JavaScript?',
    ['camelCase', 'snake_case', 'PascalCase', 'kebab-case', 'option-a'],
  ],
  [
    '14. How to does JavaScript code gets executed?',
    [
      'Sequentially, line by line',
      'Randomly, based on browser preferences',
      'Simultaneously, across multiple threads',
      'Depending on the complexity of the code',
      'option-a',
    ],
  ],
  [
    '15. What are the two main phases of JavaScript code execution?',
    [
      'Parsing Phase and Execution Phase',
      'Memory Creation Phase and Code Execution Phase',
      'Initialization Phase and Execution Phase',
      'Memory Allocation Phase and Execution Phase',
      'option-b',
    ],
  ],
  [
    '16. During the Memory Creation Phase, what happens in JavaScript?',
    [
      'Variables are assigned values.',
      'Functions are executed.',
      'Variables and functions are hoisted and memory is allocated.',
      'Code is parsed and syntax errors are checked.',
      'option-c',
    ],
  ],
  [
    '17. During the Code Execution Phase, what happens in JavaScript?',
    [
      'Variables are assigned undefined.',
      'Functions and variables are stored in memory.',
      'Syntax errors are checked and resolved.',
      'Code is actually executed and values are assigned to variables.',
      'option-d',
    ],
  ],
  [
    '18. What is the primary purpose of the defer keyword in a script tag?',
    [
      'To load the script immediately without waiting for the HTML to load.',
      'To delay the script execution until after the HTML document has been parsed.',
      'To execute the script before the HTML document is parsed.',
      'To defer the execution of the script until all other scripts have been executed.',
      'option-b',
    ],
  ],
  [
    '19. What is the purpose of the debugger keyword in JavaScript?',
    [
      'To stop the execution of the script and display an alert.',
      'To automatically fix errors in the script.',
      'To invoke any available debugging functionality, such as setting a breakpoint.',
      'To log errors to the console.',
      'option-c',
    ],
  ],
  [
    '20. What is the Temporal Dead Zone (TDZ) in JavaScript?',
    [
      ' A period when variables can be declared but not assigned values.',
      'The time interval between declaring a variable with let or const and its initialization.',
      'A period when functions can be called but variables cannot be accessed.',
      'A zone where all variables are assigned null values.',
      'option-b',
    ],
  ],
  [
    '21. How do you display an input box to prompt the user for their name in JavaScript?',
    [
      "alert('Enter your name:');",
      "prompt('Enter your name:');",
      "confirm('Enter your name:');",
      "input('Enter your name:');",
      'option-b',
    ],
  ],
  [
    '22. Why do we use a prompt dialog box in JavaScript?',
    [
      'To display messages to the user',
      'To confirm an action with the user',
      'To input data from the user',
      'To provide options to the user',
      'option-c',
    ],
  ],
  [
    '23. What is the confirm input box used for in JavaScript?',
    [
      'To display messages to the user',
      'To input data from the user',
      ' To confirm an action with the user',
      'To provide options to the use',
      'option-c',
    ],
  ],
  [
    '24. What is the length property of a string in JavaScript, and how do you use it?',
    [
      'It counts the number of words in a string and is used as string.words.',
      'It provides the number of characters in a string and is accessed as string.length.',
      'It changes the size of the string and is used as string.size.',
      'It converts the string to its byte length and is accessed as string.byteLength.',
      'option-b',
    ],
  ],
  [
    '25. How do you convert a string to uppercase using a string method in JavaScript?',
    [
      'upperCase()',
      'toUpperCase()',
      'capitalize()',
      'makeUpperCase()',
      'option-b',
    ],
  ],
]

  questionTab.textContent = questionSet[0][0]
  optionAText.textContent = questionSet[0][1][0]
  optionBText.textContent = questionSet[0][1][1]
  optionCText.textContent = questionSet[0][1][2]
  optionDText.textContent = questionSet[0][1][3]

  audioToggle.addEventListener("click", () => {
      if (audioIcon.classList.contains("fa-volume-up")) {
        audioIcon.classList.remove("fa-volume-up");
        audioIcon.classList.add("fa-volume-mute");
      } else {
        audioIcon.classList.remove("fa-volume-mute");
        audioIcon.classList.add("fa-volume-up");
      }
  });
  startCountdownTimer()
  retryButton.addEventListener('click', ()=>{
      window.location.href = 'homePage.html';
  })
nextButton.addEventListener('click', (e)=>{
    resetColors()
    timeUp.classList.remove('time-up-show');
    if(optionTab.style.pointerEvents === 'none'){
        questionNumber++;
        if(questionNumber <= 8){
            questionProgress.textContent =`0${questionNumber + 1}/25`
        }else{
            questionProgress.textContent =`${questionNumber + 1}/25`
        }
        countdown = 31;
        questionTab.textContent = questionSet[questionNumber][0];
        optionAText.textContent = questionSet[questionNumber][1][0];
        optionBText.textContent = questionSet[questionNumber][1][1];
        optionCText.textContent = questionSet[questionNumber][1][2];
        optionDText.textContent = questionSet[questionNumber][1][3];

         startCountdownTimer()       
        optionTab.style.pointerEvents = 'auto';
        options.forEach((resetOption) =>{
            const resultImg = resetOption.querySelector('.results .images');
            const resultText = resetOption.querySelector('.results h6')
            if(resultImg) resultImg.style.display = 'none'
            if(resultText) resultText.style.display = 'none'
        })
     }
    
})
  

        options.forEach((optionElement) =>{
            optionElement.addEventListener('click', (e)=>{
                  if(countdown > 0){
                    optionTab.style.pointerEvents = 'none';
                    clearInterval(countClearId);

                    const correctClass = questionSet[questionNumber][1][4];

                    if(optionElement.classList.contains(correctClass)){
                        const resultImg = optionElement.querySelector('.results .images')
                        if(resultImg){
                            resultImg.style.display = 'block';
                            resultImg.src = 'images/correct.svg'
                        }
                        userResult++;
                        localStorage.setItem('userResult', userResult)
                        if(audioIcon.classList.contains("fa-volume-up")) correctSound.play()
                    }else{

                        if(audioIcon.classList.contains("fa-volume-up")) wrongSound.play()
                            const resultsDiv = optionElement.querySelector('.results')
                            const resultImg = resultsDiv.querySelector('.images')
                            const resultText = resultsDiv.querySelector('h6')
                            if(resultImg){
                                resultImg.style.display = 'block';
                                resultImg.src = 'images/wrong.svg'
                            }
                            if(resultText) resultText.style.display ='block'
                            //show correct Answer
                            options.forEach((correctAnswer)=>{
                                if(correctAnswer.classList.contains(correctClass)){
                                  const correctImg = correctAnswer.querySelector('.results .images');
                                  if(correctImg){
                                    correctImg.style.display ='block';
                                    correctImg.src = 'images/correct.svg'
                                  }
                                }
                            })
                        }
                        if (questionNumber === 24) {
                          nextButton.textContent = 'Show Result';

                          if (!nextButton.classList.contains('result-bound')) {
                            nextButton.classList.add('result-bound');
                            nextButton.onclick = () => {
                              window.location.href = 'circleResultPage.html';
                            };
                          }
                        }
                  }
            })
        })
   
function resetColors() {
    document.body.style.backgroundColor = '';
    timer.style.backgroundColor = '';
    timer.style.boxShadow = '';
    nextButton.style.backgroundColor = '';
    nextButton.style.boxShadow = '';
}
function startCountdownTimer() {
    countClearId = setInterval(() => {
        countdown--;
        timer.textContent = countdown <= 9 ? `00:0${countdown}s` : `00:${countdown}s`;

        if (countdown === 0) {
            clearInterval(countClearId);
            timeUp.classList.add('time-up-show');
            optionTab.style.pointerEvents = 'none';
        }

        if (countdown <= 30) {
            document.body.style.backgroundColor = '#6eb050';
            timer.style.backgroundColor = '#02a40a78';
            timer.style.boxShadow = '1px 4px #1b781f6e';
            nextButton.style.backgroundColor = '#02a40a78';
            nextButton.style.boxShadow = '1px 4px #1b781f6e';
        }
        if (countdown <= 15) {
            document.body.style.backgroundColor = ' #71741b';
            timer.style.backgroundColor = '#c5b1006e';
            timer.style.boxShadow = '1px 4px #6b6e22';
            nextButton.style.backgroundColor = '#c5b1006e';
            nextButton.style.boxShadow = '1px 4px #6b6e22';
        }
        if (countdown <= 5) {
            document.body.style.backgroundColor = '#a63b33';
            timer.style.backgroundColor = '#c5392f';
            timer.style.boxShadow = '1px 4px #a6322a';
            nextButton.style.backgroundColor = '#c5392f';
            nextButton.style.boxShadow = '1px 4px #a63b33';
        }
    }, 1000);
}