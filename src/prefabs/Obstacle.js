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
        this.newObstacle = true;
        
        //The switch() is to prevent this obstacle from overlapping with the barrier
        //orientation: 1 = player falling down, 2 = player falling up
        //             3 = player falling left, 4 = player falling right
        switch(orientation) {
            case 1:
                if (this.y >= this.scene.barrier.y) this.destroy();
                break;
            case 2: 
                if (this.y <= this.scene.barrier.y) this.destroy();
                break;
            case 3: 
                if (this.y <= this.scene.barrier.x) this.destroy();
                break;
            case 4: 
                if (this.y <= this.scene.barrier.x) this.destroy();
                break;
            default:
                console.log("The coder made a mistake.");
        }
    }

    update() {
        super.update();

        this.x += this.x_velocity;
        this.y -= this.y_velocity;

        if(this.newObstacle && this.y < canvas_height / 2) {
            console.log("test");
            this.newObstacle = false;
            this.scene.addObstacle();
        }
        
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