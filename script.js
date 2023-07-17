import questions from './questions.js';

const questionString = document.getElementById('question');

const optionsContainer = document.getElementById('options-container');

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const submit = document.getElementById('submit-button');
const reset = document.getElementById('reset-button');

let index;  

const init = () => {
    index = 0;
    updateQuestion();
    prevButton.classList.add('hide');
    if(nextButton.classList.contains('hide')) {
        nextButton.classList.remove('hide');
    }
}

const updateQuestion = () => {
    questionString.innerText = questions[index].question_string;

    optionsContainer.innerHTML = '';

    let options = questions[index].options;

    options.forEach(option => {
        let optionElement = document.createElement('div');
        optionElement.classList.add('option');

        optionElement.addEventListener('click', (e) => {
            if(questions[index].selected === undefined) {
                e.target.classList.add('selected');
                questions[index].selected = options.indexOf(option);
            }
            else {
                questions[index].selected = undefined;
                let selectedElement = document.querySelector('.selected');
                selectedElement.classList.remove('selected');

                e.target.classList.add('selected');
                questions[index].selected = options.indexOf(option);
            }
        });

        if(questions[index].selected === options.indexOf(option)) {
            optionElement.classList.add('selected');
        }

        optionElement.innerText = option;
        optionsContainer.appendChild(optionElement);
    });
}

const prev = () => {
    if(index === 0) {
        prevButton.classList.add('hide');
    }
    else {
        index--;
        if(nextButton.classList.contains('hide')) {
            nextButton.classList.remove('hide');
        }
    }
    if(index === 0) {
        prevButton.classList.add('hide');
    }
}

const next = () => {
    if(index === questions.length-1) {
        nextButton.classList.add('hide');
    }
    else {
        index++;
        if(prevButton.classList.contains('hide')) {
            prevButton.classList.remove('hide');
        }
    }
    if(index === questions.length-1) {
        nextButton.classList.add('hide');
    }
}

const refresh = () => {
    questions.map(question => {
        question.selected = undefined;
    });
    init();
}

prevButton.addEventListener('click', () => {
    prev();
    updateQuestion();
    console.log('hello');
});

nextButton.addEventListener('click', () => {
    next();
    updateQuestion();
});

submit.addEventListener('click', () => {
    let score = 0;
    questions.map(question => {
        if(question.selected == question.correct) {
            score++;
        }
    });
    alert(`Your score is ${score}/10`);
    refresh();
});

reset.addEventListener('click', () => {
    refresh();
});

init();
