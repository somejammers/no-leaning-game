class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //play loading image
        this.loading = this.add.image(canvas_width/2, canvas_height/2, 'loading');


        this.load.spritesheet('faller_default', './assets/faller.png', {frameWidth: 48, frameHeight: 28});
        this.load.spritesheet('faller_hurt', './assets/faller_hurt.png', {frameWidth: 48, frameHeight: 28});
        this.load.spritesheet('faller_r_default', './assets/faller_r_default.png', {frameWidth: 28, frameHeight: 48});
        this.load.spritesheet('faller_r_hurt', './assets/faller_r_hurt.png', {frameWidth: 28, frameHeight: 48});
        this.load.spritesheet('faller_u_default', './assets/faller_u_default.png', {frameWidth: 48, frameHeight: 28});        
        this.load.spritesheet('faller_u_hurt', './assets/faller_u_hurt.png', {frameWidth: 48, frameHeight: 28});
        this.load.spritesheet('faller_l_default', './assets/faller_l_default.png', {frameWidth: 28, frameHeight: 48});
        this.load.spritesheet('faller_l_hurt', './assets/faller_l_hurt.png', {frameWidth: 28, frameHeight: 48});

        this.load.image('bg_air', './assets/bg_air.png');
        this.load.image('bg_water', './assets/bg_water.png');

        this.load.image('barrier', './assets/barrier.png');
        this.load.image('barrier_water', './assets/barrier_water.png');


        this.load.image('barrier_broken', './assets/barrier_broken.png');
        this.load.spritesheet('border_air', './assets/border.png', {frameWidth: 60, frameHeight: 720}); 
        this.load.spritesheet('border_water', './assets/border_water.png', {frameWidth: 720, frameHeight: 60}); 

        this.load.spritesheet('rewind', './assets/rewind-Sheet.png', {frameWidth: 720, frameHeight: 720});
        
        this.load.image('trimming_behind', './assets/trimming_behind.png');
        this.load.image('trimming_behind_l', './assets/trimming_behind_l.png');
        this.load.image('trimming_behind_r', './assets/trimming_behind_r.png');

        this.load.image('trimming_front', './assets/trimming_front.png');
        this.load.image('trimming_front_l', './assets/trimming_front_l.png');
        this.load.image('trimming_front_r', './assets/trimming_front_r.png');

        this.load.spritesheet('air_obstacle', './assets/air_obstacle.png', {frameWidth: 80, frameHeight: 80});
        this.load.spritesheet('water_obstacle', './assets/water_obstacle.png', {frameWidth: 80, frameHeight: 80});

        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
        
        this.load.audio('bgm', './assets/editjo_techno.wav');
        this.load.audio('barrierSmash', './assets/explosion38.wav');
        this.load.audio('obstacleCollision', './assets/explosion38.wav');
        this.load.audio('sfx_rewind', './assets/sfx_rewind.wav');


        
        // load images/tile sprites
        this.load.image('playButton', './assets/playButton.png');
        this.load.image('creditsButton', './assets/creditsButton.png');
        this.load.image('rulesButton', './assets/rulesButton.png');

        this.load.image('rules', './assets/rules.png');
        //this.load.image('credits', './assets/credits.png');


        // load spritesheet
        this.load.spritesheet('menuBG', './assets/menuScreen.png', {frameWidth: 720, frameHeight: 720, startFrame: 0, endFrame: 15});
        this.load.spritesheet('menuP', './assets/menuScreenPlay.png', {frameWidth: 720, frameHeight: 720, startFrame: 0, endFrame: 15});
        this.load.spritesheet('creditsP', './assets/menuScreenCredits.png', {frameWidth: 720, frameHeight: 720, startFrame: 0, endFrame: 15});

    }

    create() {

        this.closeLoading();
        
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

        this.anims.create({
            key: 'creditsPlay',
            frames: this.anims.generateFrameNumbers('creditsP', {start: 0, end: 15, first: 0}), 
            frameRate: 10,
            repeat: -1
            
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
        //buttonTwo.setInteractive();
        buttonThree.setInteractive();

        buttonOne.on('pointerdown', function(event){

            let booom = this.add.sprite(0, 0, 'menuP').setOrigin(0,0);

            booom.anims.play('menuPlay');

            booom.on('animationcomplete', function(event){
                this.scene.start("airScene");
            }, this);
                

        }, this);

        buttonThree.on('pointerdown', function(event){

            let creditsPlay = this.add.sprite(0, 0, 'creditsP').setOrigin(0,0);

            creditsPlay.anims.play('creditsPlay');

            var depth = creditsPlay.depth;

            creditsPlay.setInteractive();

            creditsPlay.on('pointerdown', function(event){
            
                creditsPlay.depth = -1;

            }, this);

        }, this);   
    }

    closeLoading() {
        this.loading.destroy();
    }
}