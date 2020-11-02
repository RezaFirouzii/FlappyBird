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
    }
    document.addEventListener('keyup', control);

    function generateObstacle() {
        let obstacleLeftSide = skyWidth;
        const obstacleBottom = Math.random() * 60;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        gameDisplay.appendChild(obstacle);
        obstacle.style.left = obstacleLeftSide + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';

        function moveObstacle() {
            obstacleLeftSide -= 2;
            obstacle.style.left = obstacleLeftSide + 'px';
            if (obstacleLeftSide === -60) {
                clearInterval(obstacleMove);
                gameDisplay.removeChild(obstacle);
            }
            if (obstacleLeftSide > 200 && obstacleLeftSide < 280 && birdLeftSide === 220
                || birdBottom === 0) gameOver();
        }
        const obstacleMove = setInterval(moveObstacle, 20);
        setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

    function gameOver() {
        clearInterval(fallDown);
        isOver = true;
        document.removeEventListener('keyup', control);
    }

    const fallDown = setInterval(start, 20);
});
















