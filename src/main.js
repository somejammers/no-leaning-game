//NO LEANING!!!
//A game by Ari Iramanesh, Aurelia Swift, and Simone Barie
//completed 5/3/2020

//Create tilt
// This game twists the endless runner genre by randomly changing the orientation of player
// movement as you fall through differently themed worlds
//We wanted to make something different then just having a character run from left to right!


//Visual style
//All visual art assets were created by members of the team. We tried to have a basic cartoony style for our game :)
//the sound effects and background music were taken from free use websites looperman.com and EpidemicSound.com
    // The main background music is "Free Tonight by Xack"


// https://aithehuman.github.io/sicksite/rocket.html
let canvas_width = 720;
let canvas_height = 720;

let physicsConfig = {
    default: 'arcade',
    arcade: {
        debug: false, //true if u wanna show bounding boxes
        fps: 60
    }
}

//SOUND CONFIG
let bgmConfig = {
    volume: 0.5,
    loop: true,
}

let config = {
    type: Phaser.CANVAS,
    width: canvas_width,
    height: canvas_height,
    physics: physicsConfig,
    transparent: true, //removes black background
    scene: [ Boot, Menu, Air, Water, Fire, Earth], //array, order matters
};

let game = new Phaser.Game(config);
let playerstats = new PlayerStats();
// define game settings

//reserve some keyboard variables
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
let keyA, keyD, keyW, keyS;

let resistance_keyDOWN, resistance_keyUP, 
    resistance_keyLEFT, resistance_keyRIGHT;

let global_speed = 1.1, global_speed_default = 1, global_speed_scaling = 0.11, global_speed_max = 2.3
let stageLeftBound, stageRightBound, stageUpperBound, stageLowerBound;

let faller_x_on_barrier, faller_y_on_barrier;
let playAirOnBoot = true;
let shakeOnNextWorld = false;
let timeTillObstacles = 2500, obstacleWidth, obstacleHeight;
let playerLeftBound, playerRightBound, playerUpperBoumd, playerLowerBound;

let stageCycleDirection = 0; //0 is clockwise, 1 counterclockwise
                             // Clockwise: Air->Water->Fire->Earth

let hasScore = 0;
let levelMusicStarted = false;
let isFirstPlaythrough = true;