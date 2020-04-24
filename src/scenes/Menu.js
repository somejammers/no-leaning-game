class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
        this.load.image('faller', './assets/faller.png');
        this.load.image('hp_bar_3', './assets/hp_bar_3.png');
        this.load.image('hp_bar_2', './assets/hp_bar_2.png');
        this.load.image('hp_bar_1', './assets/hp_bar_1.png');
        this.load.image('hp_bar_0', './assets/hp_bar_0.png');

        this.load.image('bg_air', './assets/bg_air.png');
        this.load.image('barrier', './assets/barrier.png');
        

        this.load.audio('bgm', './assets/editjo_techno.wav');

    }

    create() {
        

        this.test = 4;
        this.add.text(20, 20, "Rocket Patrol Play");
        console.log("did Menu scene");
        this.scene.start("airScene");
        console.log("in play");
    }
}