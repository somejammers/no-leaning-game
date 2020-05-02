class Warning_Vertical extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene, x_spawnFrom, y_spawnFrom, 
        orientation, texture, frame
        ) {
        // call Phaser Physics Sprite constructor
        super(scene, x_spawnFrom, y_spawnFrom, texture, frame);

        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body

        this.phys_body = this.body;

        // 0 is geyser positioned on left bound
        this.orientation = orientation;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();
        
        //for 1s geyser moves in, 2s stays in place, 1s moves out
        this.scene.time.delayedCall(this.scene.warningToGeyserIntervals, () => 
        {
            this.destroy();
        });
    }

    update() {
        super.update();
    }



    explode() {
        //do animation of being destroyed here
        if (!this.scene.isInvincible) 
        {    
            this.scene.isInvincible = true;

            this.scene.cameras.main.shake(100, 0.01, 0.00, 0, false);

            this.scene.sound.play('obstacleCollision', {volume: 0.2});
            playerstats.currHP--;

            this.scene.fallerCollidesObstacle();

            this.scene.time.delayedCall(1000, () => { this.disableInvincibility(false); });

        }
    }

    disableInvincibility(bool) {
        this.scene.isInvincible = bool;
        this.scene.fallerSetDefault();
    }

}