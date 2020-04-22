// https://aithehuman.github.io/sicksite/rocket.html
let canvas_width = 720;
let canvas_height = 720;

let config = {
    type: Phaser.CANVAS,
    width: canvas_width,
    height: canvas_height,
    physics: {
        default: 'arcade'
    },
    scene: [ Menu, Play ], //array, order matters
};

let game = new Phaser.Game(config);

// define game settings

//reserve some keyboard variables
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
let resistance_keyDOWN, resistance_keyUP, 
    resistance_keyLEFT, resistance_keyRIGHT;

let stageLeftBound, stageRightBound, stageUpperBound, stageLowerBound;

let playerstats = new PlayerStats();

let faller_x_on_barrier, faller_y_on_barrier;