//TO DO:
//  xx add placeholder bgm and sfx
// add obstacles, see nathans
// add horizontal world
// do start scene
// add barrier breaking particles
// add broken barrer to new levels
// better game feel movement
// add start scene
//rotate obstacles in ran direction slowly at center
// add another thing to make gameplay more engaging, like an end 
//screen w dimension hop count, like individual level obstacles. I like the
// idea of a "laser" that goes in the non-scrolling direction, to cover player up/down vs left/right
// add collectible
// add pause

class Air extends Phaser.Scene {
    constructor() {
        super("airScene");
    }

    preload() {
    }

    create() {

        isFirstPlaythrough = false;
        
        this.a_warning = this.anims.create({
            key: 'a_warning',
            frames: this.anims.generateFrameNumbers('warning'),
            frameRate: 2,
            repeat: 999
        });

        this.bg_scroll_speed = -150 * global_speed * global_speed;

        //OBSTACLE ANIMATION
        this.a_air_obstacle = this.anims.create({
            key: 'a_air_obstacle',
            frames: this.anims.generateFrameNumbers('air_obstacle'),
            frameRate: 1,
            repeat: 999
        });

        this.a_meteor = this.anims.create({
            key: 'a_meteor',
            frames: this.anims.generateFrameNumbers('meteor'),
            frameRate: 1,
            repeat: 999
        });

        //WIDTH AND LENGTH OF FALLER SPRITE
        this.fallerOffsetX = 48;
        this.fallerOffsetY = 28;

        // //OBSTACLES
        obstacleWidth = 80;
        obstacleHeight = 80;

        //STAGE BOUNDS
        stageLeftBound = canvas_width / 4;
        stageRightBound = 3 * canvas_width / 4;
        stageUpperBound = 0;
        stageLowerBound = canvas_height - this.fallerOffsetY;

        //ANIMATION
        this.borderAnimation = this.anims.create({
            key: 'sway',
            frames: this.anims.generateFrameNumbers('border_air'),
            frameRate: 1, //i think this is how many frames per sec
            repeat: 999
        });

        this.border_1 = this.physics.add.sprite(stageLeftBound-obstacleWidth/4, canvas_height / 2, 'border_air');
        this.border_1.setVelocity(0, this.bg_scroll_speed/2);
        this.border_1.setDepth(8);
        this.border_1.play('sway');

        this.border_2 = this.physics.add.sprite(stageRightBound+obstacleWidth/4, canvas_height / 2, 'border_air');
        this.border_2.setVelocity(0, this.bg_scroll_speed/2);
        this.border_2.setDepth(8);
        this.border_2.play('sway');

        //MUSIC

        this.bgm = this.sound.add('bgm_air', bgmConfig);
        if (!levelMusicStarted) {
            this.bgm.play(); 
            levelMusicStarted = true;
        } 

        //SPEED MOD FOR ALL ENVIRONMENTAL OBJECTS
        this.speed_modifier = global_speed;

        //CONTROLS
        //see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/
        //and http://ex-artist.com/CMPM120/Phaser%203%20Rocket%20Patrol%20Tutorial.html
        //and https://phaser.io/examples/v2/display/game-background-color
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //STAGE-SPECIFIC MOVEMENT
        resistance_keyDOWN = 1.3;
        resistance_keyUP = 1.3;
        resistance_keyLEFT = 1.3;
        resistance_keyRIGHT = 1.3;

        //BACKGROUND
        this.side_box_1 = this.add.rectangle( 
            0, canvas_height / 2 , canvas_width / 2, canvas_height, 0xFFFFFF
        );
        this.side_box_1.setDepth(7);

        this.side_box_2 = this.add.rectangle( 
            canvas_width, canvas_height / 2 , canvas_width / 2, canvas_height, 0xFFFFFF
        );
        this.side_box_2.setDepth(7);

        //have bg_1 wrap, bg_2 keeps time
        this.bg_air_1 = this.physics.add.sprite(
            canvas_width / 2, canvas_height / 2, 'bg_air');
        this.bg_air_1.setVelocity(0, this.bg_scroll_speed);
            
        this.bg_air_2 = this.add.sprite(
            canvas_width / 2, canvas_height / 2, 'bg_air');
        this.bg_air_2.setDepth(-1);

        //BACKGROUND VARIABLE DEFINITIONS
        this.bg_air_1_amnt_looped = 0;
        this.bg_air_2_amnt_looped = 0;
        this.bg_loop_max = 2;

        //BARRIER
        this.barrierPlaced = false;
        this.barrierTouched = false;
        this.barrierSpeed = (3 * global_speed) / 2;
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
            
        //TRIMMING
        this.trimming_behind = this.add.image(canvas_width / 2, 50, 'trimming_behind');
        this.trimming_behind.setDepth(9);
        this.trimming_front = this.add.image(canvas_width / 2, canvas_height - 50, 'trimming_front');
        this.trimming_front.setScale(1, -1);
        this.trimming_front.setDepth(9);

        //PLAYER CHARACTER
        //Basically, the faller_instance is the sprite, faller_phys is the physics version,
        //faller_body is the physics body(the box around the sprite)
        //see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-body/#collision-bound
        this.faller_instance = new Faller(
            this, game.config.width/2 - this.fallerOffsetX/2,canvas_height/2, 'faller').setOrigin(0,0);

        //to change animation do https://www.phaser.io/examples/v2/animation/change-frame

        //turn faller into Dynmaic physics obj
        this.faller_phys = this.physics.add.existing(this.faller_instance, 0);
        this.faller_body = this.faller_phys.body;
        this.faller_body.setImmovable();
        this.faller_body.setCircle(14, 14, 0);
        //this sets the faller to be in front of everything else
        this.faller_instance.setDepth(6);

        this.isInvincible = false;

        //FALLER ANIMATIONS
        this.a_faller_default = this.anims.create({
            key: 'a_faller_default',
            frames: this.anims.generateFrameNumbers('faller_default'),
            frameRate: 4,
            repeat: 999
        });

        this.a_faller_hurt = this.anims.create({
            key: 'a_faller_hurt',
            frames: this.anims.generateFrameNumbers('faller_hurt'),
            frameRate: 4,
            repeat: 999
        });

        this.faller_instance.anims.play(this.a_faller_default);

        //REWIND
        this.a_rewind = this.anims.create({
            key: 'a_rewind',
            frames: this.anims.generateFrameNumbers('rewind'),
            frameRate: 30,
            repeat: 999
        });

        this.rewind = this.add.sprite(canvas_width / 2, canvas_height / 2,);
        this.rewind.setDepth(3);


        //PARTICLES
        this.player_particles = this.add.particles('flares');
        this.player_particles.setDepth(1);
        this.emitter = this.player_particles.createEmitter(
        {
                frame: 'blue',
                alpha: { start: 255, end: 0 },
                scale: { start: 0.5, end: 2.5 },
                //tint: { start: 0xff945e, end: 0xff945e },
                speed: { min: 200, max: 400},
                accelerationY: -400,
                angle: { min: -70, max: -110 },
                rotate: { min: -180, max: 180 },
                lifespan: { min: 1000, max: 1100 },
                blendMode: 'ADD',
                frequency: 11,
                maxParticles: 10,
                scale: { start: 0.6, end: 0, ease: 'Power3' },
                x: this.faller_instance.x,
                y: this.faller_instance.y,
                gravityY: -50,
                maxParticles: 0, //unlimited
        });

        //ENTRY EFFECTS
        //they are not persistent from scene to scene, hence written in create()
        if (shakeOnNextWorld == true) 
        {
            this.cameras.main.flash(700);
            this.cameras.main.shake(1000, 0.03, 0.00, 0, false); 
        }

        this.time.delayedCall(timeTillObstacles, () => { this.addObstacle(); });

        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });

        this.meteorToWarningIntervals = 2000 / global_speed;
        this.warningToHazardIntervals = 2000 / global_speed;

        this.time.delayedCall(timeTillObstacles, () => { this.addWarning(); });
        this.meteorGroup = this.add.group({
            runChildUpdate: true
        });

        //OTHER
        this.resetHit = false;
        this.resetHit_bg = false;
        this.deaccelerationLength = 60;
        this.barrierSpeedDeacceleration = this.barrierSpeed / this.deaccelerationLength;
        this.bg_scroll_speed_deacceleration = this.bg_scroll_speed / this.deaccelerationLength;
        this.deaccelerationFrame = 0;
    }

    addWarning() {
        if (!this.resetHit) {
            let warningAndMeteorX = Phaser.Math.Between(stageLeftBound + 40, stageRightBound - 40); 

            let warning = new Warning(this, warningAndMeteorX, stageUpperBound + 40,
                'warning');

            warning.setDepth(12);

            warning.anims.play(this.a_warning);

            this.time.delayedCall(this.warningToHazardIntervals, () => {
                this.addMeteor(warningAndMeteorX); 
            });
        }
    }

    addMeteor(meteorX) {
        if (!this.resetHit) {
            this.time.delayedCall(this.meteorToWarningIntervals, () => { 
                this.addWarning(); 
            });

            let meteor = new Meteor(this, meteorX, stageUpperBound - 40, 'meteor');

            let anim = this.a_meteor;
            meteor.anims.play(anim);
            this.meteorGroup.add(meteor);
        }
    }

    addObstacle() {
        //constructor(
        //scene, x_spawnFrom, y_spawnFrom, 
        //x_velocity, y_velocity, orientation, texture, frame)
        //see stage bounds

        
        let obstacle = new Obstacle(
            this, Phaser.Math.Between(stageLeftBound + 40, stageRightBound - 40),
            canvas_height+obstacleHeight, //or obstacle_height if horizontal stage
            0, this.barrierSpeed * 1.2, 1, false, 'air_obstacle', 27, 12.5, 10, true);

        //because when u destroy() the object it deletes the animation, apparently
        let obstacle_anim = this.a_air_obstacle;

        obstacle.anims.play(obstacle_anim);

        let spawnMirror = 1 + (Math.floor(Math.random() * 4));
        if (spawnMirror == 4 && Math.abs(obstacle.x - canvas_width/2) > 49) {
            let obstacleMirror = new Obstacle(
                this, stageLeftBound + Math.abs(obstacle.x - stageRightBound),
                canvas_height+obstacleHeight, //or obstacle_height if horizontal stage
                0, this.barrierSpeed * 1.2, 1, false, 'air_obstacle', 27, 12.5, 10, false);
            
            obstacleMirror.anims.play(obstacle_anim);

            this.obstacleGroup.add(obstacleMirror);
        }


        this.obstacleGroup.add(obstacle);
    }

    play_a_faller_default() {
        this.faller_instance.anims.play(this.a_faller_default);
    }

    play_a_faller_hurt() {
        this.faller_instance.anims.play(this.a_faller_hurt);
    }

    update() {

        this.physics.world.wrap(this.border_1,0);
        this.physics.world.wrap(this.border_2,0);
        this.physics.world.wrap(this.bg_air_1,0);

        if (this.resetHit && 
            (this.deaccelerationFrame < this.deaccelerationLength * 2) ) {
            //SLOW OBJECTS DOWN RAPIDLY
            this.bg_scroll_speed -= this.bg_scroll_speed_deacceleration;
            this.barrierSpeed -= this.barrierSpeedDeacceleration;
            this.deaccelerationFrame++;

            this.border_1.setVelocity(0, this.bg_scroll_speed/2);
            this.border_2.setVelocity(0, this.bg_scroll_speed/2);
            this.bg_air_1.setVelocity(0, this.bg_scroll_speed);

        }

        //PLAYER MOVEMENT
        if (!this.resetHit)
            this.faller_instance.update();
            
        //PLAYER PARTICLES FOLLOW
        this.emitter.setPosition(this.faller_instance.x + this.fallerOffsetX/2, this.faller_instance.y + this.fallerOffsetY/2);
        //HP CHANGES
        if (playerstats.currHP == 3) {
            this.emitter.setFrame("green");
        } 
        else if (playerstats.currHP == 2) {
            this.emitter.setFrame("yellow");
        } 
        else if (playerstats.currHP == 1) {
            this.emitter.setFrame("red");
        } 
        else {
            this.reset();
        }

        //BACKGROUND LOOP: If 1 of the 2 backgrounds fall off screen, put them back at start
        if (!this.resetHit_bg) {

            if (this.bg_air_2.y <= -(canvas_height / 2) ) 
            {
                this.bg_air_2.y = canvas_height * 1.5;
                this.bg_air_2_amnt_looped ++;

                //CONDITION: finished looping, place barrier and cover the background
                if (this.bg_air_2_amnt_looped == this.bg_loop_max)
                {
                    this.barrier.y = 2 * canvas_height; //canvas_height + barrier size
                    this.barrierPlaced = true;

                    this.box_below_barrier.y = this.barrier.y + canvas_height / 2;
                    this.box_below_barrier.setVisible(true);
                }
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
        this.bg_air_2.y -= 3 * global_speed;

        //PLAYER COLLISIONS
        if (this.barrierTouched == false)
        {
            this.physics.add.collider(this.faller_instance, this.barrier, this.worldSwap, null, this);
            this.barrierTouched = true;
        }
        
        //this.physics.add.collider(this.faller_instance, this.obstacleGroup, this.fallerCollidesObstacle, null, this);
    }

    fallerCollidesObstacle() {
        this.faller_instance.anims.play(this.a_faller_hurt);
    }

    fallerSetDefault() {
        this.faller_instance.anims.play(this.a_faller_default);
    }

    setInvincibility(bool) {
        this.isInvincible = bool;
    }

    worldSwap() {
        if (!this.resetHit)
        {
            this.barrierTouched = true;
            //ENTRY EFFECTS
            this.cameras.main.shake(200); // this at start of scene
            this.cameras.main.flash(0xFFFFFF, 500);        

            //AUDIO

            //PlAYER
            this.isInvincible = false;

            this.sound.play('barrierSmash', {volume: 0.2});
            shakeOnNextWorld = true;

            //DIFFICULTY SCALING
            //FIRST OBSTACLE'S SPAWN SCALING
            if (playerstats.currStagesComplete >= 1) 
            {    
                timeTillObstacles = 1000 / this.speed_modifier;
                playerstats.currStagesComplete++;
            } 
            else
            //first clear
            {
                timeTillObstacles = 1000 / this.speed_modifier;
                playerstats.currStagesComplete = 1;
            }

            if (global_speed <= global_speed_max) global_speed += global_speed_scaling;

            //MANAGE SCENE
            //see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/
            this.scene.stop("airScene");

            if (stageCycleDirection == 0) this.scene.start("waterScene");
            else this.scene.start("earthScene");
        }
    }

    reverseBgLoop() {
        this.resetHit_bg = true;
    }

    reset() {
        hasScore = 1;

        //pause animations
        this.rewind.anims.play(this.a_rewind);

        //this triggers all deacceleration slowdowns->stops
        this.resetHit = true;

        this.time.delayedCall(1000, () => { this.reverseBgLoop() });;


        //pause all moving objects and do like a screen freeze/rewind effect, and the player blips out
        this.bgm.stop();
        this.sound.stopAll();
        this.sound.play('sfx_rewind', {volume: 0.2});

        //kill particles
        this.player_particles.destroy();

        //fade to white
        this.cameras.main.fade(5000, 255, 255, 255);
        shakeOnNextWorld = false;
        timeTillObstacles = 2500;
        playerstats.currHP = 3;
        this.faller_body.setEnable(false);
        
        //go to menu for debug
        this.time.delayedCall(6000, () => { 
            this.scene.stop("airScene");
            this.scene.start("menuScene");
        });

        global_speed = global_speed_default;

    }
}