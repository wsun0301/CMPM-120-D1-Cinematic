class BasslineBurnout_Intro extends Phaser.Scene {
    constructor() {
        super({ key: 'basslineBurnout_Intro' });
    }
    preload() {
        this.load.path = 'assets/';
        this.load.image('titleWheel1','titleWheel1.gif');
        this.load.audio('introVroom', 'vroom.wav');
        this.load.audio('titleBackground', 'titleBackground.wav');

    };
    create() {
        let titleMusic = this.sound.add('titleBackground', { loop: true, volume: 0.5 });
        titleMusic.play();
        let titleText = this.add.text(960, 500, 'Bassline Burnout', {
            font: '70px impact',
            fill: '#ffffff' 
        }).setOrigin(0.5).setAlpha(0);

        let clickPrompt = this.add.text(960, 2000, 'Click to Start', {
            font: '40px impact',
            fill: '#ffffff'
        }).setOrigin(0.5).setAlpha(0);

        let titleWheel1 = this.add.image(600, 500, 'titleWheel1').setScale(0.5).setAlpha(0);
        let titleWheel2 = this.add.image(1320, 500, 'titleWheel1').setScale(0.5).setAlpha(0);
        let introVroom = this.sound.add('introVroom');
        
        this.tweens.add({
            targets: titleText,
            alpha: 1,
            duration: 3000,
            ease: 'Power1',
        });
        this.tweens.add({
            targets: titleWheel1,
            alpha: 1,
            duration: 3000,
            ease: 'Power1',
        });
        this.tweens.add({
            targets: titleWheel1,            angle: 1080,
            duration: 3000,
            ease: 'Linear',
            repeat: -1
        });
         this.tweens.add({
            targets: titleWheel2,
            alpha: 1,
            duration: 3000,
            ease: 'Power1',
        });
        this.tweens.add({
            targets: titleWheel2,            angle: -1080,
            duration: 3000,
            ease: 'Linear',
            repeat: -1
        });
        this.tweens.add({
            targets: clickPrompt,
            alpha: 1,
            duration: 3000,
            ease: 'Power1',
            delay: 3000
        });
        this.tweens.add({
            targets: clickPrompt,
            x: 960,
            y: 700,
            duration: 1000,
            ease: 'Power1',
            delay: 3000
        });
        this.tweens.add({
            targets: clickPrompt,
            alpha: 0.7,
            duration: 1500,
            ease: 'Power1',
            repeat: -1,
            yoyo: true,
        });

        this.input.once('pointerdown', () => {
            introVroom.play();
            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                console.log('Transitioning to loading screen');
                this.scene.start('loadingScreen');
            });
        });
    };

    update() {};

};

class LoadingScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'loadingScreen' });
    }   
    preload() {
        this.load.path = 'assets/';
        this.load.spritesheet('loadingIcon', 'loadIcon.png', { frameWidth: 200, frameHeight: 200 });
    }
    create() {
        this.cameras.main.setBackgroundColor('#c7c7c7');
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        let loadingText = this.add.text(2340, 1000, 'Loading......', {
            font: '100px impact',
            fill: '#000000'
        }).setOrigin(0.5).setAlpha(0);

        let loadingIcon = this.anims.create({
            key: 'playGif',
            frames: this.anims.generateFrameNumbers('loadingIcon' , { start: 0, end: 35 }),
            frameRate: 36,
            repeat: -1
        });

        let loadingSprite = this.add.sprite(2000, 950, 'loadingIcon').setScale(1).setAlpha(0);
        loadingSprite.play('playGif');
        this.tweens.add({
            targets: loadingText,
            alpha: 1,
            duration: 3000,
            ease: 'Power1'
        });
        this.tweens.add({
            targets: loadingSprite,
            alpha: 1,
            duration: 3000,
            ease: 'Power1'
        });
        this.tweens.add({
            targets: loadingText,
            x: 470,
            y: 1000,
            duration: 1500,
            ease: 'Power1',
        });
        this.tweens.add({
            targets: loadingSprite,
            x: 130,
            y: 950,
            duration: 1500,
            ease: 'Power1',
        });

        this.time.addEvent({
            delay: 8000,
            callback: () => {
                this.cameras.main.fadeOut(2000, 0, 0, 0);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    console.log('Transitioning to main menu');
                    this.scene.start('mainMenu');

                });
            }
        });
          

    };
    update() {}
};

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
    }
    preload() {};
    create() {};
    update() {};
};

let config = {
    type: Phaser.WEBGL,
     scale: {
        mode: Phaser.Scale.FIT, // FIT or ENVELOP
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920, // Logical width
        height: 1080, // Logical height
    },
    backgroundColor: '#000000',
    scene: [BasslineBurnout_Intro, LoadingScreen, MainMenu]
};

let game = new Phaser.Game(config);

