class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
        
    }

    preload() {
        this.load.spritesheet('faller_default', './assets/faller.png', {frameWidth: 48, frameHeight: 28});
        this.load.spritesheet('faller_hurt', './assets/faller_hurt.png', {frameWidth: 48, frameHeight: 28});

        this.load.image('bg_air', './assets/bg_air.png');
        this.load.image('bg_water', './assets/bg_water.png');


        this.load.image('barrier', './assets/barrier.png');
        this.load.image('barrier_broken', './assets/barrier_broken.png');
        this.load.spritesheet('border_air', './assets/border.png', {frameWidth: 60, frameHeight: 720}); 
        this.load.spritesheet('border_water', './assets/border_water.png', {frameWidth: 60, frameHeight: 720}); 

        this.load.spritesheet('rewind', './assets/rewind-Sheet.png', {frameWidth: 720, frameHeight: 720});

        
        this.load.image('trimming_behind', './assets/trimming_behind.png');
        this.load.image('trimming_front', './assets/trimming_front.png');


        this.load.spritesheet('air_obstacle', './assets/air_obstacle.png', {frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('water_obstacle', './assets/water_obstacle.png', {frameWidth: 80, frameHeight: 80});

        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        
        this.load.audio('bgm', './assets/editjo_techno.wav');
        this.load.audio('barrierSmash', './assets/explosion38.wav');
        this.load.audio('obstacleCollision', './assets/explosion38.wav');
        this.load.audio('sfx_rewind', './assets/sfx_rewind.wav');

    }

    create() {
        
        console.log("did boot scene");
        this.scene.start("menuScene");
    }
}