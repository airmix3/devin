// Entity management (enemies, coins, powerups, particles)
class EntityManager {
    constructor() {
        this.enemies = [];
        this.coins = [];
        this.powerups = [];
        this.particles = [];
        this.floatingTexts = [];
        this.coinBounces = [];
    }

    init(levelEntities) {
        this.enemies = [];
        this.coins = [];
        this.powerups = [];
        this.particles = [];
        this.floatingTexts = [];
        this.coinBounces = [];

        for (const entity of levelEntities) {
            if (entity.type === ENTITY.GOOMBA) {
                this.enemies.push(new Goomba(entity.x, entity.y));
            } else if (entity.type === ENTITY.KOOPA) {
                this.enemies.push(new Koopa(entity.x, entity.y));
            } else if (entity.type === ENTITY.COIN) {
                this.coins.push(new Coin(entity.x, entity.y));
            }
        }
    }

    update(camera) {
        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            // Only update enemies near the camera (activate when close)
            if (enemy.x < camera.x + camera.width + TILE_SIZE * 2 &&
                enemy.x > camera.x - TILE_SIZE * 4) {
                enemy.active = true;
            }
            if (enemy.active) {
                enemy.update();
            }
            if (enemy.dead && enemy.deadTimer > 60) {
                this.enemies.splice(i, 1);
            }
        }

        // Update coins
        for (const coin of this.coins) {
            coin.update();
        }

        // Update powerups
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            this.powerups[i].update();
            if (this.powerups[i].y > CANVAS_HEIGHT + 100) {
                this.powerups.splice(i, 1);
            }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3;
            p.life--;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // Update floating texts
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const ft = this.floatingTexts[i];
            ft.y -= 1.5;
            ft.life--;
            if (ft.life <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }

        // Update coin bounces
        for (let i = this.coinBounces.length - 1; i >= 0; i--) {
            const cb = this.coinBounces[i];
            cb.y += cb.vy;
            cb.vy += 0.5;
            cb.life--;
            if (cb.life <= 0) {
                this.coinBounces.splice(i, 1);
            }
        }
    }

    render(ctx, camera, frame) {
        // Render coins
        for (const coin of this.coins) {
            if (!coin.collected && camera.isVisible(coin.x, coin.y, 32, 32)) {
                const sp = camera.worldToScreen(coin.x, coin.y);
                Sprites.drawCoin(ctx, sp.x, sp.y, 32, frame);
            }
        }

        // Render enemies
        for (const enemy of this.enemies) {
            if (camera.isVisible(enemy.x, enemy.y, enemy.width, enemy.height)) {
                const sp = camera.worldToScreen(enemy.x, enemy.y);
                enemy.render(ctx, sp.x, sp.y, frame);
            }
        }

        // Render powerups
        for (const powerup of this.powerups) {
            if (camera.isVisible(powerup.x, powerup.y, 32, 32)) {
                const sp = camera.worldToScreen(powerup.x, powerup.y);
                Sprites.drawMushroom(ctx, sp.x, sp.y, 32);
            }
        }

        // Render particles
        for (const p of this.particles) {
            const sp = camera.worldToScreen(p.x, p.y);
            Sprites.drawParticle(ctx, sp.x, sp.y, p.size, p.color);
        }

        // Render coin bounces
        for (const cb of this.coinBounces) {
            const sp = camera.worldToScreen(cb.x, cb.y);
            Sprites.drawCoin(ctx, sp.x, sp.y, 28, frame);
        }

        // Render floating texts
        for (const ft of this.floatingTexts) {
            const sp = camera.worldToScreen(ft.x, ft.y);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(ft.text, sp.x, sp.y);
        }
    }

    addParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 6 - 2,
                size: 4 + Math.random() * 4,
                color: color,
                life: 30 + Math.random() * 20,
            });
        }
    }

    addFloatingText(x, y, text) {
        this.floatingTexts.push({
            x: x,
            y: y,
            text: text,
            life: 40,
        });
    }

    addCoinBounce(x, y) {
        this.coinBounces.push({
            x: x,
            y: y,
            vy: -8,
            life: 30,
        });
    }

    spawnMushroom(x, y) {
        this.powerups.push(new Mushroom(x, y));
    }
}

// Goomba enemy
class Goomba {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = TILE_SIZE;
        this.height = TILE_SIZE;
        this.vx = -ENEMY_SPEED;
        this.vy = 0;
        this.active = false;
        this.dead = false;
        this.squished = false;
        this.deadTimer = 0;
        this.animFrame = 0;
        this.animTimer = 0;
    }

    update() {
        if (this.dead) {
            this.deadTimer++;
            return;
        }

        this.animTimer++;
        if (this.animTimer >= 15) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 2;
        }

        // Apply gravity
        this.vy += GRAVITY;
        if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

        // Move horizontally
        this.x += this.vx;

        // Check horizontal collisions
        const leftTile = Level.getTileAt(this.x + 2, this.y + this.height / 2);
        const rightTile = Level.getTileAt(this.x + this.width - 2, this.y + this.height / 2);

        if (Level.isSolid(leftTile)) {
            this.x = Math.ceil(this.x / TILE_SIZE) * TILE_SIZE;
            this.vx = ENEMY_SPEED;
        } else if (Level.isSolid(rightTile)) {
            this.x = Math.floor(this.x / TILE_SIZE) * TILE_SIZE;
            this.vx = -ENEMY_SPEED;
        }

        // Move vertically
        this.y += this.vy;

        // Check ground collision
        const bottomLeft = Level.getTileAt(this.x + 4, this.y + this.height);
        const bottomRight = Level.getTileAt(this.x + this.width - 4, this.y + this.height);

        if (Level.isSolid(bottomLeft) || Level.isSolid(bottomRight)) {
            this.y = Math.floor(this.y / TILE_SIZE) * TILE_SIZE;
            this.vy = 0;
        }

        // Fall into pit
        if (this.y > CANVAS_HEIGHT + 100) {
            this.dead = true;
            this.deadTimer = 100;
        }
    }

    render(ctx, sx, sy, frame) {
        Sprites.drawGoomba(ctx, sx, sy, this.width, this.animFrame, this.squished);
    }

    stomp() {
        this.squished = true;
        this.dead = true;
        this.deadTimer = 0;
        this.vx = 0;
    }

    hitFromBelow() {
        this.dead = true;
        this.deadTimer = 30;
        this.vy = -6;
        this.vx = 2;
    }
}

