class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
        
    }

    preload() {
    }

    create() {
        
        console.log("did boot scene");
        this.scene.start("menuScene");
    }
}