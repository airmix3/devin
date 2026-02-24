// Level data and generation
const Level = {
    // Level 1-1 inspired map
    // Each number corresponds to a TILE type
    // The map is 210 tiles wide, 15 tiles tall (600/40 = 15)
    width: 210,
    height: 15,

    map: null,
    entities: null,
    decorations: null,

    generate: function() {
        this.map = [];
        this.entities = [];
        this.decorations = [];

        // Initialize empty map
        for (let y = 0; y < this.height; y++) {
            this.map[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.map[y][x] = TILE.EMPTY;
            }
        }

        // Ground (bottom 2 rows)
        for (let x = 0; x < this.width; x++) {
            // Gaps in the ground
            if ((x >= 69 && x <= 71) || (x >= 86 && x <= 89) ||
                (x >= 153 && x <= 155)) {
                continue;
            }
            this.map[this.height - 1][x] = TILE.GROUND;
            this.map[this.height - 2][x] = TILE.GROUND;
        }

        // Question blocks with coins
        this._setTile(16, 9, TILE.QUESTION);
        this._setTile(21, 9, TILE.QUESTION);
        this._setTile(22, 9, TILE.BRICK);
        this._setTile(23, 9, TILE.QUESTION);  // mushroom
        this._setTile(24, 9, TILE.BRICK);
        this._setTile(22, 5, TILE.QUESTION);

        // Second set of blocks
        this._setTile(77, 9, TILE.QUESTION);
        this._setTile(78, 9, TILE.BRICK);
        this._setTile(79, 9, TILE.QUESTION);
        this._setTile(80, 9, TILE.BRICK);

        // Brick platform area
        this._setTile(80, 5, TILE.BRICK);
        this._setTile(81, 5, TILE.BRICK);
        this._setTile(82, 5, TILE.BRICK);
        this._setTile(83, 5, TILE.BRICK);
        this._setTile(84, 5, TILE.BRICK);
        this._setTile(85, 5, TILE.BRICK);
        this._setTile(86, 5, TILE.BRICK);
        this._setTile(87, 5, TILE.BRICK);

        // More question blocks
        this._setTile(91, 9, TILE.BRICK);
        this._setTile(94, 9, TILE.QUESTION);
        this._setTile(94, 5, TILE.QUESTION);
        this._setTile(100, 9, TILE.QUESTION);
        this._setTile(101, 9, TILE.QUESTION);

        // Brick rows in sky
        this._setTile(106, 9, TILE.BRICK);
        this._setTile(107, 9, TILE.BRICK);
        this._setTile(108, 9, TILE.BRICK);
        this._setTile(109, 9, TILE.QUESTION);

        this._setTile(109, 5, TILE.BRICK);
        this._setTile(110, 5, TILE.BRICK);
        this._setTile(111, 5, TILE.BRICK);

        // Block areas before gaps
        this._setTile(119, 9, TILE.BRICK);
        this._setTile(120, 9, TILE.BRICK);
        this._setTile(121, 9, TILE.QUESTION);
        this._setTile(122, 9, TILE.BRICK);

        // More platforms
        this._setTile(128, 5, TILE.BRICK);
        this._setTile(129, 5, TILE.BRICK);
        this._setTile(130, 5, TILE.BRICK);
        this._setTile(131, 5, TILE.QUESTION);
        this._setTile(132, 5, TILE.BRICK);

        // Near-end blocks
        this._setTile(168, 9, TILE.BRICK);
        this._setTile(169, 9, TILE.BRICK);
        this._setTile(170, 9, TILE.QUESTION);
        this._setTile(171, 9, TILE.BRICK);

        // Pipes
        this._addPipe(28, 2);
        this._addPipe(38, 3);
        this._addPipe(46, 4);
        this._addPipe(57, 4);
        this._addPipe(163, 2);
        this._addPipe(179, 2);

        // Stairs before flagpole
        this._addStairs(181, 1);
        this._addStairs(182, 2);
        this._addStairs(183, 3);
        this._addStairs(184, 4);
        this._addStairs(185, 5);
        this._addStairs(186, 6);
        this._addStairs(187, 7);
        this._addStairs(188, 8);

        // Stairs down after gap
        this._addStairs(134, 4);
        this._addStairs(135, 3);
        this._addStairs(136, 2);
        this._addStairs(137, 1);

        // Small stair sets
        this._addStairs(61, 4);
        this._addStairs(62, 3);
        this._addStairs(63, 2);
        this._addStairs(64, 1);

        this._addStairs(65, 1);
        this._addStairs(66, 2);
        this._addStairs(67, 3);
        this._addStairs(68, 4);

        // Flagpole
        for (let y = 3; y < this.height - 2; y++) {
            this.map[y][FLAGPOLE_X] = TILE.FLAGPOLE;
        }
        this.map[2][FLAGPOLE_X] = TILE.FLAG_TOP;

        // Castle base (simple representation after flagpole)
        for (let y = this.height - 7; y < this.height - 2; y++) {
            for (let x = 202; x <= 208; x++) {
                this.map[y][x] = TILE.HARD_BLOCK;
            }
        }
        // Castle top
        this.map[this.height - 8][203] = TILE.HARD_BLOCK;
        this.map[this.height - 8][205] = TILE.HARD_BLOCK;
        this.map[this.height - 8][207] = TILE.HARD_BLOCK;
        this.map[this.height - 9][205] = TILE.HARD_BLOCK;

        // Enemies
        this._addEnemy(22 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(40 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(51 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(52.5 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(80 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(82 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(97 * TILE_SIZE, ENTITY.KOOPA);
        this._addEnemy(107 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(114 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(115.5 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(124 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(125.5 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(128 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(129.5 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(145 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(146.5 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(170 * TILE_SIZE, ENTITY.GOOMBA);
        this._addEnemy(174 * TILE_SIZE, ENTITY.KOOPA);

        // Coins in the air
        this._addCoin(17 * TILE_SIZE + 4, 7 * TILE_SIZE);
        this._addCoin(82 * TILE_SIZE + 4, 3 * TILE_SIZE);
        this._addCoin(83 * TILE_SIZE + 4, 3 * TILE_SIZE);
        this._addCoin(84 * TILE_SIZE + 4, 3 * TILE_SIZE);
        this._addCoin(85 * TILE_SIZE + 4, 3 * TILE_SIZE);
        this._addCoin(110 * TILE_SIZE + 4, 3 * TILE_SIZE);
        this._addCoin(111 * TILE_SIZE + 4, 3 * TILE_SIZE);
        this._addCoin(130 * TILE_SIZE + 4, 3 * TILE_SIZE);

        // Decorations (clouds, bushes, hills)
        this._addDecoration(8, 2, 'cloud');
        this._addDecoration(20, 3, 'cloud');
        this._addDecoration(36, 2, 'cloud');
        this._addDecoration(55, 3, 'cloud');
        this._addDecoration(75, 2, 'cloud');
        this._addDecoration(95, 3, 'cloud');
        this._addDecoration(120, 2, 'cloud');
        this._addDecoration(145, 3, 'cloud');
        this._addDecoration(170, 2, 'cloud');
        this._addDecoration(195, 3, 'cloud');

        this._addDecoration(12, this.height - 3, 'bush');
        this._addDecoration(35, this.height - 3, 'bush');
        this._addDecoration(60, this.height - 3, 'bush');
        this._addDecoration(95, this.height - 3, 'bush');
        this._addDecoration(140, this.height - 3, 'bush');
        this._addDecoration(175, this.height - 3, 'bush');

        this._addDecoration(0, this.height - 3, 'hill');
        this._addDecoration(16, this.height - 3, 'hill');
        this._addDecoration(48, this.height - 3, 'hill');
        this._addDecoration(72, this.height - 3, 'hill');
        this._addDecoration(105, this.height - 3, 'hill');
        this._addDecoration(150, this.height - 3, 'hill');
    },

    _setTile: function(x, y, type) {
        if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
            this.map[y][x] = type;
        }
    },

    _addPipe: function(x, height) {
        const groundY = this.height - 2;
        // Pipe top
        this._setTile(x, groundY - height, TILE.PIPE_TOP_LEFT);
        this._setTile(x + 1, groundY - height, TILE.PIPE_TOP_RIGHT);
        // Pipe body
        for (let h = 1; h < height; h++) {
            this._setTile(x, groundY - height + h, TILE.PIPE_BODY_LEFT);
            this._setTile(x + 1, groundY - height + h, TILE.PIPE_BODY_RIGHT);
        }
    },

    _addStairs: function(x, height) {
        for (let h = 0; h < height; h++) {
            this._setTile(x, this.height - 3 - h, TILE.HARD_BLOCK);
        }
    },

    _addEnemy: function(x, type) {
        const groundY = (this.height - 2) * TILE_SIZE;
        this.entities.push({
            type: type,
            x: x,
            y: type === ENTITY.KOOPA ? groundY - 48 : groundY - TILE_SIZE,
            startX: x,
        });
    },

    _addCoin: function(x, y) {
        this.entities.push({
            type: ENTITY.COIN,
            x: x,
            y: y,
        });
    },

    _addDecoration: function(x, y, type) {
        this.decorations.push({ x: x, y: y, type: type });
    },

    // Get tile at pixel position
    getTileAt: function(px, py) {
        const tx = Math.floor(px / TILE_SIZE);
        const ty = Math.floor(py / TILE_SIZE);
        if (tx < 0 || tx >= this.width || ty < 0 || ty >= this.height) {
            return TILE.EMPTY;
        }
        return this.map[ty][tx];
    },

    // Check if a tile is solid
    isSolid: function(tileType) {
        return tileType === TILE.GROUND ||
               tileType === TILE.BRICK ||
               tileType === TILE.QUESTION ||
               tileType === TILE.USED_BLOCK ||
               tileType === TILE.PIPE_TOP_LEFT ||
               tileType === TILE.PIPE_TOP_RIGHT ||
               tileType === TILE.PIPE_BODY_LEFT ||
               tileType === TILE.PIPE_BODY_RIGHT ||
               tileType === TILE.HARD_BLOCK;
    },

    // Check if a tile is breakable
    isBreakable: function(tileType) {
        return tileType === TILE.BRICK;
    },

    // Render the level
    render: function(ctx, camera, frame) {
        const startCol = Math.max(0, Math.floor(camera.x / TILE_SIZE) - 1);
        const endCol = Math.min(this.width, Math.ceil((camera.x + camera.width) / TILE_SIZE) + 1);
        const startRow = 0;
        const endRow = this.height;

        // Draw decorations first (behind everything)
        for (const dec of this.decorations) {
            const screenPos = camera.worldToScreen(dec.x * TILE_SIZE, dec.y * TILE_SIZE);
            if (dec.type === 'cloud') {
                Sprites.drawCloud(ctx, screenPos.x, screenPos.y, TILE_SIZE * 2);
            } else if (dec.type === 'bush') {
                Sprites.drawBush(ctx, screenPos.x, screenPos.y, TILE_SIZE * 2);
            } else if (dec.type === 'hill') {
                Sprites.drawHill(ctx, screenPos.x, screenPos.y, TILE_SIZE * 3);
            }
        }

        // Draw tiles
        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++) {
                const tile = this.map[row][col];
                if (tile === TILE.EMPTY) continue;

                const screenPos = camera.worldToScreen(col * TILE_SIZE, row * TILE_SIZE);
                const sx = screenPos.x;
                const sy = screenPos.y;

                switch (tile) {
                    case TILE.GROUND:
                        Sprites.drawGround(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.BRICK:
                        Sprites.drawBrick(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.QUESTION:
                        Sprites.drawQuestionBlock(ctx, sx, sy, TILE_SIZE, frame);
                        break;
                    case TILE.USED_BLOCK:
                        Sprites.drawUsedBlock(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.PIPE_TOP_LEFT:
                        Sprites.drawPipeTopLeft(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.PIPE_TOP_RIGHT:
                        Sprites.drawPipeTopRight(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.PIPE_BODY_LEFT:
                        Sprites.drawPipeBodyLeft(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.PIPE_BODY_RIGHT:
                        Sprites.drawPipeBodyRight(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.FLAGPOLE:
                        Sprites.drawFlagpole(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.FLAG_TOP:
                        Sprites.drawFlagTop(ctx, sx, sy, TILE_SIZE);
                        break;
                    case TILE.HARD_BLOCK:
                        Sprites.drawHardBlock(ctx, sx, sy, TILE_SIZE);
                        break;
                }
            }
        }

        // Draw flag on the flagpole
        const flagScreenPos = camera.worldToScreen(FLAGPOLE_X * TILE_SIZE + TILE_SIZE / 2, 4 * TILE_SIZE);
        Sprites.drawFlag(ctx, flagScreenPos.x, flagScreenPos.y);
    },
};
