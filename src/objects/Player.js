
import LaserSmall from './LaserSmall';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        this.SPEED = 300;

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.exhaust = scene.add.sprite(x,y,'Exhaust');

        let ExhaustAnimation = {
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('Exhaust'),
            frameRate: 6,
            repeat: -1,
            yoyo: true
        }

        this.setOrigin(0);
        this.setDragX(350);
        this.setImmovable(true);
        

        this.keys = scene.input.keyboard.addKeys({
			up:Phaser.Input.Keyboard.KeyCodes.W,
			down:Phaser.Input.Keyboard.KeyCodes.S,
			left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            space:Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        
        this.keys.left.on('down',function() {
            this.setVelocityX(-this.SPEED);
        },this);

        this.keys.right.on('down',function() {
            this.setVelocityX(this.SPEED);
        },this);

        this.keys.left.on('up',function() {
            this.setFrame(0);
            this.flipX = false;
        },this);

        this.keys.right.on('up',function() {
            this.setFrame(0);
            this.flipX = false;
        },this);

        this.keys.space.on('down',function() {
            config.shots.add(new LaserSmall(scene,this.x,this.y + 32,{
                key: 'LaserSmall'
            }));

            config.shots.add(new LaserSmall(scene,this.x + 64,this.y + 32,{
                key: 'LaserSmall'
            }));
        },this);

        scene.anims.create(ExhaustAnimation);
        this.exhaust.anims.load('idle');
        this.exhaust.anims.play('idle');
    }

    preUpdate() {
        this.exhaust.x = this.x + 32;
        this.exhaust.y = this.y + 64;

        if(this.keys.right.isDown) {
            this.setFrame(1)
            this.exhaust.x = this.x + 36;
            this.flipX = true;
            this.setVelocityX(this.SPEED);
        }

        if(this.keys.left.isDown) {
            this.setFrame(1);
            this.flipX = false;
            this.exhaust.x = this.x + 28;
            this.setVelocityX(-this.SPEED);
        }
    }
}