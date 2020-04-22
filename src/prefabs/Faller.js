class Faller extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        //describe the class' variables when constructed
        scene.add.existing(this); //add to existing scene, displayList, updateList

        this.isIncSpeed = false;
        this.isDecSpeed = false;

    }

    create() {

    }

    update() {
       
        //Controls
        if (keyLEFT.isDown) {
            this.x -= 5;
        }
        if (keyRIGHT.isDown) {
            this.x += 5;
        }
    }

    reset() {

    }
}