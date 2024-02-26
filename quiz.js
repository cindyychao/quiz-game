const questions = [
    {
      question: 'What is the capital city of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      correctAnswer: 2,
      attempts: 0
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      correctAnswer: 0,
      attempts: 0
    },
    {
      question: 'Who painted the famous artwork "Starry Night"?',
      options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'],
      correctAnswer: 1,
      attempts: 0
    },
    {
      question: 'In which year did the United States land the first humans on the moon?',
      options: ['1969', '1972', '1965', '1975'],
      correctAnswer: 0,
      attempts: 0
    },
    {
      question: "What is the world's largest ocean?",
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctAnswer: 3,
      attempts: 0
    },
    {
      question: 'Who wrote the novel "To Kill a Mockingbird"?',
      options: ['Harper Lee', 'F. Scott Fitzgerald', 'Ernest Hemingway', 'Mark Twain'],
      correctAnswer: 0,
      attempts: 0
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'Mount Kilimanjaro', 'Mount McKinley (Denali)', 'Mount Fuji'],
      correctAnswer: 0,
      attempts: 0
    },
    {
      question: 'Who is the author of the Harry Potter book series?',
      options: ['J.R.R. Tolkien', 'J.K. Rowling', 'C.S. Lewis', 'Stephen King'],
      correctAnswer: 1,
      attempts: 0
    },
    {
      question: 'Who is the Greek god of the sea?',
      options: ['Zeus', 'Hades', 'Poseidon', 'Hermes'],
      correctAnswer: 2,
      attempts: 0
    },
    {
      question: 'What is the largest organ in the human body?',
      options: ['Liver', 'Brain', 'Skin', 'Heart'],
      correctAnswer: 2,
      attempts: 0
    },
    {
      question: 'Which planet is closest to the sun?',
      options: ['Venus', 'Mercury', 'Mars', 'Jupiter'],
      correctAnswer: 1,
      attempts: 0
    }
  ];
  
  let score = 0;
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function randomizeAnswerChoices(question) {
    const shuffledOptions = shuffleArray([...question.options.slice(0, question.correctAnswer), ...question.options.slice(question.correctAnswer + 1)]);
    const correctAnswerIndex = Math.floor(Math.random() * (shuffledOptions.length + 1));
    const options = [...shuffledOptions.slice(0, correctAnswerIndex), question.options[question.correctAnswer], ...shuffledOptions.slice(correctAnswerIndex)];
    return { options, correctAnswer: options.indexOf(question.options[question.correctAnswer]) + 1 };
  }
  
  function playQuiz() {
    const shuffledQuestions = shuffleArray([...questions]);
  
    let currentQuestionIndex = 0;
  
    function displayQuestion() {
      const currentQuestion = shuffledQuestions[currentQuestionIndex];
      console.log('Question:', currentQuestion.question);
  
      const { options, correctAnswer } = randomizeAnswerChoices(currentQuestion);
  
      for (let j = 0; j < options.length; j++) {
        console.log(`${j + 1}. ${options[j]}`);
      }
  
      let attempts = 0;
      let userAnswer;
  
      while (attempts < 2) {
        userAnswer = prompt('Enter the number of your answer:');
  
        if (parseInt(userAnswer) === correctAnswer) {
          console.log('Correct answer!');
          score++;
          break;
        } else {
          attempts++;
          if (attempts === 1) {
            console.log('Wrong answer! Please try again.');
          } else {
            console.log('Sorry, you used up your chances for this question.');
            console.log(`The correct answer was ${correctAnswer}.`);
          }
        }
      }
  
      console.log('-----------------------');
  
      currentQuestionIndex++;
  
      if (currentQuestionIndex < shuffledQuestions.length) {
        setTimeout(displayQuestion, 100);
      } else {
        console.log('Quiz completed!');
        console.log(`Your score: ${score} out of ${shuffledQuestions.length}`);
      }
    }
  
    displayQuestion();
  }
  
  function startTimer(duration, callback) {
    let progress = 0;
    let timer;
  
    function updateProgress() {
      console.log(`Quiz Loading: ${progress}%`);
      progress += 10;
  
      if (progress <= 100) {
        setTimeout(updateProgress, duration / 10 * 1000);
      } else {
        console.log('Loading Complete!');
        callback();
      }
    }
  
    updateProgress();
  }
  
  const quizDuration = 10; // Time in seconds
  
  setTimeout(() => {
    console.log('-----------------------');
    console.log('Quiz starting now...');
    console.log('-----------------------');
    startTimer(quizDuration, playQuiz);
  }, 2000); // Delay the quiz start by 2 seconds