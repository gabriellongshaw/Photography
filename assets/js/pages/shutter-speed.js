const range = document.getElementById('shutter-range');
const shutterValue = document.getElementById('shutter-value');
const shutterDisplay = document.getElementById('shutter-display');
const simImage = document.getElementById('shutter-sim-image');

const shutterSpeeds = [
  '1s', '1/2s', '1/4s', '1/8s', '1/15s', '1/30s',
  '1/60s', '1/125s', '1/250s', '1/500s', '1/1000s', '1/2000s', '1/4000s'
];

const imageMap = {
  '1s':      'https://picsum.photos/900/600?image=1058',
  '1/2s':    'https://picsum.photos/900/600?image=1040',
  '1/4s':    'https://picsum.photos/900/600?image=1012',
  '1/8s':    'https://picsum.photos/900/600?image=1012',
  '1/15s':   'https://picsum.photos/900/600?image=1012',
  '1/30s':   'https://picsum.photos/900/600?image=1012',
  '1/60s':   'https://picsum.photos/900/600?image=1021',
  '1/125s':  'https://picsum.photos/900/600?image=1021',
  '1/250s':  'https://picsum.photos/900/600?image=1021',
  '1/500s':  'https://picsum.photos/900/600?image=1024',
  '1/1000s': 'https://picsum.photos/900/600?image=1024',
  '1/2000s': 'https://picsum.photos/900/600?image=1024',
  '1/4000s': 'https://picsum.photos/900/600?image=1024',
};

function updateProgress(input) {
  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const val = parseFloat(input.value);
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--progress', `${pct}%`);
}

function updateSim(value) {
  updateProgress(range);

  const max = parseFloat(range.max);
  const index = Math.floor(Math.pow(value / max, 2) * (shutterSpeeds.length - 1));
  const speed = shutterSpeeds[index];

  shutterValue.textContent = speed;
  shutterDisplay.textContent = speed;

  const blurAmount = Math.max(0, (1 - value / max) * 8);
  simImage.style.filter = `blur(${blurAmount.toFixed(1)}px)`;

  const newSrc = imageMap[speed];
  if (newSrc && simImage.src !== newSrc) simImage.src = newSrc;
}

if (range) {
  range.addEventListener('input', e => updateSim(parseFloat(e.target.value)));
  updateSim(parseFloat(range.value));
}