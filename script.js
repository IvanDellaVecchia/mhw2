/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
let givenAnswers = {};
let finalAnswers = {
    blep: 0,
    burger: 0,
    cart: 0,
    dopey: 0,
    happy: 0,
    nerd: 0,
    shy: 0,
    sleeping: 0,
    sleepy: 0
};


function findPersonality(){

    for(const key in givenAnswers){
        for(const key2 in finalAnswers){
            if(givenAnswers[key] == key2){
                finalAnswers[key2]++;
            }
        }
    }

    let max = 0;
    let personality = '';
    for(const key in finalAnswers){
        if(finalAnswers[key] > max){
            max = finalAnswers[key];
            personality = key;
        }
    }
    if(max == 1){
        personality = givenAnswers.first;
    }
    return personality;

}


function getResult(){

      if(givenAnswers.first !== undefined && givenAnswers.second !== undefined && givenAnswers.third !== undefined){

        const answers = document.querySelectorAll('.choice-grid div');
        for(const answer of answers){
            answer.removeEventListener('click', onClick);
        }

        const result = document.querySelector('#result');
        result.classList.remove('hidden');
        const title = result.querySelector('h1');
        const content = result.querySelector('p');

        let personality = findPersonality();
        title.textContent = RESULTS_MAP[personality].title;
        content.textContent = RESULTS_MAP[personality].contents;
      }

}


function onClick(event){
    const container = event.currentTarget;
    container.classList.remove('unselected');
    container.classList.add('selected');

    const checkbox = container.querySelector('.checkbox');
    checkbox.src='images/checked.png'

    const unselected = document.querySelectorAll('.choice-grid div');
    for(const selection of unselected){
        if(selection.dataset.questionId == container.dataset.questionId){
            if(selection != container){
                selection.classList.remove('selected');
                selection.classList.add('unselected');
                const unchecked = selection.querySelector('.checkbox');
                unchecked.src='images/unchecked.png'
            }
        }   
    }

    if(container.dataset.questionId == "one"){
        givenAnswers.first = container.dataset.choiceId;
        console.log(givenAnswers);
    } else if(container.dataset.questionId == "two"){
        givenAnswers.second = container.dataset.choiceId;
        console.log(givenAnswers);
    } else{
        givenAnswers.third = container.dataset.choiceId;
        console.log(givenAnswers);
    }

    getResult();
}


function restart(){
    const answers = document.querySelectorAll('.choice-grid div');
    for(const answer of answers){
        answer.addEventListener('click', onClick);
        answer.classList.remove('selected');
        answer.classList.remove('unselected');

        const image = answer.querySelector('.checkbox');
        image.src='images/unchecked.png'
    }
    const result = document.querySelector('#result');
    result.classList.add('hidden');
    
    givenAnswers = {};
    finalAnswers = {
        blep: 0,
        burger: 0,
        cart: 0,
        dopey: 0,
        happy: 0,
        nerd: 0,
        shy: 0,
        sleeping: 0,
        sleepy: 0
    };
}




const answers = document.querySelectorAll('.choice-grid div');
for(const answer of answers){
    answer.addEventListener('click', onClick);
}

const button = document.querySelector('button');
button.addEventListener('click', restart);