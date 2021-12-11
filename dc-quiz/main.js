// tracker
let questionNr = 0

// existing elements
const dcQuiz = document.querySelector('#dc-quiz')
const currentActiveQuestion = document.querySelector('#current-active-question span')
currentActiveQuestion.textContent = questionNr
// currentActiveQuestion.style.color = '#defffe'

const questionArea = document.querySelector('#question-area')
const takeTheQuiz = document.querySelector('#take-the-quiz')


// question object
quizQuestions = [
  {
    id: 1,
    question: 'The number data-type are written with quotes, such as <code>let num = "5"</code>',
    correctAnswers: 'no',
    possibleAnswers: ['yes', 'no'],
    points: 10
  },
  {
    id: 2,
    question: 'Variables declared with the <code>const</code> keyword lets us change its value and data-type',
    correctAnswers: 'no',
    possibleAnswers: ['yes', 'no'],
    points: 20
  },
  {
    id: 3,
    question: 'Boolean value can only be true or false',
    correctAnswers: 'yes',
    possibleAnswers: ['yes', 'no'],
    points: 10
  },
  {
    id: 4,
    question: 'Select non primitive data-type',
    correctAnswers: 'array',
    possibleAnswers: ['string', 'symbol', 'array'],
    points: 40
  },
  {
    id: 5,
    question: 'The default value of the HTML <code>input</code> element\'s type attribute is',
    correctAnswers: 'text',
    possibleAnswers: ['text', 'color', 'number'],
    points: 30
  },
  {
    id: 6,
    question: 'Which citiy is not in eruope',
    correctAnswers: 'new york',
    possibleAnswers: ['stockholm', 'new york', 'lagan', 'madrid'],
    points: 50
  },
  {
    id: 7,
    question: 'Which of following does not evaluate to <code>false</code> boolean value when compared with double "<code>==</code>" comparison operator',
    correctAnswers: ['" false "', '" f "'],
    possibleAnswers: [false, '" f "', 0, '-0', '1-1', '" false "', '+0'],
    points: 100
  }
]


const percentCounter = (allAnswers) => {
  const correct = document.querySelector('#correct')
  const wrong = document.querySelector('#wrong')
  const result = document.querySelector('#result')

  allAnswers.forEach(value => {
    for (let i = 0; i <= Math.round((value * 100) / 7); i++) {
      setTimeout( _ => {
        allAnswers[1] === value ?
          wrong.textContent = `fel: ${i}%` :
          correct.textContent = `rätt: ${i}%`
      }, i * 10);
    }
  });
  result.textContent = `rätta svar: ${allAnswers[0]}`
  console.log(allAnswers[0], 'alla');
  result.style.color = allAnswers[0] < 4 ? 'red' :  allAnswers[0] === 7 ? 'green' : 'orange'
}

let answeredCorrect = 0
let answeredWrong = 0
const callTheJudge = (questionObject, answers, questionNr, continueBtn) => {
  if (typeof answers !== 'string') {
    questionObject.correctAnswers.sort().toString() === answers.sort().toString() ?
    answeredCorrect += 1 : answeredWrong += 1
  } else {
    questionObject.correctAnswers === answers ? answeredCorrect += 1 : answeredWrong += 1
  }

  setTimeout(() => {
    continueBtn.remove()
    questionArea.innerHTML = ''

    // if questionObject.id === 7 return and display results
    if (questionObject.id === quizQuestions.length) {
      const getResults = document.querySelector('#get-results')
      getResults.parentElement.style.display = 'flex'

      getResults.addEventListener('click', () => {
        percentCounter([answeredCorrect, answeredWrong])
      })
      return
    }

    addQuestion(questionNr)
  }, 400);
}

