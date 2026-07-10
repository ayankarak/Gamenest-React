export const CANVAS_WIDTH = 700;
export const CANVAS_HEIGHT = 500;

export const BIRD_X = 150;
export const BIRD_RADIUS = 18;

export const GRAVITY = 0.45;
export const JUMP_FORCE = -8;

export const PIPE_WIDTH = 70;
export const PIPE_GAP = 170;
export const PIPE_SPEED = 3;

export const PIPE_INTERVAL = 1800;

export const GROUND_HEIGHT = 0;
export const INITIAL_PIPE_SPEED = 3;

export const MAX_PIPE_SPEED = 12;
// ----------------------------
// Difficulty Settings
// ----------------------------

export const DIFFICULTY_SETTINGS = {

    easy: {

        baseSpeed: 3,

        increase: 0.5,

        maxSpeed: 5,

        scoreStep: 10

    },

    medium: {

        baseSpeed: 3,

        increase: 1,

        maxSpeed: 8,

        scoreStep: 10

    },

    hard: {

        baseSpeed: 3,

        increase: 2,

        maxSpeed: 12,

        scoreStep: 10

    }

};