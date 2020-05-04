class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene, x_spawnFrom, y_spawnFrom, 
        x_velocity, y_velocity, orientation, rotating, texture, circleSize, circleX, circleY, newObstacle, frame
        ) {
        // call Phaser Physics Sprite constructor
        super(scene, x_spawnFrom, y_spawnFrom, texture, frame);

        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body

        this.phys_body = this.body;
        this.orientation = orientation;

        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();
        this.setCircle(circleSize, circleX, circleY);
        this.toDestroy = false;

        this.newObstacle = newObstacle;
        this.isRotating = rotating;
        this.rotationAngle = (Math.random() * 0.1) - 0.05;
        
        //The switch() is to prevent this obstacle from overlapping with the barrier
        //orientation: 1 = player falling down, 2 = player falling up
        //             3 = player falling left, 4 = player falling right
        switch(orientation) {
            case 1:
                if (this.y >= this.scene.barrier.y) {
                    this.x_velocity = 0;
                    this.y_velocity = 0;
                    this.visible = false;
                    this.enable = false;
                }
                break;
            case 2: 
                if (this.y <= this.scene.barrier.y) {
                    this.x_velocity = 0;
                    this.y_velocity = 0;
                    this.visible = false;
                    this.enable = false;
                }
                break;
            case 3: 
                if (this.x <= this.scene.barrier.x) {
                    this.x_velocity = 0;
                    this.y_velocity = 0;
                    this.visible = false;
                    this.enable = false;
                }
                break;
            case 4: 
                if (this.x >= this.scene.barrier.x) {
                    this.x_velocity = 0;
                    this.y_velocity = 0;
                    this.visible = false;
                    this.enable = false;
                }
                break;
            default:
                console.log("The coder made a mistake.");
        }

        this.deacceleration_x = this.x_velocity / scene.deaccelerationLength;
        this.deacceleration_y = this.y_velocity / scene.deaccelerationLength;
        this.deacceleration_rotation = this.rotationAngle / scene.deaccelerationLength;
        this.deaccelerationFrame = 0;
        this.tt = 0;
    }

    update() {
        super.update();

        if (this.scene.resetHit && 
            this.deaccelerationFrame < this.scene.deaccelerationLength * 2) {
            this.tt++;
            this.x_velocity -= this.deacceleration_x;
            this.y_velocity -= this.deacceleration_y;
            this.rotationAngle -= this.deacceleration_rotation;
            this.deaccelerationFrame++;
                
        }

        this.x -= this.x_velocity * this.scene.speed_modifier;
        this.y -= this.y_velocity * this.scene.speed_modifier;
        

        if (this.newObstacle) {

            if (this.orientation == 1 && this.y < (canvas_height / 2 ) + 60*this.scene.speed_modifier)
            {
                this.newObstacle = false;
                this.scene.addObstacle();
                if (this.y < 0 + 80) this.toDestroy = true;
            } 
            else if (this.orientation == 2 && this.y > (canvas_height / 2 ) - 60*this.scene.speed_modifier) 
            {
                this.newObstacle = false;
                this.scene.addObstacle();
                if (this.y > canvas_height + 80) this.toDestroy = true;
            }
            else if (this.orientation == 3 && this.x > (canvas_width / 2 ) - 60*this.scene.speed_modifier) 
            {
                this.newObstacle = false;
                this.scene.addObstacle();
                if (this.x > canvas_width + 80) this.toDestroy = true;
            }
            else if (this.orientation == 4 && this.x < (canvas_width / 2 ) + 60*this.scene.speed_modifier)
            {
                this.newObstacle = false;
                this.scene.addObstacle();
                if (this.x < 0 - 80) this.toDestroy = true;

            }
        }

        if(this.isRotating)
            this.rotation += this.rotationAngle;
        
        //this can do a function from the scene or here
        this.scene.physics.add.overlap(this, this.scene.faller_instance, this.explode, null, this);
        
        if (this.toDestroy == true) this.destroy();
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