class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        this.load.image('faller', './assets/faller.png');

        this.load.image('bg_air', './assets/bg_air.png');
        this.load.image('barrier', './assets/barrier.png');

    }

    create() {
        

        this.test = 4;
        this.add.text(20, 20, "Rocket Patrol Play");
        console.log("did Menu scene");
        this.scene.start("playScene");
        console.log("in play");
    }
}