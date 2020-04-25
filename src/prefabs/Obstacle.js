class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene, x_spawnFrom, y_spawnFrom, 
        x_velocity, y_velocity, orientation, texture, frame
        ) {
        // call Phaser Physics Sprite constructor
        super(scene, x_spawnFrom, y_spawnFrom, texture, frame);

        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body

        this.phys_body = this.body;

        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();

        this.setScale(2,2);
        this.setCircle(15, 0.5, 0);

        this.newObstacle = true;
        this.rotationAngle = (Math.random() * 0.1) - 0.05;
        
        //The switch() is to prevent this obstacle from overlapping with the barrier
        //orientation: 1 = player falling down, 2 = player falling up
        //             3 = player falling left, 4 = player falling right
        switch(orientation) {
            case 1:
                if (this.y >= scene.barrier.y) this.destroy();
                break;
            case 2: 
                if (this.y <= scene.barrier.y) this.destroy();
                break;
            case 3: 
                if (this.y <= scene.barrier.x) this.destroy();
                break;
            case 4: 
                if (this.y <= scene.barrier.x) this.destroy();
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
            this.deaccelerationFrame < this.scene.deaccelerationLength) {
            this.tt++;
            console.log(this.tt);
            this.x_velocity -= this.deacceleration_x;
            this.y_velocity -= this.deacceleration_y;
            this.rotationAngle -= this.deacceleration_rotation;
            this.deaccelerationFrame++;
                
        }

        this.x += this.x_velocity * this.scene.speed_modifier;
        this.y -= this.y_velocity * this.scene.speed_modifier;
        

        if(this.newObstacle &&
             (this.y < (canvas_height / 2 ) / this.scene.speed_modifier) ) 
        {
            console.log("test");
            this.newObstacle = false;
            this.scene.addObstacle();
        }

        this.rotation += this.rotationAngle;
        
        //this can do a function from the scene or here
        this.scene.physics.add.overlap(this, this.scene.faller_instance, this.explode, null, this);
        
    }



    explode() {
        //do animation of being destroyed here
        this.scene.sound.play('obstacleCollision', {volume: 0.2});

        this.phys_body.enable = false;
        this.visible = false;
        playerstats.currHP--;
        console.log(playerstats.currHP);
    }
}