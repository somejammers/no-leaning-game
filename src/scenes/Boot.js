class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
        
    }

    preload() {
        this.load.image('loading', './assets/loading.png');
    }

    create() {

        this.add.image(canvas_width/2, canvas_height/2, 'loading');

        this.scene.start("menuScene");
    }

    test() {
    }
}