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
