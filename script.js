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
    slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`;
}

// Update slider value displays in real-time
jumperWeightInput.addEventListener('input', (e) => {
    const kg = parseFloat(e.target.value);
    const lbs = (kg * 2.20462).toFixed(0);
    jumperWeightValue.textContent = `${kg} kg (${lbs} lbs)`;
    updateSliderBackground(e.target);
});

gearWeightInput.addEventListener('input', (e) => {
    const kg = parseFloat(e.target.value);
    const lbs = (kg * 2.20462).toFixed(0);
    gearWeightValue.textContent = `${kg} kg (${lbs} lbs)`;
    updateSliderBackground(e.target);
});

canopySizeInput.addEventListener('input', (e) => {
    canopySizeValue.textContent = e.target.value;
    updateSliderBackground(e.target);
});

// Initialize slider backgrounds and display values
updateSliderBackground(jumperWeightInput);
updateSliderBackground(gearWeightInput);
updateSliderBackground(canopySizeInput);

// Initialize display values
const initJumperKg = parseFloat(jumperWeightInput.value);
jumperWeightValue.textContent = `${initJumperKg} kg (${(initJumperKg * 2.20462).toFixed(0)} lbs)`;

const initGearKg = parseFloat(gearWeightInput.value);
gearWeightValue.textContent = `${initGearKg} kg (${(initGearKg * 2.20462).toFixed(0)} lbs)`;

canopySizeValue.textContent = canopySizeInput.value;

// Calculate wingload
function calculateWingload() {
    const jumperWeightKg = parseFloat(jumperWeightInput.value) || 0;
    const gearWeightKg = parseFloat(gearWeightInput.value) || 0;
    const canopySizeSqFt = parseFloat(canopySizeInput.value) || 0;

    // Validation
    if (jumperWeightKg <= 0 || gearWeightKg < 0 || canopySizeSqFt <= 0) {
        alert('Please enter valid values for all fields.');
        return;
    }

    // Convert total weight from kg to lbs
    const totalWeightKg = jumperWeightKg + gearWeightKg;
    const totalWeightLbs = totalWeightKg * 2.20462;
    
    // Calculate wing loading in lbs/sq ft
    const wingload = totalWeightLbs / canopySizeSqFt;

    // Display results
    wingloadValue.textContent = wingload.toFixed(2);
    
    // Display breakdown
    wingloadBreakdown.innerHTML = `
        <div><strong>Total Weight:</strong> ${totalWeightKg.toFixed(1)} kg (${totalWeightLbs.toFixed(1)} lbs)</div>
        <div><strong>Canopy Size:</strong> ${canopySizeSqFt.toFixed(0)} sq ft</div>
    `;

    // Determine wingload category and display info (in lbs/sq ft)
    let category, categoryClass, description, advice, jumps;
    
    if (wingload < 1.1) {
        category = 'BASIC';
        categoryClass = 'wingload-low';
        jumps = 0;
        description = 'Basic wing loading';
        advice = 'This is a basic wing loading suitable for students and novice jumpers. Your canopy will have slower forward speed and more forgiving flight characteristics. Great for building skills and confidence.';
    } else if (wingload >= 1.1 && wingload < 1.5) {
        category = 'INTERMEDIATE';
        categoryClass = 'wingload-moderate';
        jumps = 200;
        description = 'Intermediate wing loading';
        advice = 'This is an intermediate wing loading suitable for recreational skydivers. Good balance between performance and safety. Recommended minimum: 200+ jumps.';
    } else if (wingload >= 1.5 && wingload < 1.9) {
        category = 'ADVANCED';
        categoryClass = 'wingload-high';
        jumps = 600;
        description = 'Advanced wing loading';
        advice = 'This is an advanced wing loading requiring advanced canopy skills. Your canopy will have increased forward speed and requires more precise control. Recommended minimum: 600+ jumps.';
    } else {
        category = 'EXPERT';
        categoryClass = 'wingload-high';
        jumps = 1500;
        description = 'Expert level wing loading';
        advice = '⚠️ This is an expert level wing loading suitable only for expert skydivers. Requires excellent canopy skills, precise timing, and advanced decision-making. Higher risk of injury if not handled properly. Recommended minimum: 1500+ jumps. Always consult with instructors before jumping at this wing loading.';
    }

    // Update info card
    infoCard.className = `info-card ${categoryClass}`;
    infoContent.innerHTML = `
        <div style="margin-bottom: 0.75rem;">
            <strong>Category:</strong> ${category}
        </div>
        <div style="margin-bottom: 0.75rem;">
            <strong>Recommended minimum:</strong> ${jumps}+ jumps
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
