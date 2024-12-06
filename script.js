let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let selectedTopic = '';

const questions = {
    'General Knowledge': [
        { question: "1. What is the capital of France?", answers: ["1. Paris", "2. London", "3. Berlin", "4. Madrid"], correct: 0 },
        { question: "2. Who wrote 'Romeo and Juliet'?", answers: ["1. William Shakespeare", "2. Charles Dickens", "3. Jane Austen", "4. Mark Twain"], correct: 0 },
        { question: "3. What is the largest ocean on Earth?", answers: ["1. Atlantic Ocean", "2. Indian Ocean", "3. Arctic Ocean", "4. Pacific Ocean"], correct: 3 },
        { question: "4. Who was the first President of the United States?", answers: ["1. Abraham Lincoln", "2. George Washington", "3. Thomas Jefferson", "4. John Adams"], correct: 1 },
        { question: "5. What is the smallest planet in our solar system?", answers: ["1. Mars", "2. Earth", "3. Mercury", "4. Venus"], correct: 2 }
    ],
    'Computer': [
        { question: "1. What does CPU stand for?", answers: ["1. Central Processing Unit", "2. Central Program Unit", "3. Computer Personal Unit", "4. Central Processor Unit"], correct: 0 },
        { question: "2. What does RAM stand for?", answers: ["1. Random Access Memory", "2. Read Access Memory", "3. Run Access Memory", "4. Rapid Access Memory"], correct: 0 },
        { question: "3. What is the main function of the motherboard?", answers: ["1. To connect all components", "2. To store data", "3. To process data", "4. To manage power"], correct: 0 },
        { question: "4. What does URL stand for?", answers: ["1. Uniform Resource Locator", "2. Universal Resource Locator", "3. Uniform Reference Locator", "4. Universal Reference Locator"], correct: 0 },
        { question: "5. Which company developed the Windows operating system?", answers: ["1. Apple", "2. IBM", "3. Microsoft", "4. Google"], correct: 2 }
    ],
    'Maths': [
        { question: "1. What is 2 + 2?", answers: ["1. 3", "2. 4", "3. 5", "4. 6"], correct: 1 },
        { question: "2. What is the square root of 16?", answers: ["1. 2", "2. 3", "3. 4", "4. 5"], correct: 2 },
        { question: "3. What is the value of π (pi) up to two decimal places?", answers: ["1. 3.12", "2. 3.14", "3. 3.16", "4. 3.18"], correct: 1 },
        { question: "4. What is 7 × 8?", answers: ["1. 54", "2. 56", "3. 58", "4. 60"], correct: 1 },
        { question: "5. What is the perimeter of a square with side length 5?", answers: ["1. 20", "2. 25", "3. 30", "4. 35"], correct: 0 }
    ],
    'English Grammar': [
        { question: "1. Choose the correct sentence.", answers: ["1. She don't like apples.", "2. She doesn't like apples.", "3. She don't likes apples.", "4. She doesn't like apple."], correct: 1 },
        { question: "2. Identify the correct use of 'their'.", answers: ["1. Their going to the market.", "2. They’re going to the market.", "3. Their house is on the hill.", "4. There house is on the hill."], correct: 2 },
        { question: "3. Choose the correct sentence.", answers: ["1. He are happy.", "2. He is happy.", "3. He be happy.", "4. He was happy."], correct: 1 },
        { question: "4. Select the correctly punctuated sentence.", answers: ["1. I love cooking my family and my dog.", "2. I love cooking, my family, and my dog.", "3. I love cooking, my family, and my dog.", "4. I love cooking; my family and my dog."], correct: 1 },
        { question: "5. Choose the correct form of the verb.", answers: ["1. She don’t know the answer.", "2. She doesn’t know the answer.", "3. She didn’t know the answer.", "4. She not know the answer."], correct: 1 }
    ]
};

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    login();
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "user" && password === "password") {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('topic-selection-container').style.display = 'block';
    } else {
        alert("Invalid login credentials");
    }
}

function selectTopic(topic) {
    selectedTopic = topic;
    document.getElementById('topic-selection-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    startQuiz();
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const questionElement = document.getElementById('question-container');
    const currentQ = questions[selectedTopic][currentQuestion];

    questionElement.innerHTML = `
        <p>${currentQ.question}</p>
        ${currentQ.answers.map((answer, index) => `
            <div>
                <input type="radio" name="answer" value="${index}" id="answer${index}">
                <label for="answer${index}">${answer}</label>
            </div>
        `).join('')}
    `;

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.addEventListener('change', nextQuestion);
    });
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        if (parseInt(selectedAnswer.value) === questions[selectedTopic][currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions[selectedTopic].length) {
            resetTimer();
            displayQuestion();
        } else {
            showResult();
        }
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    startTimer();
}

function showResult() {
    clearInterval(timer);
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').textContent = `${score}/${questions[selectedTopic].length}`;
}

function goHome() {
    location.reload();
}

function playAgain() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('topic-selection-container').style.display = 'block';
}
