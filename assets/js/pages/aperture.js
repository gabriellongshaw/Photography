const range = document.getElementById('aperture-range');
const fstopValue = document.getElementById('fstop-value');
const fstopDisplay = document.getElementById('fstop-display');
const simImage = document.getElementById('sim-image');

function updateProgress(input) {
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const val = parseFloat(input.value);
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--progress', `${pct}%`);
}

function updateSim(v) {
  const rounded = Math.round(v * 10) / 10;
  const label = 'f/' + (rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1));
  fstopValue.textContent = label;
  fstopDisplay.textContent = label;

  const blur = Math.max(0, (22 - v) / (22 - 1.4) * 10);
  const brightness = 1 + ((2.8 - v) / (22 - 1.4)) * 0.6;
  simImage.style.filter = `blur(${blur.toFixed(1)}px) brightness(${Math.max(0.65, brightness).toFixed(2)})`;

  updateProgress(range);
}

if (range) {
  range.addEventListener('input', e => updateSim(parseFloat(e.target.value)));
  updateSim(parseFloat(range.value));
}