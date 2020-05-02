class Geyser extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene, x_spawnFrom, y_spawnFrom, 
        orientation, frame
        ) {
        // call Phaser Physics Sprite constructor
        super(scene, x_spawnFrom, y_spawnFrom, frame);

        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body

        this.phys_body = this.body;
        this.orientation = orientation;

        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();
        
        //The switch() is to prevent this obstacle from overlapping with the barrier
        //orientation: 1 = player falling down, 2 = player falling up
        //             3 = player falling left, 4 = player falling right
    }

    update() {
        super.update();
        
        //this can do a function from the scene or here
        this.scene.physics.add.overlap(this, this.scene.faller_instance, this.explode, null, this);
        
    }



    explode() {
        //do animation of being destroyed here
        if (!this.scene.isInvincible) 
        {    
            this.scene.isInvincible = true;

            this.scene.cameras.main.shake(100, 0.01, 0.00, 0, false);

            this.scene.sound.play('obstacleCollision', {volume: 0.2});
            this.phys_body.enable = false;
            this.visible = false;
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