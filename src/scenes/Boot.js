class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
        
    }

    preload() {
        this.load.spritesheet('faller', './assets/faller.png', {frameWidth: 48, frameHeight: 28});
        this.load.image('bg_air', './assets/bg_air.png');
        this.load.image('barrier', './assets/barrier.png');
        this.load.image('barrier_broken', './assets/barrier_broken.png');
        this.load.spritesheet('border_air', './assets/border.png', 
        {frameWidth: 60, frameHeight: 720}); 
        this.load.image('trimming_behind', './assets/trimming_behind.png');
        this.load.image('trimming_front', './assets/trimming_front.png');


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