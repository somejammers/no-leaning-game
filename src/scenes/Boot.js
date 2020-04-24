class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
        
    }

    preload() {
        this.load.image('faller', './assets/faller.png');
        this.load.image('bg_air', './assets/bg_air.png');
        this.load.image('barrier', './assets/barrier.png');
        this.load.image('barrier_broken', './assets/barrier_broken.png');

        this.load.image('air_obstacle', './assets/air_obstacle.ping');
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        
        this.load.audio('bgm', './assets/editjo_techno.wav');
        this.load.audio('barrierSmash', './assets/explosion38.wav');
        this.load.audio('obstacleCollision', './assets/explosion38.wav');

    }

    create() {
        
        console.log("did boot scene");
        this.scene.start("menuScene");
    }
}