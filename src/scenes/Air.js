//TO DO:
//  xx add placeholder bgm and sfx
// add obstacles, see nathans
// add horizontal world
// do start scene
// add the distance/speed mechanic
// add barrier breaking particles
// add broken barrer to new levels
//better game feel movement
// add start scene

class Air extends Phaser.Scene {
    constructor() {
        super("airScene");
    }

    preload() {
     //MUSIC
        this.bgm = this.sound.add('bgm', bgmConfig);
        this.bgm.play();   
    }

    create() {
        //SPEED MOD FOR ALL ENVIRONMENTAL OBJECTS
        this.speed_modifier = 1;

        //CONTROLS
        //see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/
        //and http://ex-artist.com/CMPM120/Phaser%203%20Rocket%20Patrol%20Tutorial.html
        //and https://phaser.io/examples/v2/display/game-background-color
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //STAGE-SPECIFIC MOVEMENT
        resistance_keyDOWN = 1;
        resistance_keyUP = 1;
        resistance_keyLEFT = 1;
        resistance_keyRIGHT = 1;

        //STAGE BOUNDS DO TIHS
        stageLeftBound = canvas_width / 4;
        stageRightBound = 3 * canvas_width / 4 - 35;
        stageUpperBound = 0;
        stageLowerBound = canvas_height - 20;

        //BACKGROUND
        //this rectangle is for debugging
        this.add.rectangle( 
            canvas_width / 2, canvas_height / 2, canvas_width / 2, -canvas_height, 0x000000
            );

        //have two backgrounds that loop finitely, rather than endlessly scroll using tileSprite
        this.bg_air_1 = this.add.sprite(
            canvas_width / 2, -(canvas_height / 2), 'bg_air');
        this.bg_air_2 = this.add.sprite(
            canvas_width / 2, canvas_height / 2, 'bg_air');

        //BACKGROUND VARIABLE DEFINITIONS
        this.bg_air_1_amnt_looped = 0;
        this.bg_air_2_amnt_looped = 0;
        this.bg_loop_max = 1;
        this.bg_scroll_speed = 3;

        //BARRIER
        this.barrierPlaced = false;
        this.barrierTouched = false;
        this.barrierSpeed = this.bg_scroll_speed * this.speed_modifier / 2;
        this.barrier = this.physics.add.sprite(canvas_width / 2, 1800, 'barrier'); //put off screen for now
        this.barrier.setDepth(2);
        //make barrier physics body
        //see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-world/
        //and https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-body/#collision-bound
        //and https://github.com/nathanaltice/MovementStudies/blob/master/scenes/Runner.js
        this.barrier_body = this.barrier.body;
        //this.barrier_body.setEnable();
        //WHITE BOXES: for covering other objects
        this.box_below_barrier = this.add.rectangle(
            canvas_width / 2, 1200, canvas_width / 2, canvas_height, 0xFFFFFF
        );
        this.box_below_barrier.setDepth(1);
        this.box_below_barrier.setVisible(false);
            
        //PLAYER CHARACTER
        //Basically, the faller_instance is the sprite, faller_phys is the physics version,
        //faller_body is the physics body(the box around the sprite)
        //see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-body/#collision-bound
        this.faller_instance = new Faller(
            this, game.config.width/2, 431, 'faller').setOrigin(0,0);

        //turn faller into Dynmaic physics obj
        this.faller_phys = this.physics.add.existing(this.faller_instance, 0);
        this.faller_body = this.faller_phys.body;
        this.faller_body.setImmovable();
        //this sets the faller to be in front of everything else
        this.faller_instance.setDepth(3);

        this.isInvincible = false;

        //ENTRY EFFECTS
        //they are not persistent from scene to scene, hence written in create()
        if (shakeOnNextWorld == true) 
        {
            this.cameras.main.flash(700);
            this.cameras.main.shake(1000, 0.03, 0.00, 0, false); 
        }

        this.time.delayedCall(timeTillObstacles, () => { this.addObstacle(); });

        // //OBSTACLES
        obstacleWidth = 0;
        obstacleHeight = 0;

        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });
    }

    addObstacle() {
        //constructor(
        //scene, x_spawnFrom, y_spawnFrom, 
        //x_velocity, y_velocity, orientation, texture, frame)
        //see stage bounds
        console.log("obstacle spawned");

        let obstacle = new Obstacle(
            this, Phaser.Math.Between(stageLeftBound, stageRightBound),
            canvas_height, //or obstacle_height if horizontal stage
            0, this.barrierSpeed, 1, 'air_obstacle');
        this.obstacleGroup.add(obstacle);
    }

    update() {
        
        //PLAYER MOVEMENT
        this.faller_instance.update();

        //BACKGROUND LOOP: If 1 of the 2 backgrounds fall off screen, put them back at start
        if (this.bg_air_1.y == -(canvas_height / 2) ) 
            {

                this.bg_air_1.y = canvas_height * 1.5;
                this.bg_air_1_amnt_looped += 1;
        }

        if (this.bg_air_2.y == -(canvas_height / 2) ) 
            {
                this.bg_air_2.y = canvas_height * 1.5;
                this.bg_air_2_amnt_looped ++;

                //CONDITION: finished looping, place barrier and cover the background
                if (this.bg_air_2_amnt_looped == this.bg_loop_max)
                {
                    this.barrier.y = 2 * canvas_height; //canvas_height + barrier size
                    this.barrierPlaced = true;
                    console.log("barrier placed");


                    this.box_below_barrier.y = this.barrier.y + canvas_height / 2;
                    this.box_below_barrier.setVisible(true);
                }
        }

        //BARRIER MOVEMENT
        if (this.barrierPlaced) 
        {
            this.barrier.y -= this.barrierSpeed;
            this.box_below_barrier.y -= this.barrierSpeed;
        }
        
        //Update Background
        //this.bg_air.tilePositionY += 5;
        this.bg_air_1.y -= this.bg_scroll_speed * this.speed_modifier;
        this.bg_air_2.y -= this.bg_scroll_speed * this.speed_modifier;

        //PLAYER COLLISIONS
        if (this.barrierTouched == false)
        {
            this.physics.add.overlap(this.faller_instance, this.barrier, this.worldSwap, null, this);
            this.barrierTouched = true;
        }
        
        if (this.faller_instance.isInvincible == false)
        { 
            this.physics.add.overlap(this.faller_instance, this.obstacleGroup, this.fallerCollidesObstacle, null, this);     
            
        }
    }

    fallerCollidesObstacle() {
        this.cameras.main.shake(100, 0.01, 0.00, 0, false); 

        this.setInvincibility(true);

        //play animation here of flickering fallre
        this.time.delayedCall(1000, () => { this.setInvincibility(false); });

    }

    setInvincibility(bool) {
        this.faller_instance.isInvincible = bool;
    }

    worldSwap() {
        console.log("world swapped");
        this.barrierTouched = true;
        //ENTRY EFFECTS
        this.cameras.main.shake(200); // this at start of scene
        //this.cameras.main.flash(0xFFFFFF, 500);
        
        //AUDIO
        this.bgm.stop();
        this.sound.play('barrierSmash', {volume: 0.2});
        shakeOnNextWorld = true;

        //FIRST OBSTACLE'S SPAWN SCALING
        if (playerstats.currStagesComplete >= 1) 
        {    
            timeTillObstacles = 1000 / playerstats.currStagesComplete * this.speed_modifier;
            playerstats.currStagesComplete++;
        } 
        else
        //first clear
        {
            timeTillObstacles = 1000 / this.speed_modifier;
            playerstats.currStagesComplete = 1;
        }

        //MANAGE SCENE
        //see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/
        this.scene.stop("airScene");
        //even though this scene stops, worldSwap() is still carried out
        //later order this better to make it more seamless
        this.scene.start("airScene");
        // change to this.scene.start("fireScene");
        //change to this.scene.stop("airScene"); later
    }

    reset() {
        shakeOnNextWorld = false;
        timeTillObstacles = 2500;
        playerstats.currStagesComplete = 0;
    }
}