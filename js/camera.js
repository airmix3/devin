// Camera system for scrolling
class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = CANVAS_WIDTH;
        this.height = CANVAS_HEIGHT;
    }

    update(playerX, levelWidth) {
        // Follow the player, keeping them roughly 1/3 from the left
        const targetX = playerX - this.width / 3;

        // Smooth camera movement
        this.x += (targetX - this.x) * 0.1;

        // Clamp camera
        if (this.x < 0) this.x = 0;
        const maxX = levelWidth * TILE_SIZE - this.width;
        if (this.x > maxX) this.x = maxX;
    }

    // Check if a position is visible on screen
    isVisible(x, y, width, height) {
        return (
            x + width > this.x - TILE_SIZE &&
            x < this.x + this.width + TILE_SIZE &&
            y + height > this.y &&
            y < this.y + this.height
        );
    }

    // Convert world coordinates to screen coordinates
    worldToScreen(x, y) {
        return {
            x: x - this.x,
            y: y - this.y,
        };
    }
}
