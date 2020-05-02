class Geyser extends Phaser.Physics.Arcade.Sprite {
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

        this.movingIn = true;
        this.movingNot = false;
        this.movingOut = false;

        this.timeIntervals = 1000 / global_speed;
        this.distanceMoved = 560;
        this.distanceMovedPerTime = this.distanceMoved * global_speed / 60; //divided by how long in seconds each phase lasts

        //for 1s geyser moves in, 2s stays in place, 1s moves out
        this.scene.time.delayedCall(this.timeIntervals, () => 
        {
            this.movingIn = false;
            this.movingNot = true;
            this.scene.time.delayedCall(this.timeIntervals * 2, () => 
            {
                this.movingNot = false;
                this.movingOut = true;
                this.scene.time.delayedCall(this.timeIntervals, () => 
                {
                    this.destroy();
                });
            });
        });
    }

    update() {
        super.update();
        
        if (this.movingIn) {    
            if(this.orientation == 0)
                this.x += this.distanceMovedPerTime;
            else   
                this.x -= this.distanceMovedPerTime;
        }

        if (this.movingOut) {    
            if(this.orientation == 0)
                this.x -= this.distanceMovedPerTime;
            else   
                this.x += this.distanceMovedPerTime;
        }

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