// Koopa Troopa enemy
class Koopa {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = TILE_SIZE;
        this.height = 48;
        this.vx = -ENEMY_SPEED;
        this.vy = 0;
        this.active = false;
        this.dead = false;
        this.isShell = false;
        this.shellMoving = false;
        this.deadTimer = 0;
        this.direction = -1;
        this.animFrame = 0;
        this.animTimer = 0;
    }

    update() {
        if (this.dead && !this.isShell) {
            this.deadTimer++;
            return;
        }

        this.animTimer++;
        if (this.animTimer >= 15) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 2;
        }

        // Apply gravity
        this.vy += GRAVITY;
        if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

        // Move
        this.x += this.vx;

        // Horizontal collisions
        const leftTile = Level.getTileAt(this.x + 2, this.y + this.height / 2);
        const rightTile = Level.getTileAt(this.x + this.width - 2, this.y + this.height / 2);

        if (Level.isSolid(leftTile)) {
            this.x = Math.ceil(this.x / TILE_SIZE) * TILE_SIZE;
            this.vx = Math.abs(this.vx);
            this.direction = 1;
        } else if (Level.isSolid(rightTile)) {
            this.x = Math.floor(this.x / TILE_SIZE) * TILE_SIZE;
            this.vx = -Math.abs(this.vx);
            this.direction = -1;
        }

        // Vertical collisions
        this.y += this.vy;
        const bottomLeft = Level.getTileAt(this.x + 4, this.y + this.height);
        const bottomRight = Level.getTileAt(this.x + this.width - 4, this.y + this.height);

        if (Level.isSolid(bottomLeft) || Level.isSolid(bottomRight)) {
            this.y = Math.floor(this.y / TILE_SIZE) * TILE_SIZE;
            this.vy = 0;
        }

        // Shell hitting enemies
        if (this.isShell && this.shellMoving) {
            // This is handled in the game update
        }

        if (this.y > CANVAS_HEIGHT + 100) {
            this.dead = true;
            this.deadTimer = 100;
        }
    }

    render(ctx, sx, sy, frame) {
        Sprites.drawKoopa(ctx, sx, sy, this.width, this.height, this.animFrame, this.direction, this.isShell);
    }

    stomp() {
        if (!this.isShell) {
            // Turn into shell
            this.isShell = true;
            this.shellMoving = false;
            this.vx = 0;
            this.height = 32;
            this.y += 16;
        } else if (!this.shellMoving) {
            // Kick the shell
            this.shellMoving = true;
            this.vx = 6;
        } else {
            // Stop the shell
            this.shellMoving = false;
            this.vx = 0;
        }
    }

    hitFromBelow() {
        this.dead = true;
        this.deadTimer = 30;
        this.vy = -6;
        this.vx = 2;
    }
}

// Coin entity
class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 28;
        this.height = 32;
        this.collected = false;
    }

    update() {}

    collect() {
        this.collected = true;
    }
}

// Mushroom powerup
class Mushroom {
    constructor(x, y) {
        this.x = x;
        this.y = y; // Start inside the block
        this.targetY = y - TILE_SIZE; // Rise to one tile above
        this.width = 32;
        this.height = 32;
        this.vx = 2;
        this.vy = 0;
        this.rising = true;
        this.riseStart = y;
        this.collected = false;
    }

    update() {
        if (this.collected) return;

        if (this.rising) {
            this.y -= 1;
            if (this.y <= this.riseStart - TILE_SIZE) {
                this.rising = false;
            }
            return;
        }

        // Apply gravity
        this.vy += GRAVITY;
        if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

        // Move
        this.x += this.vx;

        // Horizontal collisions
        const leftTile = Level.getTileAt(this.x, this.y + this.height / 2);
        const rightTile = Level.getTileAt(this.x + this.width, this.y + this.height / 2);

        if (Level.isSolid(leftTile)) {
            this.vx = Math.abs(this.vx);
        } else if (Level.isSolid(rightTile)) {
            this.vx = -Math.abs(this.vx);
        }

        this.y += this.vy;
        const bottomLeft = Level.getTileAt(this.x + 2, this.y + this.height);
        const bottomRight = Level.getTileAt(this.x + this.width - 2, this.y + this.height);

        if (Level.isSolid(bottomLeft) || Level.isSolid(bottomRight)) {
            this.y = Math.floor(this.y / TILE_SIZE) * TILE_SIZE;
            this.vy = 0;
        }
    }
}
