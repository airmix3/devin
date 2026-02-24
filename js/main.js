// Main entry point
let game;

window.addEventListener('load', function() {
    game = new Game();

    // Button handlers
    document.getElementById('start-btn').addEventListener('click', function() {
        game.start();
    });

    document.getElementById('restart-btn').addEventListener('click', function() {
        game.restart();
    });

    document.getElementById('win-restart-btn').addEventListener('click', function() {
        game.restart();
    });

    // Game loop
    function gameLoop() {
        game.update();
        game.render();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
