const questions=[
    {
    question:'Which is the largest animal in the world?',
    answers:[
        {text:'Shark',correct:false},
        {text:'Blue Whale',correct:true},
        {text:'Elephent',correct:false},
        {text:'Giraffe',correct:false}
    ]
    },
    {
        question:'Which is the smallest country in the world?',
        answers:[
            {text:'Vatican city',correct:true},
            {text:'Bhutan',correct:false},
            {text:'Nepal',correct:false},
            {text:'Shri Lanka',correct:false}
        ]

    },
    {
        question:'Which is the largest desert in the world?',
        answers:[
            {text:'Kalahari',correct:false},
            {text:'Gobi',correct:false},
            {text:'Sahara',correct:false},
            {text:'Antarctica',correct:true}
        ]
    },
    {
        question:'Which is the smallest continent in the world?',
        answers:[
            {text:'Asia',correct:false},
            {text:'Australia',correct:true},
            {text:'Arctic',correct:false},
            {text:'Africa',correct:false}
        ]
    }
]


const qstnElement=document.getElementById('question')
const answerBtn=document.getElementById('answer-buttons')
const nextButton=document.getElementById('nextbtn')


let CurrentQstnIndex=0
let score=0
function startQuiz(){
    CurrentQstnIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion()
}

function showQuestion(){
    resetState();
    let CurrentQstn=questions[CurrentQstnIndex];
    let qstnNo=CurrentQstnIndex+1;
    // questionElement.innerHTML=`${qstnNo}.${CurrentQstn.question}`
    qstnElement.innerHTML=qstnNo+"."+CurrentQstn.question



CurrentQstn.answers.forEach(answer=>{
    const button=document.createElement('button')
    button.innerHTML=answer.text
    button.classList.add('btn')
    answerBtn.appendChild(button)
    if(answer.correct){
        button.dataset.correct=answer.correct
    }
    button.addEventListener('click',selectAnswer)
});
}
function resetState(){
    nextButton.style.display='none'
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}
function selectAnswer(e){
    const selectedBtn=e.target
    const isCorrect=selectedBtn.dataset.correct==="true"
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtn.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct')
        }
        button.disabled=true
    })
    nextButton.style.display='block'
}
nextButton.addEventListener('click',()=>{
    if(CurrentQstnIndex<questions.length){
        handleNextBtn()
    }
    else{
        startQuiz()
    }
})

function handleNextBtn(){
    CurrentQstnIndex++
    if(CurrentQstnIndex<questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}
function showScore(){
    resetState()
    qstnElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML='Play Again'
    nextButton.style.display='block'
}

startQuiz()