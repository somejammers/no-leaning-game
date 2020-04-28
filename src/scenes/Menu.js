class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    }

    create() {
        

        this.test = 4;
        this.add.text(20, 20, "Rocket Patrol Play");
        console.log("did Menu scene");
        this.scene.start("airScene");
        console.log("in play");
    }
}

