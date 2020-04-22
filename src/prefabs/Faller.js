class Faller extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        //describe the class' variables when constructed

        this.isIncSpeed = false;
        this.isDecSpeed = false;

    }
}