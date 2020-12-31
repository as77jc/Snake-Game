const sizePlaygroung = 20;
const snakeMoveArea = [];

let scoreBoard = 0;
let snake = [];

let levelTime = 1000;
let speedUpLevel = 0.8;

let applePosition = 0;
let direction = 1;
let timeId = 0

const playground = document.getElementById('playground');
let score = document.getElementById('score');

let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');


///////////////////////////////////////////////////////////////////////
// Create PlayGround area 
///////////////////////////////////////////////////////////////////////

playground.style.width = sizePlaygroung * 20 +'px';
playground.style.height = sizePlaygroung * 20 +'px';

///////////////////////////////////////////////////////////////////////
// Create SNAKE 
///////////////////////////////////////////////////////////////////////

function createSnake() {
    for (let i = 0; i < (sizePlaygroung) * (sizePlaygroung); i++ ) {
        snakeMoveArea[i] = document.createElement('div');
        snakeMoveArea[i].classList.add('snakeMoveArea');
        playground.appendChild(snakeMoveArea[i]);
    }
}

startSnake ()
createSnake()


snake.forEach(index => snakeMoveArea[index].classList.add('snake'));
snakeMoveArea[snake[0]].classList.add('snakeHead');

///////////////////////////////////////////////////////////////////////
// Move SNAKE and COntrol the Edges & EAT APPLES
///////////////////////////////////////////////////////////////////////

function moveSnake(){
    /////////////////////////////
    ////// CHECK the EDGES //////
    /////////////////////////////
    if (
        // TOP wall 
        (snake[0] - sizePlaygroung < 0 && direction === -sizePlaygroung) ||
        // BOTTOM wall
        (snake[0] + sizePlaygroung >= (sizePlaygroung * sizePlaygroung) && direction === sizePlaygroung) ||
        // RIGHT wall
        (snake[0] % sizePlaygroung === (sizePlaygroung - 1) && direction === 1 ) ||
        // LEFT wall
        (snake[0] % sizePlaygroung === 0 && direction === -1) || 
        // Check body od snake
        (snakeMoveArea[snake[0] + direction].classList.contains('snake'))
    ){
        playground.style.backgroundColor = '#ef233c';
        score.style.color = '#ef233c';
        return clearInterval(timeId);
        
    }
    
    /////////////////////////////
    ////// MOVE the SNAKE  //////
    /////////////////////////////    
    
    const tail = snake.pop();
    snakeMoveArea[tail].classList.remove('snake');
    snakeMoveArea[snake[0]].classList.remove('snakeHead');
    snake.unshift(snake[0] + direction);
    snakeMoveArea[snake[0]].classList.add('snake');
    snakeMoveArea[snake[0]].classList.add('snakeHead');
    
    
    /////////////////////////////
    //////  EAT the APPLES //////
    /////////////////////////////
    
    if (snake[0] === applePosition){
        snakeMoveArea[applePosition].textContent = ''
        
        clearInterval(timeId);
        levelTime *= speedUpLevel
        timeId = setInterval(moveSnake, levelTime);
        
        snakeMoveArea[tail].classList.add('snake')
        snake.push(tail)
        createApple()
        scoreBoard++
        score.textContent = scoreBoard
    } 
}


///////////////////////////////////////////////////////////////////////
// Move SNAKE by PUSHING the arrow kwys
///////////////////////////////////////////////////////////////////////

function controlSnake (event) {
    // LEFT direction
    if (event.keyCode === 37){
        direction = -1;
    }
    // UP direction
    if (event.keyCode === 38){
        direction = -sizePlaygroung;
    }
    // RIGHT direction
    if (event.keyCode === 39){
        direction = 1;
    }
    // BOTTOM direction
    if (event.keyCode === 40){
        direction = sizePlaygroung;
    }
}



///////////////////////////////////////////////////////////////////////
// Generate Apples 
///////////////////////////////////////////////////////////////////////

function createApple () {
    do {
        applePosition = Math.floor (Math.random() * sizePlaygroung * sizePlaygroung)
    }while (snakeMoveArea[applePosition].classList.contains('snake'))
    
    snakeMoveArea[applePosition].textContent = '🍎'
    //snakeMoveArea[applePosition].classList.add('apple')
}

createApple()

///////////////////////////////////////////////////////////////////////
// START & RESET Button  
///////////////////////////////////////////////////////////////////////

function startButton () {
    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
    timeId = setInterval(moveSnake, levelTime);
}

function resetButton () {
    resetBtn.style.display = 'none';
    startBtn.style.display = 'block';
    /////////////////////////////
    //////  Remove SNAKE   //////
    /////////////////////////////
    snake.forEach(index => snakeMoveArea[index].classList.remove('snake'));
    snakeMoveArea[snake[0]].classList.remove('snakeHead');

    /////////////////////////////
    //////  Remove APPLE   //////
    /////////////////////////////    
    snakeMoveArea[applePosition].textContent = '';
    createApple();
    
    /////////////////////////////
    //////  Create SNAKE   //////
    /////////////////////////////    
    startSnake ()
    snake.forEach(index => snakeMoveArea[index].classList.add('snake'));
    snakeMoveArea[snake[0]].classList.add('snakeHead');
    
    playground.style.backgroundColor = '#fff';
    
    clearInterval(timeId)
    levelTime = 1000;
    timeId = 0
    
    scoreBoard = 0;
    score.textContent = scoreBoard
    direction = 1;
    
}

///////////////////////////////////////////////////////////////////////
// Create RANDOM Snake to START  
///////////////////////////////////////////////////////////////////////

function startSnake () {
    snake = [];
    do {
        snake[0] = Math.floor (Math.random() * sizePlaygroung * sizePlaygroung )
    } while (
    /////////////////////////////
    ////// CHECK the EDGES //////
    /////////////////////////////        
        // RIGHT wall
        (snake[0] % sizePlaygroung === (sizePlaygroung - 1) || (snake[0] - 1) % sizePlaygroung === (sizePlaygroung - 1) || (snake[0] - 2) % sizePlaygroung === (sizePlaygroung - 1)) ||
        // BOTTOM wall
        (snake[0] + sizePlaygroung + 5 >= (sizePlaygroung * sizePlaygroung) ) ||
        // LEFT wall
        (snake[0] % sizePlaygroung  === 0 || (snake[0] - 1) % sizePlaygroung  === 0 || (snake[0] - 2) % sizePlaygroung === 0) 
    )
    
    snake[1] = snake[0] - 1
    snake[2] = snake[0] - 2
}

///////////////////////////////////////////////////////////////////////
// Events on buttons and keys  
///////////////////////////////////////////////////////////////////////

document.addEventListener('keydown', controlSnake);
startBtn.addEventListener('click', startButton);
resetBtn.addEventListener('click', resetButton);
