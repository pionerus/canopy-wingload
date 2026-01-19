// DOM Elements
const jumperWeightInput = document.getElementById('jumper-weight');
const gearWeightInput = document.getElementById('gear-weight');
const canopySizeInput = document.getElementById('canopy-size');
const jumperWeightValue = document.getElementById('jumper-weight-value');
const gearWeightValue = document.getElementById('gear-weight-value');
const canopySizeValue = document.getElementById('canopy-size-value');
const calculateBtn = document.getElementById('calculate-btn');
const resultSection = document.getElementById('result-section');
const wingloadValue = document.getElementById('wingload-value');
const wingloadBreakdown = document.getElementById('wingload-breakdown');
const infoCard = document.getElementById('info-card');
const infoContent = document.getElementById('info-content');

// Update slider background gradient based on value
function updateSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--border-color) ${percentage}%, var(--border-color) 100%)`;
}

// Update slider value displays in real-time
jumperWeightInput.addEventListener('input', (e) => {
    jumperWeightValue.textContent = parseFloat(e.target.value).toFixed(1);
    updateSliderBackground(e.target);
});

gearWeightInput.addEventListener('input', (e) => {
    gearWeightValue.textContent = parseFloat(e.target.value).toFixed(1);
    updateSliderBackground(e.target);
});

canopySizeInput.addEventListener('input', (e) => {
    canopySizeValue.textContent = parseFloat(e.target.value).toFixed(1);
    updateSliderBackground(e.target);
});

// Initialize slider backgrounds
updateSliderBackground(jumperWeightInput);
updateSliderBackground(gearWeightInput);
updateSliderBackground(canopySizeInput);

// Calculate wingload
function calculateWingload() {
    const jumperWeight = parseFloat(jumperWeightInput.value) || 0;
    const gearWeight = parseFloat(gearWeightInput.value) || 0;
    const canopySize = parseFloat(canopySizeInput.value) || 0;

    // Validation
    if (jumperWeight <= 0 || gearWeight < 0 || canopySize <= 0) {
        alert('Please enter valid values for all fields.');
        return;
    }

    const totalWeight = jumperWeight + gearWeight;
    const wingload = totalWeight / canopySize;

    // Display results
    wingloadValue.textContent = wingload.toFixed(2);
    
    // Display breakdown
    wingloadBreakdown.innerHTML = `
        <div><strong>Total Weight:</strong> ${totalWeight.toFixed(1)} kg</div>
        <div><strong>Canopy Size:</strong> ${canopySize.toFixed(1)} sq m</div>
    `;

    // Determine wingload category and display info (in kg/sq m)
    let category, categoryClass, description, advice;
    
    if (wingload < 4.9) {
        category = 'Low';
        categoryClass = 'wingload-low';
        description = 'Conservative wing loading';
        advice = 'This is a conservative wing loading suitable for students and novice jumpers. Your canopy will have slower forward speed and more forgiving flight characteristics. Great for building skills and confidence.';
    } else if (wingload >= 4.9 && wingload < 7.3) {
        category = 'Moderate';
        categoryClass = 'wingload-moderate';
        description = 'Recreational wing loading';
        advice = 'This is a moderate wing loading suitable for most recreational skydivers. Good balance between performance and safety. Suitable for experienced jumpers comfortable with their canopy skills.';
    } else if (wingload >= 7.3 && wingload < 9.8) {
        category = 'High';
        categoryClass = 'wingload-high';
        description = 'High performance wing loading';
        advice = 'This is a high wing loading requiring advanced canopy skills. Your canopy will have increased forward speed and requires more precise control. Only recommended for experienced jumpers with extensive canopy control experience.';
    } else {
        category = 'Very High';
        categoryClass = 'wingload-high';
        description = 'Expert level wing loading';
        advice = '⚠️ This is a very high wing loading suitable only for expert skydivers. Requires excellent canopy skills, precise timing, and advanced decision-making. Higher risk of injury if not handled properly. Always consult with instructors before jumping at this wing loading.';
    }

    // Update info card
    infoCard.className = `info-card ${categoryClass}`;
    infoContent.innerHTML = `
        <div style="margin-bottom: 0.75rem;">
            <strong>Category:</strong> ${category}
        </div>
        <div style="margin-bottom: 0.75rem;">
            <strong>Description:</strong> ${description}
        </div>
        <div>
            <strong>Advice:</strong> ${advice}
        </div>
    `;

    // Show result section
    resultSection.style.display = 'block';
}

// Event listeners
calculateBtn.addEventListener('click', calculateWingload);

// Calculate on page load with default values
calculateWingload();

// Auto-calculate when sliders change
[jumperWeightInput, gearWeightInput, canopySizeInput].forEach(input => {
    input.addEventListener('input', () => {
        // Auto-calculate when user moves slider
        calculateWingload();
    });
});
