//TO DO:
// add flash to worldSwap()
// add placeholder bgm and sfx
// add horizontal world
// add worldSwap() functionality
// add obstacles
// do start scene


class Air extends Phaser.Scene {
    constructor() {
        super("airScene");
    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
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
        stageRightBound = 3 * canvas_width / 4;
        stageUpperBound = 0;
        stageLowerBound = canvas_height;

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
        this.barrier = this.physics.add.sprite(canvas_width / 2, 1500, 'barrier'); //put off screen for now
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

        //SPEED MOD FOR ALL ENVIRONMENTAL OBJECTS
        this.speed_modifier = 1;
            
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

                    this.box_below_barrier.y = this.barrier.y + canvas_height / 2;
                    this.box_below_barrier.setVisible(true);
                }
        }

        //BARRIER MOVEMENT
        if (this.barrierPlaced) 
        {
            this.barrier.y -= this.bg_scroll_speed * this.speed_modifier / 2;
            this.box_below_barrier.y -= this.bg_scroll_speed * this.speed_modifier / 2;
        }
        
        //Update Background
        //this.bg_air.tilePositionY += 5;
        this.bg_air_1.y -= this.bg_scroll_speed * this.speed_modifier;
        this.bg_air_2.y -= this.bg_scroll_speed * this.speed_modifier;

        //PLAYER COLLISIONS
        this.physics.add.overlap(this.faller_instance, this.barrier, this.worldSwap, null, this);
    }

    worldSwap() {
        this.scene.start("airScene");
    }
}