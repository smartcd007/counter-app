// Counter app with step control and persistence
let count = 0;
let step = 1;

// Restore saved values from localStorage
const saved = localStorage.getItem('counterValue');
const savedStep = localStorage.getItem('counterStep');
if (saved !== null) count = Number(saved);
if (savedStep !== null) step = Number(savedStep);

const counterEl = document.getElementById('counter');
const incBtn = document.getElementById('increase');
const decBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');
const stepInput = document.getElementById('step');
const infoText = document.getElementById('info-text');

stepInput.value = step;

function updateStep(newStep) {
  step = Math.max(1, Number(newStep));
  stepInput.value = step;
  localStorage.setItem('counterStep', String(step));
}

function render() {
  counterEl.textContent = count;
  counterEl.classList.toggle('negative', count < 0);
  counterEl.classList.toggle('positive', count > 0);
  counterEl.classList.toggle('zero', count === 0);
  infoText.textContent = `Counter value: ${count} (step: ${step})`;
  localStorage.setItem('counterValue', String(count));
}

// Event listeners
incBtn.addEventListener('click', () => {
  count += step;
  render();
});

decBtn.addEventListener('click', () => {
  count -= step;
  render();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  render();
});

stepInput.addEventListener('change', (e) => updateStep(e.target.value));
stepInput.addEventListener('keyup', (e) => updateStep(e.target.value));

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === '+') {
    e.preventDefault();
    count += step;
    render();
  } else if (e.key === 'ArrowDown' || e.key === '-') {
    e.preventDefault();
    count -= step;
    render();
  } else if (e.key === '0' || e.key === 'r' || e.key === 'R') {
    e.preventDefault();
    count = 0;
    render();
  }
});

// Initial render
render();
