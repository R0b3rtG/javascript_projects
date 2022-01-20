const questions = [
	{
		question: 'What Does JSON stand for?',
		answers: [
			'JavaScript Only Notation',
			'Joe Smith On Narcotics',
			'JavaScript Object Notation',
			'JavaScript Operation Notation',
		],
		correctAnswer: 'JavaScript Object Notation',
		questionNumber: 1,
	},
	{
		question: 'What does CSS stand for?',
		answers: [
			'Cascading Style Sheet',
			'Combined Source Sheet',
			'Cooperative Style Section',
			'Cool Style Sheet',
		],
		correctAnswer: 'Cascading Style Sheet',
		questionNumber: 2,
	},
	{
		question: 'When did JavaScript come out?',
		answers: ['2004', '1995', '2015', '1980'],
		correctAnswer: '1995',
		questionNumber: 3,
	},
	{
		question: 'What does HTML stand for?',
		answers: [
			'Hypertext Markdown Language',
			'Hype Text Manager Lemon',
			'Hypertext Markup Language',
			'Hypertext Management Language',
		],
		correctAnswer: 'Hypertext Markup Language',
		questionNumber: 4,
	},
	{
		question: 'How many IDs can a HTML tag have?',
		answers: ['infinte', '5', 'none', '1'],
		correctAnswer: '1',
		questionNumber: 5,
	},
	{
		question: 'Who is the founder of JavaScript?',
		answers: ['Berndan Eich', 'Elon Musk', 'Brad Traversy', 'Joe Biden'],
		correctAnswer: 'Berndan Eich',
		questionNumber: 6,
	},
	{
		question: 'Which of the following is a JavaScript Framework?',
		answers: ['SASS', 'Angular', 'PHP', 'My SQL'],
		correctAnswer: 'Angular',
		questionNumber: 7,
	},
	{
		question: 'What does SQL stand for?',
		answers: [
			'Structured Query Language',
			'Super Query Language',
			'Slow Query Language',
			'Semantic Query Language',
		],
		correctAnswer: 'Structured Query Language',
		questionNumber: 8,
	},
];

const questionText = document.querySelector('.question');
const answers = document.querySelectorAll('.answer');
const maxQuestionNumber = document.querySelector('.max');
const currentQuestionNumber = document.querySelector('.current');
let index = 0;

window.onload = () => {
	questionText.textContent = questions[0].question;
	for (let i = 0; i < answers.length; i++) {
		answers[i].textContent = questions[0].answers[i];
	}
	currentQuestionNumber.textContent = 1;
	maxQuestionNumber.textContent = questions.length;
};

answers.forEach((answer) => {
	answer.addEventListener('click', (e) => markAsSelected(e.target, answers));
});

function markAsSelected(element, answers) {
	answers.forEach((index) => index.classList.remove('selected'));
	element.classList.add('selected');
}

const finalPrompt = document.querySelector('.final-prompt-background');

let correctAnswers = 0;

const correctAlert = document.querySelector('.correct');
const wrongAlert = document.querySelector('.wrong');

const scored = document.querySelector('.scored');
const outOf = document.querySelector('.out-of');

const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', () => {
	let answerContent;
	let optionSelected = false;
	answers.forEach((answer) => {
		if (answer.classList.contains('selected')) {
			answerContent = answer.textContent;
			answer.classList.remove('selected');
			optionSelected = true;
		}
	});
	if (optionSelected) {
		if (answerContent === questions[index].correctAnswer) {
			correctAnswers++;
			correctAlert.style.display = 'block';
			setTimeout(() => {
				correctAlert.style.display = 'none';
			}, 1000);
		} else {
			wrongAlert.style.display = 'block';
			setTimeout(() => {
				wrongAlert.style.display = 'none';
			}, 1000);
		}
		index++;
		if (index >= questions.length) {
			scored.textContent = correctAnswers;
			outOf.textContent = questions.length;
			finalPrompt.style.display = 'grid';
		} else {
			questionText.textContent = questions[index].question;
			for (let i = 0; i < answers.length; i++) {
				answers[i].textContent = questions[index].answers[i];
			}
			currentQuestionNumber.textContent = questions[index].questionNumber;
		}
	}
});

const playAgainBtn = document.querySelector('.play-again');
playAgainBtn.addEventListener('click', () => location.reload());
