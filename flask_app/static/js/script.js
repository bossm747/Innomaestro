document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.getElementById('objectiveForm');
    const objectiveInput = document.getElementById('objective');
    const validationMessage = document.getElementById('objectiveValidation');

    form.addEventListener('submit', function(event) {
        if (!objectiveInput.value.trim()) {
            event.preventDefault();
            validationMessage.textContent = 'Objective cannot be empty.';
        } else {
            validationMessage.textContent = '';
        }
    });

    // AJAX call to load results dynamically
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const objective = objectiveInput.value.trim();
        if (objective) {
            fetchResults(objective);
        }
    });

    function fetchResults(objective) {
        fetch('/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ objective: objective })
        })
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Error fetching results:', error);
        });
    }

    function displayResults(results) {
        const resultsSection = document.getElementById('results');
        resultsSection.innerHTML = `<h2>Results</h2><p>${results}</p>`;
    }

    // Tooltips
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', function() {
            const tooltipText = this.querySelector('.tooltiptext');
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        });

        tooltip.addEventListener('mouseout', function() {
            const tooltipText = this.querySelector('.tooltiptext');
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
        });
    });
});
