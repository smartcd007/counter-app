// Counter app with step control and persistence
export class CounterApp {
  constructor(options = {}) {
    this.count = 0;
    this.step = 1;
    this.store = options.store || (typeof localStorage !== 'undefined' ? localStorage : null);

    // Restore saved values
    if (this.store) {
      const saved = this.store.getItem('counterValue');
      const savedStep = this.store.getItem('counterStep');
      if (saved !== null) this.count = Number(saved);
      if (savedStep !== null) this.step = Number(savedStep);
    }
  }

  increase() {
    this.count += this.step;
    this.persist();
    return this.count;
  }

  decrease() {
    this.count -= this.step;
    this.persist();
    return this.count;
  }

  reset() {
    this.count = 0;
    this.persist();
    return this.count;
  }

  setStep(newStep) {
    this.step = Math.max(1, Number(newStep));
    if (this.store) {
      this.store.setItem('counterStep', String(this.step));
    }
    return this.step;
  }

  getCount() {
    return this.count;
  }

  getStep() {
    return this.step;
  }

  persist() {
    if (this.store) {
      this.store.setItem('counterValue', String(this.count));
    }
  }

  getState() {
    return {
      count: this.count,
      step: this.step
    };
  }
}

// Initialize app if DOM is available
if (typeof document !== 'undefined') {
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

  if (stepInput) stepInput.value = step;

  function updateStep(newStep) {
    step = Math.max(1, Number(newStep));
    if (stepInput) stepInput.value = step;
    localStorage.setItem('counterStep', String(step));
  }

  function render() {
    if (counterEl) {
      counterEl.textContent = count;
      counterEl.classList.toggle('negative', count < 0);
      counterEl.classList.toggle('positive', count > 0);
      counterEl.classList.toggle('zero', count === 0);
    }
    if (infoText) {
      infoText.textContent = `Counter value: ${count} (step: ${step})`;
    }
    localStorage.setItem('counterValue', String(count));
  }

  // Event listeners
  if (incBtn) {
    incBtn.addEventListener('click', () => {
      count += step;
      render();
    });
  }

  if (decBtn) {
    decBtn.addEventListener('click', () => {
      count -= step;
      render();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      count = 0;
      render();
    });
  }

  if (stepInput) {
    stepInput.addEventListener('change', (e) => updateStep(e.target.value));
    stepInput.addEventListener('keyup', (e) => updateStep(e.target.value));
  }

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
}
