const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let max = 480
let min = 0
const foodColor = "red"
const foodSize = 25
const unitSize = 25
const snakeOneColor = "green"
const snakeBorder = "black"
const canvasColor = "black"
gameRunning = true
let xVelocity = 0
let yVelocity = 0
let score = 0

function resetButton() {
    location.reload()
}


function displayGameOver () {
    ctx.font = "50px MV Boli"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER!", 250, 250)
}
let snakeOne = [
    {x:unitSize * 4, y:0, color: "green"},
    {x:unitSize * 3, y:0,  color: "green"},
    {x:unitSize * 2, y:0,  color: "green"},
    {x:unitSize, y:0, color: "green"},
    {x: 0, y: 0, color: "green"}
] 

let snakeTwo = [
    {x:unitSize * 4, y:475, color: "blue"},
    {x:unitSize * 3, y:475, color: "blue"},
    {x:unitSize * 2, y:475, color: "blue"},
    {x:unitSize, y:475, color: "blue"},
    {x: 0, y: 475, color: "blue"}
] 

function createFood() {
    function drawFood(xPosition, yPosition) {
        ctx.fillStyle = foodColor
        ctx.fillRect(xPosition, yPosition, foodSize, foodSize)
    }
    function getRandom() {
        return Math.floor(Math.random() * (max - min) + min)
    }
    let foodWidth = getRandom()
    food.x_pos = foodWidth
    let foodHeight = getRandom()
    food.y_pos = foodHeight
    let i = 0
    while(i < snakeOne.length) {
        if (foodWidth + 25 >= snakeOne[i].x && foodWidth <= snakeOne[i].x  && foodHeight + 25 >= snakeOne[i].y && foodHeight <= snakeOne[i].y) {
            i = 0
            foodWidth = getRandom()
            food.x_pos = foodWidth
            foodHeight = getRandom()
            food.y_pos = foodHeight
        }
        else {
            i += 1
        }
    }
    drawFood(foodWidth, foodHeight)
}

function drawSnake(snake) {
    for (let i = 0; i < snake.length; i += 1) {
        ctx.fillStyle = snake[i].color
        ctx.strokeStyle = snakeBorder
        ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize)
        ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize)
    }
}

let xVelocityOne
let yVelocityOne
let xVelocityTwo
let yVelocityTwo

// responsible for moving the snake and what to do when food is eaten
function moveSnake(snake) {
    if (snake[0].color == 'green') {
        xVelocity = xVelocityOne
        yVelocity = yVelocityOne
    }
    else {
        xVelocity = xVelocityTwo
        yVelocity = yVelocityTwo
    }
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity, color: snake[0].color}
    snake.unshift(head)
    if ((snake[0].x + 25 >= food.x_pos) && (snake[0].x <= food.x_pos + 25) && (snake[0].y + 25 >= food.y_pos) && (snake[0].y <= food.y_pos + 25)) {
        score += 1
        document.getElementById("p1score").innerHTML = score
        createFood()
    }
   else {
        snake.pop()
    }
    //for (let i = 1; i < snake.length; i += 1) {
       // if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
          //  gameRunning = false
        //}
    //}
}

// to store the data of the food
food = {
    eaten: false,
    x_pos: 250,
    y_pos: 250

}

// to store the data of the keys so that the snake can be prevented from moving in two opposite directions consecutively
keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,

    w: false,
    a: false,
    s: false,
    d: false
}

// create initial food
ctx.fillStyle = foodColor
ctx.fillRect(250, 250, foodSize, foodSize)

// check collision between two snakes
function checkCollision() {
    for (let i = 0; i < snakeOne.length; i += 1) {
        if (snakeTwo[0].x + 25 > snakeOne[i].x && snakeTwo[0].x < snakeOne[i].x + 25 && snakeTwo[0].y + 25 > snakeOne[i].y && snakeTwo[0].y < snakeOne[i].y + 25) {
            return true
        }
        // check for self elimination
        if (i > 0 && snakeOne[0].x == snakeOne[i].x && snakeOne[0].y == snakeOne[i].y) {
            return true
        }
    }
    for (let i = 1; i <snakeTwo.length; i += 1) {
        if (snakeTwo[0].x == snakeTwo[i].x && snakeTwo[0].y == snakeTwo[i].y) {
            return true
        }
    }
    
    for (let i = 0; i < snakeTwo.length; i += 1) {
        if (snakeOne[0].x + 25 > snakeTwo[i].x && snakeOne[0].x < snakeTwo[i].x + 25 && snakeOne[0].y + 25 > snakeTwo[i].y && snakeOne[0].y < snakeTwo[i].y + 25) {
            return true
        }
        // check for self elimination
        if (i > 0 && snakeTwo[0].x == snakeTwo[i].x && snakeTwo[0].y == snakeTwo[i].y) {
            return true
        }
    }
    return false
}

