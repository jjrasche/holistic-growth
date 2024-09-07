let currentStep = 1;
const totalSteps = 3; // Adjust this if you add more steps
let formData = {};

document.addEventListener('DOMContentLoaded', function() {
    // Load the last visited step from localStorage
    const savedStep = localStorage.getItem('currentStep');
    if (savedStep) {
        currentStep = parseInt(savedStep, 10);
    }
    loadStep(currentStep);
    updateNavigationButtons();
});

function loadStep(step) {
    if (step < totalSteps) {
        const url = `step${step}.html`; // Assuming the step files are named step1.html, step2.html, etc.
        const stepElement = document.getElementById(`step-${step}`);
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 400) {
                stepElement.innerHTML = xhr.responseText;
                stepElement.classList.add('active');
                attachInputListeners(stepElement);  // Attach event listeners to inputs
                loadFormData();  // Load any existing data from localStorage
            } else {
                console.error('Failed to load content.');
            }
        };
        xhr.onerror = function() {
            console.error('Request failed.');
        };
        
        xhr.send();
    } else if (step === totalSteps + 1) {
        // Redirect to the review page
        window.location.href = 'review.html';
    }

    // Save the current step to localStorage
    localStorage.setItem('currentStep', step);
}

function nextStep() {
    if (currentStep < totalSteps + 1) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep++;
        loadStep(currentStep);
        updateNavigationButtons();
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep--;
        loadStep(currentStep);
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'inline';
    document.getElementById('nextBtn').style.display = currentStep === totalSteps + 1 ? 'none' : 'inline';
}

// Attach event listeners to all inputs within a step
function attachInputListeners(stepElement) {
    const inputs = stepElement.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            saveFormData();
        });
    });
}

// Save form data to localStorage
function saveFormData() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        formData[input.name] = input.value;
    });
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Load form data from localStorage and populate the form
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    formData = savedData;
    
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (formData.hasOwnProperty(input.name)) {
            input.value = formData[input.name];
        }
    });
}
