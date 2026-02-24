// Player (Mario) class
class Player {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = 3 * TILE_SIZE;
        this.y = (Level.height - 4) * TILE_SIZE;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.vx = 0;
        this.vy = 0;
        this.direction = 1; // 1 = right, -1 = left
        this.onGround = false;
        this.big = false;
        this.animFrame = 0;
        this.animTimer = 0;
        this.invincible = 0;
        this.dead = false;
        this.deathTimer = 0;
        this.reachedFlag = false;
        this.flagSliding = false;
        this.score = 0;
        this.coins = 0;
        this.lives = STARTING_LIVES;
    }

    update(keys) {
        if (this.dead) {
            this.deathTimer++;
            if (this.deathTimer < 20) {
                // Pause before flying up
            } else if (this.deathTimer === 20) {
                this.vy = -10;
            } else {
                this.vy += 0.4;
                this.y += this.vy;
            }
            return;
        }

        if (this.reachedFlag) {
            if (this.flagSliding) {
                this.y += 3;
                const groundY = (Level.height - 3) * TILE_SIZE;
                if (this.y >= groundY - this.height) {
                    this.y = groundY - this.height;
                    this.flagSliding = false;
                    this.vx = PLAYER_WALK_SPEED;
                    this.direction = 1;
                }
            } else {
                // Walk to the right after sliding down
                this.x += PLAYER_WALK_SPEED;
                this.animTimer++;
                if (this.animTimer >= ANIMATION_SPEED) {
                    this.animTimer = 0;
                    this.animFrame = (this.animFrame + 1) % 4;
                }
            }
            return;
        }

        // Invincibility timer
        if (this.invincible > 0) {
            this.invincible--;
        }

        // Horizontal movement
        const running = keys['ShiftLeft'] || keys['ShiftRight'];
        const maxSpeed = running ? PLAYER_RUN_SPEED : PLAYER_WALK_SPEED;
        const accel = 0.3;
        const decel = 0.2;

        if (keys['ArrowRight'] || keys['KeyD']) {
            this.vx = Math.min(this.vx + accel, maxSpeed);
            this.direction = 1;
        } else if (keys['ArrowLeft'] || keys['KeyA']) {
            this.vx = Math.max(this.vx - accel, -maxSpeed);
            this.direction = -1;
        } else {
            // Decelerate
            if (this.vx > 0) {
                this.vx = Math.max(0, this.vx - decel);
            } else if (this.vx < 0) {
                this.vx = Math.min(0, this.vx + decel);
            }
        }

        // Jump
        if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && this.onGround) {
            this.vy = PLAYER_JUMP_FORCE;
            this.onGround = false;
            Sound.jump();
        }

        // Variable jump height - if they release jump early, reduce upward velocity
        if (!(keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && this.vy < -4) {
            this.vy = -4;
        }

        // Apply gravity
        this.vy += GRAVITY;
        if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

        // Move horizontally
        this.x += this.vx;

        // Prevent going left of screen
        if (this.x < 0) {
            this.x = 0;
            this.vx = 0;
        }

        // Horizontal collision detection
        this._handleHorizontalCollisions();

        // Move vertically
        this.y += this.vy;

        // Vertical collision detection
        this._handleVerticalCollisions();

        // Animation
        if (Math.abs(this.vx) > 0.5) {
            this.animTimer++;
            const speed = running ? ANIMATION_SPEED / 2 : ANIMATION_SPEED;
            if (this.animTimer >= speed) {
                this.animTimer = 0;
                this.animFrame = (this.animFrame + 1) % 4;
            }
        } else {
            this.animFrame = 0;
        }

        // Fall death
        if (this.y > CANVAS_HEIGHT + TILE_SIZE) {
            this.die();
        }
    }

    _handleHorizontalCollisions() {
        const margin = 4;
        // Check right side
        if (this.vx > 0) {
            const rightX = this.x + this.width;
            for (let checkY = this.y + margin; checkY < this.y + this.height - margin; checkY += TILE_SIZE / 2) {
                const tile = Level.getTileAt(rightX, checkY);
                if (Level.isSolid(tile)) {
                    this.x = Math.floor(rightX / TILE_SIZE) * TILE_SIZE - this.width;
                    this.vx = 0;
                    break;
                }
            }
        }
        // Check left side
        if (this.vx < 0) {
            const leftX = this.x;
            for (let checkY = this.y + margin; checkY < this.y + this.height - margin; checkY += TILE_SIZE / 2) {
                const tile = Level.getTileAt(leftX, checkY);
                if (Level.isSolid(tile)) {
                    this.x = Math.ceil(leftX / TILE_SIZE) * TILE_SIZE;
                    this.vx = 0;
                    break;
                }
            }
        }
    }

    _handleVerticalCollisions() {
        const margin = 4;
        this.onGround = false;

        // Check bottom (landing)
        if (this.vy >= 0) {
            const bottomY = this.y + this.height;
            for (let checkX = this.x + margin; checkX < this.x + this.width - margin; checkX += TILE_SIZE / 2) {
                const tile = Level.getTileAt(checkX, bottomY);
                if (Level.isSolid(tile)) {
                    this.y = Math.floor(bottomY / TILE_SIZE) * TILE_SIZE - this.height;
                    this.vy = 0;
                    this.onGround = true;
                    break;
                }
            }
            // Also check the rightmost point
            const tile = Level.getTileAt(this.x + this.width - margin, bottomY);
            if (Level.isSolid(tile)) {
                this.y = Math.floor(bottomY / TILE_SIZE) * TILE_SIZE - this.height;
                this.vy = 0;
                this.onGround = true;
            }
        }

        // Check top (hitting blocks from below)
        if (this.vy < 0) {
            const topY = this.y;
            for (let checkX = this.x + margin; checkX < this.x + this.width - margin; checkX += TILE_SIZE / 2) {
                const tile = Level.getTileAt(checkX, topY);
                if (Level.isSolid(tile)) {
                    this.y = Math.ceil(topY / TILE_SIZE) * TILE_SIZE;
                    this.vy = 0;

                    // Hit block
                    const tx = Math.floor(checkX / TILE_SIZE);
                    const ty = Math.floor(topY / TILE_SIZE);
                    this._hitBlock(tx, ty);
                    break;
                }
            }
        }
    }

    _hitBlock(tx, ty) {
        const tile = Level.map[ty][tx];

        if (tile === TILE.QUESTION) {
            Level.map[ty][tx] = TILE.USED_BLOCK;
            Sound.coin();

            // Special question blocks spawn mushroom
            if (tx === 23 && ty === 9) {
                // Spawn mushroom
                game.entityManager.spawnMushroom(tx * TILE_SIZE, ty * TILE_SIZE);
                Sound.powerup();
            } else {
                // Coin from question block
                this.coins++;
                this.score += COIN_SCORE;
                game.entityManager.addCoinBounce(tx * TILE_SIZE + 6, ty * TILE_SIZE - TILE_SIZE);
                game.entityManager.addFloatingText(tx * TILE_SIZE + TILE_SIZE / 2, ty * TILE_SIZE - 10, '' + COIN_SCORE);
            }

            if (this.coins >= 100) {
                this.coins -= 100;
                this.lives++;
                Sound.oneUp();
            }

            // Check for enemies above the block
            this._hitEnemiesAboveBlock(tx, ty);
        } else if (tile === TILE.BRICK) {
            Sound.bump();
            if (this.big) {
                // Break the brick
                Level.map[ty][tx] = TILE.EMPTY;
                Sound.breakBlock();
                this.score += BLOCK_SCORE;
                game.entityManager.addParticles(
                    tx * TILE_SIZE + TILE_SIZE / 2,
                    ty * TILE_SIZE + TILE_SIZE / 2,
                    6,
                    '#c84c0c'
                );
                this._hitEnemiesAboveBlock(tx, ty);
            } else {
                // Bump animation handled via particles
                game.entityManager.addParticles(
                    tx * TILE_SIZE + TILE_SIZE / 2,
                    ty * TILE_SIZE,
                    2,
                    '#c84c0c'
                );
                this._hitEnemiesAboveBlock(tx, ty);
            }
        } else if (tile === TILE.USED_BLOCK) {
            Sound.bump();
        }
    }

    _hitEnemiesAboveBlock(tx, ty) {
        const blockX = tx * TILE_SIZE;
        const blockY = ty * TILE_SIZE;

        for (const enemy of game.entityManager.enemies) {
            if (!enemy.dead &&
                enemy.x + enemy.width > blockX &&
                enemy.x < blockX + TILE_SIZE &&
                enemy.y + enemy.height >= blockY - 4 &&
                enemy.y + enemy.height <= blockY + 4) {
                enemy.hitFromBelow();
                this.score += ENEMY_SCORE;
                Sound.stomp();
                game.entityManager.addFloatingText(enemy.x, enemy.y - 10, '' + ENEMY_SCORE);
            }
        }
    }

    die() {
        if (this.invincible > 0) return;

        if (this.big) {
            this.big = false;
            this.invincible = INVINCIBLE_DURATION;
            this.height = PLAYER_HEIGHT;
            Sound.bump();
            return;
        }

        this.dead = true;
        this.deathTimer = 0;
        this.vy = 0;
        this.vx = 0;
        Sound.die();
    }

    render(ctx, camera) {
        if (this.dead) {
            // Death animation - Mario flies up
            const sp = camera.worldToScreen(this.x, this.y);
            Sprites.drawMario(ctx, sp.x, sp.y, this.width, this.height, 0, 1, this.big);
            return;
        }

        // Invincibility flashing
        if (this.invincible > 0 && Math.floor(this.invincible / 4) % 2 === 0) {
            return; // Skip rendering for flash effect
        }

        const sp = camera.worldToScreen(this.x, this.y);

        if (!this.onGround && !this.reachedFlag) {
            Sprites.drawMarioJump(ctx, sp.x, sp.y, this.width, this.height, this.direction, this.big);
        } else {
            Sprites.drawMario(ctx, sp.x, sp.y, this.width, this.height, this.animFrame, this.direction, this.big);
        }
    }

    // Grow Mario (mushroom power-up)
    grow() {
        if (!this.big) {
            this.big = true;
            this.height = 56;
            this.y -= 16;
            Sound.powerup();
        }
    }

    // Reach flagpole
    reachFlag() {
        this.reachedFlag = true;
        this.flagSliding = true;
        this.vx = 0;
        this.vy = 0;
        this.x = FLAGPOLE_X * TILE_SIZE - this.width / 2;
        Sound.flagpole();

        // Score based on height
        const flagBase = (Level.height - 3) * TILE_SIZE;
        const heightRatio = 1 - ((this.y) / flagBase);
        const flagScore = Math.floor(heightRatio * 5000);
        this.score += Math.max(100, flagScore);
    }
}
