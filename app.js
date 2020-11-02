document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    const skyHeight = 580;
    const skyWidth = 500;
    const groundHeight = 150;
    const groundWidth = 500;

    let birdLeftSide = 220;
    let birdBottom = 100;
    let gravity = 2;
    let gap = 425;
    let isOver = false;

    function start() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeftSide + 'px';
    }

    function jump() {
        if (birdBottom < skyHeight - 100) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }

    function control(event) {
        if (event.code === "Space") jump();
        //console.log(birdBottom);
    }
    document.addEventListener('keyup', control);

    function generateObstacle() {
        let obstacleLeftSide = skyWidth;
        const obstacleBottom = Math.random() * 60;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('top-obstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeftSide + 'px';
        topObstacle.style.left = obstacleLeftSide + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            obstacleLeftSide -= 2;
            obstacle.style.left = obstacleLeftSide + 'px';
            topObstacle.style.left = obstacleLeftSide + 'px';
            if (obstacleLeftSide === -60) {
                clearInterval(obstacleMove);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if (isOver) clearInterval(obstacleMove);
            if (isGameOver(obstacleLeftSide, obstacleBottom)) {
                gameOver();
                clearInterval(obstacleMove);
                console.log(birdLeftSide + " " + obstacleLeftSide);
            }
        }
        const obstacleMove = setInterval(moveObstacle, 20);
        if (!isOver) setTimeout(generateObstacle, Math.random() * 3000 + 1000);
    }
    generateObstacle();

    function isGameOver(obstacleLeft, obstacleBottom) {
        return obstacleLeft > 165 && obstacleLeft < 280 && birdLeftSide === 220
            && (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 195)
            || birdBottom === 0;
    }

    function gameOver() {
        isOver = true;
        clearInterval(fallDown);
        document.removeEventListener('keyup', control);
    }

    const fallDown = setInterval(start, 20);
});
















