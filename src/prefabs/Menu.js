class Meteor extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene, x_spawnFrom, y_spawnFrom, texture, frame
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
        
        let posOrNeg = Math.random() < 0.5? -1 : 1;
        this.velocityX = posOrNeg * (2 + Math.random() * 2 * Math.sqrt(global_speed));
        this.velocityY = this.scene.barrierSpeed * 1.2 * Math.sqrt(global_speed);
        
        this.isRotating = rotating;
        this.rotationAngle = (Math.random() * 0.1) - 0.05;

        this.timeIntervals = 1000 / global_speed;
        this.distanceMoved = 550;
        this.distanceMovedPerTime = this.distanceMoved * global_speed / 60; //divided by how long in seconds each phase lasts

        //for 1s geyser moves in, 2s stays in place, 1s moves out
        
    }

    update() {
        super.update();
        
        if (this.x <= stageLeftBound) {            
            this.velocityX = -this.velocityX;

        }
        else if(this.x >= stageRightBound) {
            this.velocityX = -this.velocityX;
        } 

        this.x += this.velocityX;
        this.y += this.velocityY;

        //this can do a function from the scene or here
        this.scene.physics.add.overlap(this, this.scene.faller_instance, this.explode, null, this);
        
        this.rotation += this.rotationAngle;
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