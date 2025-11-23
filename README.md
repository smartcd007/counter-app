# Counter App

A modern HTML/CSS/JS counter with customizable step control and keyboard shortcuts.

## Features

- ✨ **Adjustable Step**: Control increment/decrement amount
- 💾 **Local Storage**: Counter and step values persist between sessions
- ⌨️ **Keyboard Shortcuts**:
  - `↑` or `+` to increase
  - `↓` or `-` to decrease
  - `0` or `R` to reset
- 🎨 **Color-coded Display**: Green for positive, red for negative, neutral for zero
- ♿ **Accessible**: ARIA labels and semantic HTML for screen readers

## Usage

1. Open `index.html` in your browser, or use VS Code Live Server extension
2. Click buttons or use keyboard shortcuts to adjust the counter
3. Modify the step value to control increment amounts
4. Your values are automatically saved to browser storage

## Development

### Setup

```bash
npm install
```

### Testing

Run the test suite:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

### File Structure

- `index.html` - Markup with form controls and buttons
- `script.js` - Counter logic with localStorage persistence and keyboard handlers
- `styles.css` - Modern styling with hover effects and responsive design
- `__tests__/` - Test suite with comprehensive test cases