// show new question with correct set of buttons every time this function runs
const addQuestion = (questionNr) => {
  const answers = []
  const questionObject = quizQuestions[questionNr]

  currentActiveQuestion.textContent = questionObject.id
  questionArea.style.display = 'grid'

  let question = document.createElement('p')
  question.id = 'question'
  question.innerHTML = questionObject.question
  questionArea.appendChild(question)


  // elements for questions with 2-3 possible answers
  let tempSelectedAnswerBtn = null
  const addAnswerBtns = () => {
    questionObject.possibleAnswers.forEach(answer => {
      let answerBtn = document.createElement('button')
      answerBtn.className = 'answer-btns current-answers'
      answerBtn.textContent = answer
      if (questionObject.id === 4 || questionObject.id === 5) {
        answerBtn.style.textTransform = 'none'
      }

      answerBtn.addEventListener('click', e => {
        if (e.target === tempSelectedAnswerBtn) {
          return
        } else if (tempSelectedAnswerBtn) {
          tempSelectedAnswerBtn.style.backgroundColor = ''
          tempSelectedAnswerBtn.style.borderColor = ''
        }

        e.target.style.backgroundColor = 'white'
        e.target.style.borderColor = '#b3e7ff'
        tempSelectedAnswerBtn = e.target
      })

      questionArea.appendChild(answerBtn)
    })
  }

  // elements for questions with more than 3 possible answers
  let tempSelectedAnswerInput = []
  const addAnswerInputs = () => {
    questionObject.possibleAnswers.forEach(answer => {
      let answerInputWrapper = document.createElement('div')
      answerInputWrapper.className = 'answer-input-wrapper current-answers'
      let answerLabel = document.createElement('label')
      answerLabel.className = 'answer-label'
      answerLabel.textContent = answer
      let answerInput = document.createElement('input')
      answerInput.type = 'checkbox'
      // answerInput.className = 'answer-btns'
      answerInput.value = answer

      answerInput.addEventListener('click', e => {
        if (e.target.checked) {
          tempSelectedAnswerInput.push(e.target.value)
          e.target.closest('div').style.backgroundColor = 'white'
          e.target.closest('div').style.borderColor = '#b3e7ff'
          return
        } else if (!e.target.checked) { // remove added value if checked element get's unchecked
          tempSelectedAnswerInput.splice(tempSelectedAnswerInput.indexOf(e.target.value), 1)
          e.target.closest('div').style.backgroundColor = ''
          e.target.closest('div').style.borderColor = ''
        }
      })

      answerLabel.appendChild(answerInput)
      answerInputWrapper.appendChild(answerLabel)
      questionArea.appendChild(answerInputWrapper)
    })
  }
  // creatin buttons/input checkboxes for answer options
  questionObject.id < quizQuestions.length ? addAnswerBtns() : addAnswerInputs()

  // continue for all questions
  let continueBtn = document.createElement('button')
  continueBtn.id = 'continue'
  continueBtn.textContent = 'continue'
  setTimeout(() => continueBtn.style.opacity = 1, 1000);
  dcQuiz.appendChild(continueBtn)


  // remove current question and add new one
  continueBtn.addEventListener('click', continueListener = a => {
    if (tempSelectedAnswerBtn === null && tempSelectedAnswerInput.length === 0) {
      return
    }
    continueBtn.removeEventListener('click', continueListener)

    // some animation on main question elements before removed
    continueBtn.style.opacity = 0
    question.style.opacity = 0
    const currentAnswers = document.querySelectorAll('.current-answers')
    currentAnswers.forEach((answer, i) => {
      setTimeout(() => {
        answer.style.transform = 'translateX(25%)'
        answer.style.opacity = '0'
      }, 100 * i);
    })

    // store all answers in common answers array
    answers.push(tempSelectedAnswerBtn !== null ? tempSelectedAnswerBtn.textContent : tempSelectedAnswerInput)

    callTheJudge(questionObject, answers[0], questionObject.id, continueBtn)
  })
}

// start the quiz
takeTheQuiz.addEventListener('click', _ => {
  takeTheQuiz.style.display = 'none'

  addQuestion(questionNr)
})






// function to select different color scheme
const toggleThemeBtn = document.querySelector('#toggle-theme')
toggleThemeBtn.addEventListener('click', _ => {
  // add new classes to the following elements
  document.body.classList.toggle('dark-theme')
  toggleThemeBtn.classList.toggle('dark-theme-btn')

  // when .dark-theme class exist on body el
  if (document.body.classList.contains('dark-theme')) {
    toggleThemeBtn.children[0].textContent = 'light'
    return
  }

  // display default values for light theme
  toggleThemeBtn.children[0].textContent = 'dark'
})


// document.body.classList.contains('dark-theme') ? e.target.style.backgroundColor = '' : e.target.style.backgroundColor = 'white'










// fixa nya knappar när questionObject.id === 7
//   - fixa hur man ska göra med att spara värden i array annars skit i att ha 2 möjlig svar

// fixa värden i result

// positionera reslut finare



// Tre frågor med ett påstående två svarsalternativ
// 1 - The number data-type are written with quotes, such as <code>let num = "5"</code>
// 2 - Text values are called text strings
// 2 - Boolean value can only be true or false
// 3 - Variables declared with the <code>const</code> keyword lets us change its value and data-type


// Tre frågor ska ha tre svarsalternativ.
// 1 -  Which of following  does not evaluate to false
//      string, symbol, array

// 2 - The default value of the html input element's type attribute is
//     text, color, number

// 3 - Which of the following cities are not in eruope
//     tokyo, new york, istanbul, Mosqva, Bejing, Osaka, Sao Paulo


// En fråga ska besvaras med checkboxar (minst fyra svarsalternativ)
// 1 - Select non primitive data-type/s
//     string, number, bifint, boolean, undefined, symbol, null,  array


// test
// quizQuestions = [
//   {
//     questionGroup: 1,
//     questions: [
//       {
//         id: 1,
//         question: 'text values are called text strings',
//         answer: 'yes',
//         points: 10
//       },
//       {
//         id: 2,
//         question: 'Variables declared with the <code>const</code> keyword lets us change its value and the data-type',
//         answer: 'no',
//         points: 20
//       },
//       {
//         id: 3,
//         question: 'Boolean value can only be true or false',
//         answer: 'yes',
//         points: 10
//       }
//     ]
//   }
// ]







