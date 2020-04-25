// https://aithehuman.github.io/sicksite/rocket.html
let canvas_width = 720;
let canvas_height = 720;

let physicsConfig = {
    default: 'arcade',
    arcade: {
        debug: true
    }
}

//SOUND CONFIG
let bgmConfig = {
    volume: 0.7,
    loop: true,
}

let config = {
    type: Phaser.CANVAS,
    width: canvas_width,
    height: canvas_height,
    physics: physicsConfig,
    transparent: true, //removes black background
    scene: [ Boot, Menu, Air ], //array, order matters
};

let game = new Phaser.Game(config);
let playerstats = new PlayerStats();
// define game settings

//reserve some keyboard variables
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
let resistance_keyDOWN, resistance_keyUP, 
    resistance_keyLEFT, resistance_keyRIGHT;
let stageLeftBound, stageRightBound, stageUpperBound, stageLowerBound;
let faller_x_on_barrier, faller_y_on_barrier;
let playAirOnBoot = true;
let shakeOnNextWorld = false;
let bgmAir;
let timeTillObstacles = 2500, obstacleWidth, obstacleHeight;
let global_speed = 0.9;
