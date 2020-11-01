document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    const skyHeight = 580;
    const skyWidth = 500;

    let birdLeftSide = 220;
    let birdBottom = 100;
    let gravity = 2;

    function start() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeftSide + 'px';
    }

    function jump() {
        if (birdBottom < skyHeight - 100) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }

    document.addEventListener('keyup', (event) => {
        if (event.code === "Space") jump();
    });

    const fallDown = setInterval(start, 20);
});