// Quiz game state
let quizData = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let selectedAnswer = null;
let currentDifficulty = '';
let currentLanguage = 'en'; // Default language

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
    updateLanguage(); // Set initial language
});

// Load quiz data from CSV
async function loadQuizData() {
    try {
        const csvFile = currentLanguage === 'nl' ? 'animal_quiz_questions_nl.csv' : 'animal_quiz_questions.csv';
        const response = await fetch(csvFile);
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
    const fallbackData = {
        en: [
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
        ],
        nl: [
            {
                difficulty: 'Easy',
                question: 'Welke van deze dieren is het snelste?',
                optionA: 'Jachtluipaard',
                optionB: 'Puma',
                optionC: 'Leeuw',
                optionD: 'Wolf',
                correctAnswer: 'Jachtluipaard'
            },
            {
                difficulty: 'Easy',
                question: 'Welke van deze dieren zegt "miauw"?',
                optionA: 'Hond',
                optionB: 'Kat',
                optionC: 'Koe',
                optionD: 'Paard',
                correctAnswer: 'Kat'
            },
            {
                difficulty: 'Normal',
                question: 'Welke dier kan staand slapen?',
                optionA: 'Hond',
                optionB: 'Paard',
                optionC: 'Giraffe',
                optionD: 'Kangoeroe',
                correctAnswer: 'Paard'
            },
            {
                difficulty: 'Hard',
                question: 'Welke dier staat bekend als biologisch onsterfelijk onder laboratoriumomstandigheden?',
                optionA: 'Axolotl',
                optionB: 'Onsterfelijke kwal',
                optionC: 'Hydra',
                optionD: 'Zeepons',
                correctAnswer: 'Onsterfelijke kwal'
            }
        ]
    };
    
    return fallbackData[currentLanguage] || fallbackData.en;
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
    const lang = translations[currentLanguage];
    
    finalScoreText.textContent = lang.finalScore
        .replace('{score}', currentScore)
        .replace('{total}', totalQuestions);
    scorePercentage.textContent = `${percentage}%`;
    
    // Set performance message based on score
    let performanceMessage = '';
    if (percentage >= 90) {
        performanceMessage = lang.performanceMessages.excellent;
    } else if (percentage >= 80) {
        performanceMessage = lang.performanceMessages.great;
    } else if (percentage >= 70) {
        performanceMessage = lang.performanceMessages.good;
    } else if (percentage >= 60) {
        performanceMessage = lang.performanceMessages.notBad;
    } else if (percentage >= 50) {
        performanceMessage = lang.performanceMessages.gettingThere;
    } else {
        performanceMessage = lang.performanceMessages.keepPracticing;
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
    const lang = translations[currentLanguage];
    
    questionCounter.textContent = lang.questionCounter
        .replace('{current}', currentQuestionIndex + 1)
        .replace('{total}', totalQuestions);
    progressFill.style.width = `${progress}%`;
    currentScoreElement.textContent = lang.score.replace('{score}', currentScore);
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

// Language functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'nl' : 'en';
    updateLanguage();
    
    // Reload quiz data with new language
    if (quizData.length > 0) {
        loadQuizData().then(() => {
            // If currently in a quiz, restart with new language
            if (currentQuestions.length > 0) {
                startQuiz(currentDifficulty);
            }
        });
    }
}

function updateLanguage() {
    const lang = translations[currentLanguage];
    
    // Update header
    document.getElementById('main-title').textContent = lang.title;
    document.getElementById('main-subtitle').textContent = lang.subtitle;
    document.getElementById('language-toggle').textContent = lang.languageToggle;
    
    // Update welcome screen
    document.getElementById('welcome-title').textContent = lang.welcomeTitle;
    document.getElementById('welcome-subtitle').textContent = lang.welcomeSubtitle;
    document.getElementById('easy-text').textContent = lang.easy;
    document.getElementById('normal-text').textContent = lang.normal;
    document.getElementById('hard-text').textContent = lang.hard;
    document.getElementById('instructions-title').textContent = lang.instructionsTitle;
    
    // Update instructions list
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    lang.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
    
    // Update quiz screen
    document.getElementById('next-btn').textContent = lang.nextQuestion;
    document.getElementById('question-text').textContent = lang.loadingQuestion;
    
    // Update results screen
    document.getElementById('results-title').textContent = lang.quizComplete;
    document.getElementById('play-again-text').textContent = lang.playAgain;
    document.getElementById('try-different-text').textContent = lang.tryDifferentDifficulty;
    
    // Update footer
    document.getElementById('footer-text').textContent = lang.footer;
    
    // Update current display if quiz is active
    if (currentQuestions.length > 0) {
        updateProgress();
        if (currentQuestionIndex < currentQuestions.length) {
            displayQuestion();
        }
    }
}

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