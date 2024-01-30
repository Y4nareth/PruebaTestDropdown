const questions = [
    {
        question: "Cuando se mezcla azul y amarillo se consigue ",
        answers: [
            { text: "magenta", correct:false},
            { text: "marrón", correct:false},
            { text: "verde", correct:true},
            { text: "naranja", correct:false}
        ]
    },
    {
        question: "La computación en la nube es mejor por que puedes hacer muchas cosas en ",
        answers: [
            { text: "la nube", correct:true},
            { text: "el sol", correct:false},
            { text: "el mar", correct:false},
            { text: "la montaña", correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const control = document.getElementById("control");
const nextButton = document.getElementById("next-btn");
const valButton = document.getElementById("validate-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswer = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    //valButton.innerHTML = "Confirmar";
    //nextButton.innerHTML = "Siguiente";
    showQuestion();
}

function getCorrectAnswer(currentQuestion){
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        if (currentQuestion.answers[i].correct) {
            return i+1;
        }
    }
    // If no correct answer found, return -1 or handle the case as needed
    return -1
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    correctAnswer = getCorrectAnswer(currentQuestion);
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    const question_label = createLabel(currentQuestion.question);
    const dropdown_menu = createDropdown(currentQuestion.answers);
    control.appendChild(question_label);
    control.appendChild(dropdown_menu);
    
    valButton.addEventListener("click", validateAnswer);
}

function createLabel(labelText) {
    // Create label element
    var label = document.createElement('label');
    label.textContent = labelText;

    return label;
}

function createDropdown(options) {
    var dropdown = document.createElement('select');

    dropdown.setAttribute('name', 'dropdown');
    dropdown.setAttribute('id', 'dropdown');

    options.forEach(option_value => {
        var option = document.createElement('option');
        option.setAttribute('value',option_value.text);
        option.textContent = option_value.text;
        option.dataset.correct = option_value.correct;
        dropdown.appendChild(option);
    });

    return dropdown;
}

function resetState(){
    while(control.firstChild){
        control.removeChild(control.firstChild);
    }
}


function validateAnswer(){

    nextButton.style.display = "inline";

    // Get the value of the selected radio button
    //var selectedOption = document.querySelector('input[name="group"]:checked');
    var selectElement = document.getElementById('dropdown');
    var selectedOption = selectElement.selectedIndex+1;

    var answers = control.children[1];
        
    // Check if an option is selected
    if (selectedOption) {
        // Check if the selected value is correct (option 2)
        if (selectedOption === correctAnswer) {
            answers.classList.add("correct");
            //alert("Respuesta correcta"); // Correct answer
        } else {
            answers.classList.add("incorrect");
            //alert("Respuesta incorrecta"); // Incorrect answer
        }
    } else {
        alert("Por favor seleccione una opción"); // No option selected
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(control.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntuación es ${score} de ${questions.length}`;
    nextButton.innerHTML = "Repetir Test";
    nextButton.style.display = "block";
}

function handleNextQuetion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQuetion();
    }else{
        startQuiz();
    }
});

startQuiz();