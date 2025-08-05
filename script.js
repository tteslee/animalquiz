// Quiz game state
let quizData = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let selectedAnswer = null;
let currentDifficulty = '';

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

// Quiz elements
const questionText = document.getElementById('question-text');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const optionC = document.getElementById('option-c');
const optionD = document.getElementById('option-d');
const questionCounter = document.getElementById('question-counter');
const currentScoreElement = document.getElementById('current-score');
const progressFill = document.getElementById('progress-fill');
const nextBtn = document.getElementById('next-btn');

// Results elements
const finalScoreText = document.getElementById('final-score-text');
const scorePercentage = document.getElementById('score-percentage');
const performanceText = document.getElementById('performance-text');

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    loadQuizData();
});

// Load quiz data from CSV
async function loadQuizData() {
    try {
        const response = await fetch('animal_quiz_questions.csv');
        const csvText = await response.text();
        quizData = parseCSV(csvText);
        console.log('Quiz data loaded successfully:', quizData.length, 'questions');
    } catch (error) {
        console.error('Error loading quiz data:', error);
        // Fallback data in case CSV fails to load
        quizData = getFallbackData();
    }
}

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const question = {
                difficulty: values[0],
                question: values[1],
                optionA: values[2],
                optionB: values[3],
                optionC: values[4],
                optionD: values[5],
                correctAnswer: values[6]
            };
            data.push(question);
        }
    }
    
    return data;
}

// Parse CSV line handling quoted values
function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current.trim());
    return values;
}

// Fallback data in case CSV loading fails
function getFallbackData() {
    return [
        {
            difficulty: 'Easy',
            question: 'Which of these animals is the fastest?',
            optionA: 'Cheetah',
            optionB: 'Puma',
            optionC: 'Lion',
            optionD: 'Wolf',
            correctAnswer: 'Cheetah'
        },
        {
            difficulty: 'Easy',
            question: 'Which of these animals says "meow"?',
            optionA: 'Dog',
            optionB: 'Cat',
            optionC: 'Cow',
            optionD: 'Horse',
            correctAnswer: 'Cat'
        },
        {
            difficulty: 'Normal',
            question: 'Which animal can sleep standing up?',
            optionA: 'Dog',
            optionB: 'Horse',
            optionC: 'Giraffe',
            optionD: 'Kangaroo',
            correctAnswer: 'Horse'
        },
        {
            difficulty: 'Hard',
            question: 'Which animal is known to be biologically immortal under lab conditions?',
            optionA: 'Axolotl',
            optionB: 'Immortal jellyfish',
            optionC: 'Hydra',
            optionD: 'Sea sponge',
            correctAnswer: 'Immortal jellyfish'
        }
    ];
}

// Start quiz with selected difficulty
function startQuiz(difficulty) {
    currentDifficulty = difficulty;
    currentQuestionIndex = 0;
    currentScore = 0;
    selectedAnswer = null;
    
    // Filter questions by difficulty
    currentQuestions = quizData.filter(q => q.difficulty === difficulty);
    
    // Shuffle questions for variety
    shuffleArray(currentQuestions);
    
    // Limit to 10 questions per quiz
    if (currentQuestions.length > 10) {
        currentQuestions = currentQuestions.slice(0, 10);
    }
    
    showScreen('quiz-screen');
    displayQuestion();
    updateProgress();
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    
    questionText.textContent = question.question;
    optionA.textContent = question.optionA;
    optionB.textContent = question.optionB;
    optionC.textContent = question.optionC;
    optionD.textContent = question.optionD;
    
    // Reset option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
    });
    
    selectedAnswer = null;
    nextBtn.disabled = true;
    
    updateProgress();
}

// Handle option selection
function selectOption(option) {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    selectedAnswer = option;
    const question = currentQuestions[currentQuestionIndex];
    const correctAnswer = question.correctAnswer;
    
    // Get the selected option text
    const optionTexts = {
        'A': question.optionA,
        'B': question.optionB,
        'C': question.optionC,
        'D': question.optionD
    };
    
    const selectedText = optionTexts[option];
    const isCorrect = selectedText === correctAnswer;
    
    if (isCorrect) {
        currentScore++;
    }
    
    // Update UI to show correct/incorrect answers
    document.querySelectorAll('.option-btn').forEach(btn => {
        const btnOption = btn.getAttribute('data-option');
        const btnText = optionTexts[btnOption];
        
        btn.disabled = true;
        
        if (btnText === correctAnswer) {
            btn.classList.add('correct');
        } else if (btnOption === option && !isCorrect) {
            btn.classList.add('incorrect');
        } else if (btnOption === option) {
            btn.classList.add('selected');
        }
    });
    
    // Update score display
    currentScoreElement.textContent = `Score: ${currentScore}`;
    
    // Enable next button
    nextBtn.disabled = false;
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Show results screen
function showResults() {
    const totalQuestions = currentQuestions.length;
    const percentage = Math.round((currentScore / totalQuestions) * 100);
    
    finalScoreText.textContent = `You scored ${currentScore} out of ${totalQuestions}!`;
    scorePercentage.textContent = `${percentage}%`;
    
    // Set performance message based on score
    let performanceMessage = '';
    if (percentage >= 90) {
        performanceMessage = 'Excellent! You\'re an animal expert!';
    } else if (percentage >= 80) {
        performanceMessage = 'Great job! You know your animals well!';
    } else if (percentage >= 70) {
        performanceMessage = 'Good work! You have solid animal knowledge!';
    } else if (percentage >= 60) {
        performanceMessage = 'Not bad! Keep learning about animals!';
    } else if (percentage >= 50) {
        performanceMessage = 'You\'re getting there! Try again to improve!';
    } else {
        performanceMessage = 'Keep practicing! You\'ll get better!';
    }
    
    performanceText.textContent = performanceMessage;
    
    showScreen('results-screen');
}

// Play again with same difficulty
function playAgain() {
    startQuiz(currentDifficulty);
}

// Change difficulty
function changeDifficulty() {
    showScreen('welcome-screen');
}

// Show specific screen
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
}

// Update progress bar and counter
function updateProgress() {
    const totalQuestions = currentQuestions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    progressFill.style.width = `${progress}%`;
    currentScoreElement.textContent = `Score: ${currentScore}`;
}

// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    const activeScreen = document.querySelector('.screen.active');
    
    if (activeScreen.id === 'quiz-screen') {
        switch(event.key) {
            case 'a':
            case 'A':
                selectOption('A');
                break;
            case 'b':
            case 'B':
                selectOption('B');
                break;
            case 'c':
            case 'C':
                selectOption('C');
                break;
            case 'd':
            case 'D':
                selectOption('D');
                break;
            case 'Enter':
                if (!nextBtn.disabled) {
                    nextQuestion();
                }
                break;
        }
    }
});

// Add touch/click feedback for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 