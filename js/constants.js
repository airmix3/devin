// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const TILE_SIZE = 40;
const GRAVITY = 0.6;
const MAX_FALL_SPEED = 12;
const PLAYER_WALK_SPEED = 3.5;
const PLAYER_RUN_SPEED = 5.5;
const PLAYER_JUMP_FORCE = -11;
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 40;
const ENEMY_SPEED = 1.2;
const COIN_SCORE = 100;
const ENEMY_SCORE = 200;
const BLOCK_SCORE = 50;
const STARTING_LIVES = 3;
const INVINCIBLE_DURATION = 120;
const ANIMATION_SPEED = 8;
const FLAGPOLE_X = 198;

// Tile types
const TILE = {
    EMPTY: 0,
    GROUND: 1,
    BRICK: 2,
    QUESTION: 3,
    USED_BLOCK: 4,
    PIPE_TOP_LEFT: 5,
    PIPE_TOP_RIGHT: 6,
    PIPE_BODY_LEFT: 7,
    PIPE_BODY_RIGHT: 8,
    FLAGPOLE: 9,
    FLAG_TOP: 10,
    HARD_BLOCK: 11,
    CLOUD: 12,
    BUSH: 13,
    HILL: 14,
};

// Entity types
const ENTITY = {
    GOOMBA: 'goomba',
    KOOPA: 'koopa',
    COIN: 'coin',
    MUSHROOM: 'mushroom',
    STAR: 'star',
};

// Game states
const STATE = {
    MENU: 'menu',
    PLAYING: 'playing',
    DEAD: 'dead',
    GAME_OVER: 'gameover',
    WIN: 'win',
    PAUSED: 'paused',
};
