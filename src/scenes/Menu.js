class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        
        
    }

    create() {
        

        this.add.text(20, 20, "Rocket Patrol Play");
        console.log("did Menu scene");
        this.scene.start("playScene");
        console.log("in play");
    }
}