// HUD (Heads-Up Display) rendering
const HUD = {
    render: function(ctx, player, time) {
        ctx.save();

        // Background bar
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, 36);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px "Courier New", monospace';
        ctx.textAlign = 'left';

        // MARIO label & Score
        ctx.fillText('MARIO', 30, 14);
        ctx.fillText(String(player.score).padStart(6, '0'), 30, 30);

        // Coins
        ctx.fillStyle = '#fbd000';
        ctx.fillRect(180, 18, 8, 10);
        ctx.fillStyle = '#fff';
        ctx.fillText('x' + String(player.coins).padStart(2, '0'), 192, 30);

        // World
        ctx.textAlign = 'center';
        ctx.fillText('WORLD', CANVAS_WIDTH / 2, 14);
        ctx.fillText('1-1', CANVAS_WIDTH / 2, 30);

        // Time
        ctx.textAlign = 'right';
        ctx.fillText('TIME', CANVAS_WIDTH - 30, 14);
        ctx.fillText(String(Math.max(0, Math.ceil(time))).padStart(3, '0'), CANVAS_WIDTH - 30, 30);

        // Lives
        ctx.textAlign = 'left';
        ctx.fillStyle = '#e52521';
        ctx.fillRect(290, 18, 10, 12);
        ctx.fillStyle = '#fff';
        ctx.fillText('x' + player.lives, 304, 30);

        ctx.restore();
    },
};
