const range = document.getElementById('iso-range');
const isoValue = document.getElementById('iso-value');
const isoDisplay = document.getElementById('iso-display');
const simImage = document.getElementById('iso-sim-image');

const isoStops = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];

function updateProgress(input) {
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const val = parseFloat(input.value);
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--progress', `${pct}%`);
}

function addNoise(canvas, ctx, amount) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * amount;
    data[i]     = Math.min(255, Math.max(0, data[i]     + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imageData, 0, 0);
}

let baseImageData = null;
let canvas = null;
let ctx = null;

function setupCanvas() {
  if (!simImage.complete || simImage.naturalWidth === 0) {
    simImage.onload = setupCanvas;
    return;
  }

  canvas = document.createElement('canvas');
  canvas.width = simImage.naturalWidth || 900;
  canvas.height = simImage.naturalHeight || 600;
  canvas.style.cssText = simImage.style.cssText;
  canvas.className = simImage.className;
  simImage.replaceWith(canvas);

  ctx = canvas.getContext('2d');
  ctx.drawImage(simImage, 0, 0, canvas.width, canvas.height);
  baseImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  updateSim(parseFloat(range.value));
}

function updateSim(value) {
  updateProgress(range);

  const max = parseFloat(range.max);
  const index = Math.round((value / max) * (isoStops.length - 1));
  const iso = isoStops[index];

  const label = `ISO ${iso.toLocaleString()}`;
  isoValue.textContent = label;
  isoDisplay.textContent = label;

  if (!canvas || !ctx || !baseImageData) return;

  ctx.putImageData(baseImageData, 0, 0);

  const noiseAmount = Math.pow(index / (isoStops.length - 1), 1.5) * 80;
  if (noiseAmount > 1) addNoise(canvas, ctx, noiseAmount);

  const brightness = 1 + (index / (isoStops.length - 1)) * 0.5;
  canvas.style.filter = `brightness(${brightness.toFixed(2)})`;
}

if (range) {
  range.addEventListener('input', e => updateSim(parseFloat(e.target.value)));
  setupCanvas();
}