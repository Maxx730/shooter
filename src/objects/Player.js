
import LaserSmall from './LaserSmall';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

		this.SPEED = 300;
		this.lastTime = new Date();
		this._config = config;
		this._scene = scene;
		this.HEALTH = 100;
        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setOrigin(0);
        this.setDragX(350);
        this.setImmovable(true);
		this.setSize(15,35);

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
    }

    preUpdate() {
		
		if(this.keys.space.isDown) {
			if(new Date() - this.lastTime > 250) {
				this._config.shots.add(new LaserSmall(this._scene,this.x + 18,this.y + 32,{
					key: 'LaserSmall',
					velY: -7,
					startRotation: -0.15,
					endRotation: 0,
					distance: 0
				}));
	
				this._config.shots.add(new LaserSmall(this._scene,this.x + 42,this.y + 32,{
					key: 'LaserSmall',
					velX: 100,
					velY: -7,
					startRotation: 0.15,
					endRotation: 0,
					distance: 0
				}));
				this.lastTime = new Date();
			}
		}

        if(this.keys.right.isDown) {
            this.setFrame(1)
            this.flipX = true;
            this.setVelocityX(this.SPEED);
        }

        if(this.keys.left.isDown) {
            this.setFrame(1);
            this.flipX = false;
            this.setVelocityX(-this.SPEED);
        }
    }
}