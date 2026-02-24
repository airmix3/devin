// Main Game class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = STATE.MENU;
        this.keys = {};
        this.frame = 0;
        this.time = 400;
        this.camera = new Camera();
        this.player = null;
        this.entityManager = new EntityManager();
        this.deathPauseTimer = 0;

        this._setupInput();
    }

    _setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (e.code === 'Enter' && this.state === STATE.MENU) {
                this.start();
            }
            // Prevent scrolling with arrow keys and space
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    start() {
        Sound.init();
        Sound.resume();
        Level.generate();
        this.player = new Player();
        this.entityManager.init(Level.entities);
        this.camera = new Camera();
        this.state = STATE.PLAYING;
        this.time = 400;
        this.frame = 0;
        this.deathPauseTimer = 0;

        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.add('hidden');
        document.getElementById('win-screen').classList.add('hidden');
    }

    restart() {
        this.start();
    }

    update() {
        if (this.state !== STATE.PLAYING) return;

        this.frame++;

        // Timer (only decrement when player is alive)
        if (!this.player.dead) {
            this.time -= 1 / 60;
            if (this.time <= 0) {
                this.player.die();
            }
        }

        // Update player
        this.player.update(this.keys);

        // Update camera
        if (!this.player.dead) {
            this.camera.update(this.player.x, Level.width);
        }

        // Update entities
        this.entityManager.update(this.camera);

        // Check collisions (only when player is alive and not on flagpole)
        if (!this.player.dead && !this.player.reachedFlag) {
            this._checkEnemyCollisions();
            this._checkCoinCollisions();
            this._checkPowerupCollisions();
            this._checkFlagpoleCollision();
        }

        // Handle death
        if (this.player.dead) {
            this.deathPauseTimer++;
            if (this.deathPauseTimer > 180) {
                this.player.lives--;
                if (this.player.lives <= 0) {
                    this.state = STATE.GAME_OVER;
                    document.getElementById('final-score').textContent = this.player.score;
                    document.getElementById('game-over-screen').classList.remove('hidden');
                } else {
                    // Respawn
                    this._respawnPlayer();
                }
            }
        }

        // Handle win condition
        if (this.player.reachedFlag && !this.player.flagSliding) {
            // Walk toward the castle
            if (this.player.x > 205 * TILE_SIZE) {
                this.state = STATE.WIN;
                document.getElementById('win-score').textContent = this.player.score;
                document.getElementById('win-screen').classList.remove('hidden');
            }
        }
    }

    _respawnPlayer() {
        const score = this.player.score;
        const lives = this.player.lives;
        const coins = this.player.coins;
        Level.generate();
        this.player = new Player();
        this.player.score = score;
        this.player.lives = lives;
        this.player.coins = coins;
        this.entityManager.init(Level.entities);
        this.camera = new Camera();
        this.time = 400;
        this.deathPauseTimer = 0;
    }

    _checkEnemyCollisions() {
        for (const enemy of this.entityManager.enemies) {
            if (enemy.dead) continue;

            // Shell-enemy collisions
            if (enemy instanceof Koopa && enemy.isShell && enemy.shellMoving) {
                for (const other of this.entityManager.enemies) {
                    if (other === enemy || other.dead) continue;
                    if (this._boxCollision(enemy, other)) {
                        other.hitFromBelow();
                        this.player.score += ENEMY_SCORE;
                        this.entityManager.addFloatingText(other.x, other.y - 10, '' + ENEMY_SCORE);
                    }
                }
            }

            if (!this._boxCollision(this.player, enemy)) continue;

            if (enemy instanceof Koopa && enemy.isShell && !enemy.shellMoving) {
                // Kick the shell
                enemy.stomp();
                enemy.vx = this.player.x < enemy.x ? 6 : -6;
                Sound.stomp();
                continue;
            }

            // Check if player is stomping (falling on top)
            if (this.player.vy > 0 && this.player.y + this.player.height - 10 < enemy.y + enemy.height / 2) {
                // Stomp!
                enemy.stomp();
                this.player.vy = -8; // Bounce
                this.player.score += ENEMY_SCORE;
                Sound.stomp();
                this.entityManager.addFloatingText(enemy.x, enemy.y - 10, '' + ENEMY_SCORE);
            } else {
                // Player gets hurt
                this.player.die();
            }
        }
    }

    _checkCoinCollisions() {
        for (const coin of this.entityManager.coins) {
            if (coin.collected) continue;
            if (this._boxCollision(this.player, coin)) {
                coin.collect();
                this.player.coins++;
                this.player.score += COIN_SCORE;
                Sound.coin();
                this.entityManager.addFloatingText(coin.x, coin.y - 10, '' + COIN_SCORE);

                if (this.player.coins >= 100) {
                    this.player.coins -= 100;
                    this.player.lives++;
                    Sound.oneUp();
                }
            }
        }
    }

    _checkPowerupCollisions() {
        for (let i = this.entityManager.powerups.length - 1; i >= 0; i--) {
            const powerup = this.entityManager.powerups[i];
            if (powerup.collected || powerup.rising) continue;
            if (this._boxCollision(this.player, powerup)) {
                powerup.collected = true;
                this.player.grow();
                this.player.score += 1000;
                this.entityManager.addFloatingText(powerup.x, powerup.y - 10, '1000');
                this.entityManager.powerups.splice(i, 1);
            }
        }
    }

    _checkFlagpoleCollision() {
        const flagX = FLAGPOLE_X * TILE_SIZE;
        if (this.player.x + this.player.width > flagX &&
            this.player.x < flagX + TILE_SIZE &&
            !this.player.reachedFlag) {
            this.player.reachFlag();
        }
    }

    _boxCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        gradient.addColorStop(0, '#5c94fc');
        gradient.addColorStop(1, '#87ceeb');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (this.state === STATE.MENU) {
            return;
        }

        // Render level
        Level.render(this.ctx, this.camera, this.frame);

        // Render entities
        this.entityManager.render(this.ctx, this.camera, this.frame);

        // Render player
        if (this.player) {
            this.player.render(this.ctx, this.camera);
        }

        // Render HUD
        if (this.player) {
            HUD.render(this.ctx, this.player, this.time);
        }
    }
}
