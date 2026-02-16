const bodyWeightInput = document.getElementById('body-weight');
const equipmentWeightInput = document.getElementById('equipment-weight');
const canopySizeInput = document.getElementById('canopy-size');
const bodyWeightDisplay = document.getElementById('body-weight-display');
const equipmentWeightDisplay = document.getElementById('equipment-weight-display');
const canopySizeDisplay = document.getElementById('canopy-size-display');
const wingloadValue = document.getElementById('wingload-value');
const wingloadResult = document.getElementById('wingload-result');
const wingloadSlider = document.getElementById('wingload-slider');
const levelBanner = document.getElementById('level-banner');
const levelText = document.getElementById('level-text');

function updateSliderFill(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--blue) 0%, var(--blue) ${pct}%, var(--gray-200) ${pct}%, var(--gray-200) 100%)`;
}

function calculate() {
    const bodyKg = parseFloat(bodyWeightInput.value);
    const equipKg = parseFloat(equipmentWeightInput.value);
    const canopySqFt = parseFloat(canopySizeInput.value);

    const bodyLbs = Math.round(bodyKg * 2.20462);
    const equipLbs = Math.round(equipKg * 2.20462);

    bodyWeightDisplay.textContent = `${bodyKg} kg (${bodyLbs} lbs)`;
    equipmentWeightDisplay.textContent = `${equipKg} kg (${equipLbs} lbs)`;
    canopySizeDisplay.textContent = `${canopySqFt} sq ft`;

    const totalLbs = (bodyKg + equipKg) * 2.20462;
    const wingload = totalLbs / canopySqFt;

    wingloadValue.textContent = wingload.toFixed(2);
    wingloadSlider.value = Math.min(wingload, 3);

    let levelClass, text;
    if (wingload < 1.1) {
        levelClass = 'level-basic';
        text = 'BASIC Recommended minimum: 0+ jumps';
    } else if (wingload < 1.5) {
        levelClass = 'level-intermediate';
        text = 'INTERMEDIATE Recommended minimum: 200+ jumps';
    } else if (wingload < 1.9) {
        levelClass = 'level-advanced';
        text = 'ADVANCED Recommended minimum: 600+ jumps';
    } else {
        levelClass = 'level-expert';
        text = 'EXPERT Recommended minimum: 1500+ jumps';
    }

    wingloadResult.className = `wingload-result ${levelClass}`;
    levelBanner.className = `level-banner ${levelClass}`;
    levelText.textContent = text;

    updateSliderFill(bodyWeightInput);
    updateSliderFill(equipmentWeightInput);
    updateSliderFill(canopySizeInput);
}

[bodyWeightInput, equipmentWeightInput, canopySizeInput].forEach(input => {
    input.addEventListener('input', calculate);
});

calculate();
