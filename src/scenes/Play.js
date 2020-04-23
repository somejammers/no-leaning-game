//TO DO:
//efficient way of setting timer, and updating background without checking every frame
//add bounds to sides of stages

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
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
        this.barrier = this.add.sprite(
            canvas_width / 2, 1200, 'barrier'); //put off screen for now
        this.barrier.setDepth(2);

        //WHITE BOXES: for covering other objects
        this.box_below_barrier = this.add.rectangle(
            canvas_width / 2, 1200, canvas_width / 2, canvas_height, 0xFFFFFF
        );
        this.box_below_barrier.setDepth(1);
        this.box_below_barrier.setVisible(false);

        //SPEED MOD FOR ALL ENVIRONMENTAL OBJECTS
        this.speed_modifier = 1;
            
        //PLAYER CHARACTER
        this.faller_instance = new Faller(
            this, game.config.width/2, 431, 'faller').setOrigin(0,0);
        //this sets the faller to be in front of everything else
        this.faller_instance.setDepth(3);

        
        //this.bg_deck = new Array();
        //initialize deck https://stackoverflow.com/questions/15742442/declaring-array-of-objects
        //when a bg reaches canvas_height, pop one and put it right below the last, and setdepth 1
        // for(let i=0; i<bg_count; i++) {
        //     this.bg_deck.push( this.add.sprite(canvas_width / 2, canvas_height / 2, 'bg_air') );
        // }
        // this.topBG = this.bg_deck.pop();
        // this.frameCounter = 0;


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

                //CONDITION: finished looping, place barrier
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


    }
}