// function check if either of the snakes out of bound and check for collision btwn them
function checkGameOver() {
    if (snakeOne[0].x + 25 > 500 || snakeOne[0].x < 0 || snakeOne[0].y + 25 >= 525 || snakeOne[0].y < 0) {
        gameRunning = false
    }
    else if (snakeTwo[0].x + 25 > 500 || snakeTwo[0].x < 0 || snakeTwo[0].y + 25 >= 525 || snakeTwo[0].y < 0) {
        gameRunning = false
    }
    else if (checkCollision() == true) {
        //console.log(checkCollision())
        gameRunning = false
    }
    else {
        gameRunning = true
    }
    return
}

// responsible for the animation of the game and whether the game will run or not
function animate() {
    if (gameRunning) {
        setTimeout(()=> {
            ctx.fillStyle=canvasColor
            ctx.fillRect(0,0,800,800)
            //clearBoard()
            //drawFood()
            if (food.eaten == true) {
                createFood()
            }
            else {
                ctx.fillStyle = foodColor
                ctx.fillRect(food.x_pos, food.y_pos, foodSize, foodSize)
            }
            drawSnake(snakeOne)
            if (keys.w || keys.a || keys.s || keys.d) {
                moveSnake(snakeOne)
            }
            drawSnake(snakeTwo)
            if (keys.ArrowUp || keys.ArrowDown || keys.ArrowRight || keys.ArrowLeft) {
                moveSnake(snakeTwo)
            }
            checkGameOver()
            animate()
        }, 75)
    }
    else {
        displayGameOver()
    }
}
animate()

// also responsible for where the next head will get added based on key pressed
document.addEventListener("keydown", event=> {
    console.log(event.key)
    switch(event.key) {
        case 'ArrowUp':
            if (keys.ArrowDown != true) {
                keys.ArrowUp = true
                keys.ArrowDown = false
                keys.ArrowLeft = false
                keys.ArrowRight = false
                yVelocityTwo = -unitSize
                xVelocityTwo = 0
            }
            break
        case 'ArrowDown':
            if (keys.ArrowUp != true) {
                keys.ArrowUp = false
                keys.ArrowDown = true
                keys.ArrowLeft = false
                keys.ArrowRight = false
                yVelocityTwo = unitSize
                xVelocityTwo = 0
            }
            break
        case 'ArrowLeft':
            if (keys.ArrowRight != true) {
                keys.ArrowUp = false
                keys.ArrowDown = false
                keys.ArrowLeft = true
                keys.ArrowRight = false
                xVelocityTwo = -unitSize
                yVelocityTwo = 0
            }
            break
            
        case 'ArrowRight':
            if (keys.ArrowLeft != true) {
                keys.ArrowUp = false
                keys.ArrowDown = false
                keys.ArrowLeft = false
                keys.ArrowRight = true
                xVelocityTwo = unitSize
                yVelocityTwo = 0
            }
            break

        case 'w':
            if (keys.s != true) {
                keys.w = true
                keys.a = false
                keys.s = false
                keys.d = false
                yVelocityOne = -unitSize
                xVelocityOne = 0
            }
            break
        case 'a':
            if (keys.d != true) {
                keys.w = false
                keys.a = true
                keys.s = false
                keys.d = false
                xVelocityOne = -unitSize
                yVelocityOne = 0
            }
            break
        case 's':
            if (keys.w != true) {
                keys.w = false
                keys.a = false
                keys.s = true
                keys.d = false
                yVelocityOne = unitSize
                xVelocityOne = 0
            }
            break
        case 'd':
            if (keys.a != true) {
                keys.w = false
                keys.a = false
                keys.s = false
                keys.d = true
                xVelocityOne = unitSize
                yVelocityOne = 0
            }   
            break
    }
})

