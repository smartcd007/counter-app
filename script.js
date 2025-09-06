// Simple counter app
let count = 0;

// Optional: restore saved value from localStorage
const saved = localStorage.getItem('counterValue');
if (saved !== null) count = Number(saved);

const counterEl = document.getElementById('counter');
const incBtn = document.getElementById('increase');
const decBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');

function render() {
  counterEl.textContent = count;
  counterEl.classList.toggle('negative', count < 0);
  counterEl.classList.toggle('positive', count > 0);
  // Optional: persist
  localStorage.setItem('counterValue', String(count));
}

// Event listeners
incBtn.addEventListener('click', () => {
  count += 1;
  render();
});

decBtn.addEventListener('click', () => {
  count -= 1;
  render();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  render();
});

// initial render
render();
