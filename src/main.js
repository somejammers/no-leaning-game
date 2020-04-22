// https://aithehuman.github.io/sicksite/rocket.html
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480, //I ran python -m SimpleHTTPServer
    scene: [ Menu, Play     ], //array, order matters
    "transparent": true,
};

let game = new Phaser.Game(config);

// define game settings
game.settings = {
}

//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;