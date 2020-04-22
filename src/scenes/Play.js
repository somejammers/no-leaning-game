//TO DO:
//efficient way of setting timer, and updating background without checking every frame

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('faller', './assets/faller.png');
        this.load.image('bg_air', './assets/bg_air.png');
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
        
        //BACKGROUND
        this.add.rectangle( 
            canvas_width / 2, canvas_height / 2, canvas_width / 2, canvas_height, 0x000000
            );
        //for background control use background animations for transitions, and isVisible() 
        //to turn off backgrounds
        this.bg_air = this.add.tileSprite(
            canvas_width / 2, canvas_height / 2, canvas_width / 2, canvas_height, 'bg_air');
        
        //PLAYER CHARACTER
        this.faller_instance = new Faller(
            this, game.config.width/2, 431, 'faller').setOrigin(0,0);
        //this sets the faller to be in front of everything else
        this.faller_instance.setDepth(2);
        
            

    }


    update() {

        //Update Instances
        this.faller_instance.update();
        
        //Update Background
        this.bg_air.tilePositionY += 5;
        
    }
}