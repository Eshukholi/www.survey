const form = document.getElementById('surveyForm');
const formSteps = Array.from(document.querySelectorAll('.form-step'));
let currentStep = 0;

// Show step
function showStep(step) {
    formSteps.forEach((el, i) => el.classList.toggle('form-step-active', i === step));
}

// Validate step
function validateStep(step) {
    const fields = formSteps[step].querySelectorAll('input, select, textarea');
    for (let field of fields) {
        if (field.type === 'radio') {
            const checked = formSteps[step].querySelector(`input[name="${field.name}"]:checked`);
            if (!checked) return false;
        } else if (!field.value) {
            return false;
        } else if (field.name === "age" && parseInt(field.value) <= 18) {
            alert("You must be older than 18 years to submit the survey.");
            return false;
        }
    }
    return true;
}

// Next/Prev buttons
form.addEventListener('click', e => {
    if (e.target.classList.contains('btn-next')) {
        if (validateStep(currentStep)) {
            if (currentStep < formSteps.length - 2) currentStep++;
            showStep(currentStep);
        } else alert("Please fill all fields correctly before proceeding.");
    }
    if (e.target.classList.contains('btn-prev')) {
        if (currentStep > 0) currentStep--;
        showStep(currentStep);
    }
});

// Submit with AJAX
form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateStep(currentStep)) { 
        alert("Please fill all fields correctly before submitting."); 
        return; 
    }

    const formData = new FormData(form);

    fetch("Submit.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === "success") {
            currentStep = formSteps.length - 1;
            showStep(currentStep);
        } else {
            alert("🎉submission successfully submitted: " + data);
        }
    })
    .catch(err => alert("Submission successfully submitted: " + err));
});
