class Faller extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); //sends data given into Phaser.GameObjects.Sprite, which is a js file
        //describe the class' variables when constructed
        scene.add.existing(this); //add to existing scene, displayList, updateList

        this.isIncSpeed = false;
        this.isDecSpeed = false;
        this.isInvincible = false;

    }

    preload() {

    }

    create() {
        
    }

    update() {
       
        //Controls
        if ((keyLEFT.isDown || keyA.isDown) && this.x > stageLeftBound) {
            this.x -= 4 * Math.sqrt(global_speed)/ resistance_keyLEFT;
        }
        if ((keyRIGHT.isDown || keyD.isDown) && this.x < stageRightBound - this.scene.fallerOffsetX) {
            this.x += 4 * Math.sqrt(global_speed) / resistance_keyRIGHT;
        }
        if ((keyUP.isDown || keyW.isDown) && this.y > stageUpperBound) {
            this.y -= 4 * Math.sqrt(global_speed)/ resistance_keyUP;
        }
        if ((keyDOWN.isDown || keyS.isDown) && this.y < stageLowerBound - this.scene.fallerOffsetY) {
            this.y += 4 * Math.sqrt(global_speed)/ resistance_keyDOWN;
        }
    }

    reset() {

    }
}