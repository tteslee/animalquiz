// Language translations for the Animal Quiz Game
const translations = {
    en: {
        // Header
        title: "Animal Quiz Game",
        subtitle: "Test your knowledge about animals",
        
        // Welcome screen
        welcomeTitle: "Welcome to the Animal Quiz",
        welcomeSubtitle: "Choose your difficulty level to get started:",
        easy: "Easy",
        normal: "Normal", 
        hard: "Hard",
        instructionsTitle: "How to play",
        instructions: [
            "Choose your difficulty level",
            "Read each question carefully", 
            "Click on your answer",
            "See your score at the end"
        ],
        
        // Quiz screen
        questionCounter: "Question {current} of {total}",
        score: "Score: {score}",
        nextQuestion: "Next Question",
        loadingQuestion: "Loading question...",
        loading: "Loading...",
        
        // Results screen
        quizComplete: "Quiz Complete",
        finalScore: "You scored {score} out of {total}!",
        performanceMessages: {
            excellent: "Excellent! You're an animal expert!",
            great: "Great job! You know your animals well!",
            good: "Good work! You have solid animal knowledge!",
            notBad: "Not bad! Keep learning about animals!",
            gettingThere: "You're getting there! Try again to improve!",
            keepPracticing: "Keep practicing! You'll get better!"
        },
        playAgain: "Play Again",
        tryDifferentDifficulty: "Try Different Difficulty",
        
        // Footer
        footer: "Enjoy learning about animals",
        
        // Language toggle
        languageToggle: "🇳🇱 NL"
    },
    
    nl: {
        // Header
        title: "Dieren Quiz Spel",
        subtitle: "Test je kennis over dieren",
        
        // Welcome screen
        welcomeTitle: "Welkom bij de Dieren Quiz",
        welcomeSubtitle: "Kies je moeilijkheidsgraad om te beginnen:",
        easy: "Makkelijk",
        normal: "Normaal",
        hard: "Moeilijk",
        instructionsTitle: "Hoe te spelen",
        instructions: [
            "Kies je moeilijkheidsgraad",
            "Lees elke vraag zorgvuldig",
            "Klik op je antwoord",
            "Bekijk je score aan het einde"
        ],
        
        // Quiz screen
        questionCounter: "Vraag {current} van {total}",
        score: "Score: {score}",
        nextQuestion: "Volgende Vraag",
        loadingQuestion: "Vraag laden...",
        loading: "Laden...",
        
        // Results screen
        quizComplete: "Quiz Voltooid",
        finalScore: "Je scoorde {score} van de {total}!",
        performanceMessages: {
            excellent: "Uitstekend! Je bent een dierenexpert!",
            great: "Goed gedaan! Je kent je dieren goed!",
            good: "Goed werk! Je hebt solide dierenkennis!",
            notBad: "Niet slecht! Blijf leren over dieren!",
            gettingThere: "Je komt er! Probeer opnieuw om te verbeteren!",
            keepPracticing: "Blijf oefenen! Je wordt steeds beter!"
        },
        playAgain: "Opnieuw Spelen",
        tryDifferentDifficulty: "Probeer Andere Moeilijkheid",
        
        // Footer
        footer: "Geniet van het leren over dieren",
        
        // Language toggle
        languageToggle: "🇺🇸 EN"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
} 