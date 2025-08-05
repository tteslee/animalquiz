# 🐾 Animal Quiz Game

A simple, mobile-friendly, and senior-friendly online quiz game about animals. Test your knowledge with questions of varying difficulty levels!

## Features

- **Senior-Friendly Design**: Large text, high contrast, and easy-to-use interface
- **Mobile Responsive**: Works perfectly on phones, tablets, and desktop computers
- **Three Difficulty Levels**: Easy, Normal, and Hard questions
- **Interactive Feedback**: Visual feedback for correct and incorrect answers
- **Progress Tracking**: See your progress and score in real-time
- **Keyboard Support**: Use A, B, C, D keys to answer questions
- **Beautiful UI**: Modern design with smooth animations and gradients

## How to Play

1. **Choose Difficulty**: Select Easy, Normal, or Hard level
2. **Read Questions**: Each question has 4 multiple-choice options
3. **Select Answer**: Click on your chosen answer or use keyboard (A, B, C, D)
4. **See Results**: Get immediate feedback and view your final score
5. **Play Again**: Try different difficulties or retry the same level

## File Structure

```
Animal quiz/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript game logic
├── animal_quiz_questions.csv  # Quiz questions data
└── README.md           # This file
```

## Running the Game

### Option 1: Simple Local Server (Recommended)
1. Open your terminal/command prompt
2. Navigate to the project folder
3. Run a local server:
   - **Python 3**: `python -m http.server 8000`
   - **Python 2**: `python -m SimpleHTTPServer 8000`
   - **Node.js**: `npx http-server`
4. Open your browser and go to `http://localhost:8000`

### Option 2: Direct File Opening
- Simply double-click `index.html` to open it in your browser
- Note: Some features may not work properly due to browser security restrictions

## Question Data

The quiz uses the `animal_quiz_questions.csv` file which contains:
- **Difficulty**: Easy, Normal, or Hard
- **Question**: The quiz question text
- **Options A-D**: Four multiple-choice answers
- **Correct Answer**: The correct option

## Customization

### Adding New Questions
1. Open `animal_quiz_questions.csv` in a text editor or spreadsheet program
2. Add new rows following the same format:
   ```
   Difficulty,Question,Option A,Option B,Option C,Option D,Correct Answer
   Easy,Your new question?,Answer A,Answer B,Answer C,Answer D,Correct Answer
   ```
3. Save the file and refresh the browser

### Modifying Styles
- Edit `styles.css` to change colors, fonts, or layout
- The design is fully responsive and senior-friendly
- All colors use high contrast for better visibility

### Changing Game Logic
- Edit `script.js` to modify game behavior
- Functions are well-commented for easy understanding

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **CSV Loading**: Automatically loads questions from CSV file
- **Fallback Data**: Includes backup questions if CSV fails to load
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance**: Lightweight and fast loading

## Troubleshooting

### CSV Not Loading
- Make sure the CSV file is in the same folder as `index.html`
- Check that the CSV format matches the expected structure
- Try using a local server instead of opening the file directly

### Styling Issues
- Clear your browser cache
- Check that `styles.css` is in the same folder as `index.html`

### Game Not Working
- Open browser developer tools (F12) to check for errors
- Ensure JavaScript is enabled in your browser
- Try a different browser if issues persist

## Support

If you encounter any issues or have questions, check the browser console for error messages. The game includes fallback data so it should work even if the CSV file has issues.

Enjoy learning about amazing animals! 🦁🐘🦒 