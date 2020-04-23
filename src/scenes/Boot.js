class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
        
    }

    preload() {
        this.load.image('faller', './assets/faller.png');
        this.load.image('bg_air', './assets/bg_air.png');
        this.load.image('barrier', './assets/barrier.png');

        this.load.audio('bgm', './assets/editjo_techno.wav');
        this.load.audio('barrierSmash', './assets/explosion38.wav');
    }

    create() {
        
        console.log("did boot scene");
        this.scene.start("menuScene");
    }
}