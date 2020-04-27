class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('playButton', './assets/playButton.png');
        this.load.image('creditsButton', './assets/creditsButton.png');
        this.load.image('rulesButton', './assets/rulesButton.png');

        // load spritesheet
        this.load.spritesheet('menuBG', './assets/menuScreen.png', {frameWidth: 720, frameHeight: 720, startFrame: 0, endFrame: 15});
        this.load.spritesheet('menuP', './assets/menuScreenPlay.png', {frameWidth: 720, frameHeight: 720, startFrame: 0, endFrame: 15});

    }

    create() {
        
        //this.test = 4;
        //this.add.text(20, 20, "Rocket Patrol Play");
        //this.menuBackground = this.add.tileSprite(0, 0, 720, 720, 'menuBG').setOrigin(0,0);

        // animation config
        this.anims.create({
            key: 'menuBack',
            frames: this.anims.generateFrameNumbers('menuBG', {start: 0, end: 15, first: 0}), 
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'menuPlay',
            frames: this.anims.generateFrameNumbers('menuP', {start: 0, end: 15, first: 0}), 
            frameRate: 10,
            
        });

        let boom = this.add.sprite(0, 0, 'menuBG').setOrigin(0,0);

        boom.anims.play('menuBack');

        //console.log("did Menu scene");
        //this.scene.start("airScene");
        //console.log("in play");
        let buttonOne = this.add.tileSprite(160, 340, 83, 38, 'playButton').setOrigin(0,0);
        let buttonTwo = this.add.tileSprite(293, 340, 110, 38, 'rulesButton').setOrigin(0,0);
        let buttonThree = this.add.tileSprite(453, 340, 120, 38, 'creditsButton').setOrigin(0,0);

        //this.add.rectangle(160, 340, 100, 35, 0xCC0000).setOrigin(0, 0);
        //this.add.rectangle(310, 340, 100, 35, 0xCC0000).setOrigin(0, 0);
        //this.add.rectangle(460, 340, 100, 35, 0xCC0000).setOrigin(0, 0);

        // make buttons interactive
        buttonOne.setInteractive();

        buttonOne.on('pointerdown', function(event){

            let booom = this.add.sprite(0, 0, 'menuP').setOrigin(0,0);

            booom.anims.play('menuPlay');

            booom.on('animationcomplete', function(event){
                this.scene.start("airScene");
            }, this);
                

        }, this);
    }


}