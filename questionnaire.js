
const questions = [
    {
        question: "What is your name?",
        type: "text",
        name: "name"
    },
    {
        question: "What is your email?",
        type: "email",
        name: "email"
    },
    {
        question: "What is your age?",
        type: "number",
        name: "age"
    }
    // Add more questions as needed
];

let step = 0;
let formData = {};

// Initialize the wizard by loading the first question
document.addEventListener('DOMContentLoaded', function() {
    loadQuestion(step);
    updateNavigationButtons();
});

function loadQuestion(index) {
    const questionContainer = document.getElementById('question');
    const currentQuestion = questions[index];

    // Clear existing content
    questionContainer.innerHTML = '';

    // Create the question label
    const label = document.createElement('label');
    label.setAttribute('for', currentQuestion.name);
    label.textContent = currentQuestion.question;

    // Create the input element
    const input = document.createElement('input');
    input.setAttribute('type', currentQuestion.type);
    input.setAttribute('id', currentQuestion.name);
    input.setAttribute('name', currentQuestion.name);
    input.value = formData[currentQuestion.name] || ''; // Pre-fill with existing data if available

    // Add event listener to save input data
    input.addEventListener('input', function() {
        saveFormData(currentQuestion.name, input.value);
    });

    // Append the label and input to the container
    questionContainer.appendChild(label);
    questionContainer.appendChild(input);

    questionContainer.classList.add('active');
}

function saveFormData(name, value) {
    formData[name] = value;
    localStorage.setItem('formData', JSON.stringify(formData));
}

function nextQuestion() {
    if (step < questions.length - 1) {
        step++;
        loadQuestion(step);
        updateNavigationButtons();
    }
}

function prevQuestion() {
    if (step > 0) {
        step--;
        loadQuestion(step);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').style.display = step === 0 ? 'none' : 'inline';
    document.getElementById('nextBtn').style.display = step === questions.length - 1 ? 'none' : 'inline';
}

// Load saved form data if it exists
(function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    formData = savedData;
})();
