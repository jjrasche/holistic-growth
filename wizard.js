let currentStep = 1;
const totalSteps = 3;

document.addEventListener('DOMContentLoaded', function() {
    loadStep(currentStep);
    updateNavigationButtons();
});

function loadStep(step) {
    const url = `step${step}.html`; // Assuming the step files are named step1.html, step2.html, etc.
    const stepElement = document.getElementById(`step-${step}`);
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            stepElement.innerHTML = xhr.responseText;
            stepElement.classList.add('active');
        } else {
            console.error('Failed to load content.');
        }
    };
    xhr.onerror = function() {
        console.error('Request failed.');
    };
    
    xhr.send();
}

function nextStep() {
    if (currentStep < totalSteps) {
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
    document.getElementById('nextBtn').style.display = currentStep === totalSteps ? 'none' : 'inline';
}
