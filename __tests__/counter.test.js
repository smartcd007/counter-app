const { CounterApp } = require('../script.js');

describe('CounterApp', () => {
  let app;
  let mockStore;

  beforeEach(() => {
    // Create a mock store for testing without localStorage
    mockStore = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value;
      },
      clear() {
        this.store = {};
      }
    };

    app = new CounterApp({ store: mockStore });
  });

  afterEach(() => {
    // Clear the store after each test
    if (mockStore) {
      mockStore.clear();
    }
  });

  describe('Initialization', () => {
    it('should initialize with count 0 and step 1', () => {
      const freshApp = new CounterApp({ store: mockStore });
      expect(freshApp.getCount()).toBe(0);
      expect(freshApp.getStep()).toBe(1);
    });

    it('should restore count from store', () => {
      mockStore.setItem('counterValue', '42');
      const restoredApp = new CounterApp({ store: mockStore });
      expect(restoredApp.getCount()).toBe(42);
    });

    it('should restore step from store', () => {
      mockStore.setItem('counterStep', '5');
      const restoredApp = new CounterApp({ store: mockStore });
      expect(restoredApp.getStep()).toBe(5);
    });

    it('should restore both count and step from store', () => {
      mockStore.setItem('counterValue', '10');
      mockStore.setItem('counterStep', '3');
      const restoredApp = new CounterApp({ store: mockStore });
      expect(restoredApp.getCount()).toBe(10);
      expect(restoredApp.getStep()).toBe(3);
    });
  });

  describe('Increase Operation', () => {
    it('should increase count by step', () => {
      const result = app.increase();
      expect(result).toBe(1);
      expect(app.getCount()).toBe(1);
    });

    it('should increase by custom step', () => {
      app.setStep(5);
      const result = app.increase();
      expect(result).toBe(5);
      expect(app.getCount()).toBe(5);
    });

    it('should increase multiple times', () => {
      app.increase();
      app.increase();
      app.increase();
      expect(app.getCount()).toBe(3);
    });

    it('should increase from negative to positive', () => {
      app.count = -5;
      app.increase();
      expect(app.getCount()).toBe(-4);
    });

    it('should persist increase to store', () => {
      app.increase();
      expect(mockStore.getItem('counterValue')).toBe('1');
    });
  });

  describe('Decrease Operation', () => {
    it('should decrease count by step', () => {
      const result = app.decrease();
      expect(result).toBe(-1);
      expect(app.getCount()).toBe(-1);
    });

    it('should decrease by custom step', () => {
      app.setStep(3);
      const result = app.decrease();
      expect(result).toBe(-3);
      expect(app.getCount()).toBe(-3);
    });

    it('should decrease multiple times', () => {
      app.decrease();
      app.decrease();
      app.decrease();
      expect(app.getCount()).toBe(-3);
    });

    it('should decrease to negative numbers', () => {
      app.count = 0;
      app.decrease();
      app.decrease();
      expect(app.getCount()).toBe(-2);
    });

    it('should persist decrease to store', () => {
      app.decrease();
      expect(mockStore.getItem('counterValue')).toBe('-1');
    });
  });

  describe('Reset Operation', () => {
    it('should reset count to 0', () => {
      app.count = 42;
      const result = app.reset();
      expect(result).toBe(0);
      expect(app.getCount()).toBe(0);
    });

    it('should reset negative count to 0', () => {
      app.count = -10;
      app.reset();
      expect(app.getCount()).toBe(0);
    });

    it('should persist reset to store', () => {
      app.count = 50;
      app.reset();
      expect(mockStore.getItem('counterValue')).toBe('0');
    });
  });

  describe('Step Control', () => {
    it('should set step to a positive number', () => {
      const result = app.setStep(5);
      expect(result).toBe(5);
      expect(app.getStep()).toBe(5);
    });

    it('should prevent step from being less than 1', () => {
      const result = app.setStep(0);
      expect(result).toBe(1);
      expect(app.getStep()).toBe(1);
    });

    it('should prevent step from being negative', () => {
      const result = app.setStep(-5);
      expect(result).toBe(1);
      expect(app.getStep()).toBe(1);
    });

    it('should convert string input to number', () => {
      app.setStep('10');
      expect(app.getStep()).toBe(10);
    });

    it('should persist step to store', () => {
      app.setStep(7);
      expect(mockStore.getItem('counterStep')).toBe('7');
    });

    it('should affect increase/decrease operations', () => {
      app.setStep(10);
      app.increase();
      expect(app.getCount()).toBe(10);
      app.decrease();
      expect(app.getCount()).toBe(0);
    });
  });

  describe('State Management', () => {
    it('should return current state', () => {
      app.count = 5;
      app.step = 2;
      const state = app.getState();
      expect(state).toEqual({ count: 5, step: 2 });
    });

    it('should return updated state after operations', () => {
      app.setStep(3);
      app.increase();
      const state = app.getState();
      expect(state).toEqual({ count: 3, step: 3 });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid increases and decreases', () => {
      app.increase();
      app.increase();
      app.decrease();
      app.increase();
      expect(app.getCount()).toBe(2);
    });

    it('should handle step changes mid-operation', () => {
      app.increase(); // count = 1
      expect(app.getCount()).toBe(1);
      app.setStep(5);
      app.increase(); // count = 1 + 5 = 6
      expect(app.getCount()).toBe(6);
      app.decrease(); // count = 6 - 5 = 1
      expect(app.getCount()).toBe(1);
    });

    it('should oscillate around zero', () => {
      app.setStep(2);
      app.increase(); // 2
      app.increase(); // 4
      app.decrease(); // 2
      app.decrease(); // 0
      app.decrease(); // -2
      app.increase(); // 0
      expect(app.getCount()).toBe(0);
    });

    it('should work with large numbers', () => {
      app.setStep(1000);
      app.increase();
      app.increase();
      expect(app.getCount()).toBe(2000);
      app.decrease();
      expect(app.getCount()).toBe(1000);
    });

    it('should persist all state changes in order', () => {
      app.setStep(2);
      app.increase();
      app.increase();
      app.decrease();
      app.reset();

      expect(mockStore.getItem('counterValue')).toBe('0');
      expect(mockStore.getItem('counterStep')).toBe('2');
    });
  });

  describe('No Store Scenario', () => {
    it('should work without a store', () => {
      const appNoStore = new CounterApp({ store: null });
      appNoStore.increase();
      appNoStore.increase();
      expect(appNoStore.getCount()).toBe(2);
    });

    it('should handle operations without persistence', () => {
      // Create a fresh app instance without any shared state
      const freshApp = new CounterApp({ store: null });
      freshApp.setStep(5);
      freshApp.increase();
      expect(freshApp.getCount()).toBe(5);
      expect(freshApp.getStep()).toBe(5);
    });
  });
});
