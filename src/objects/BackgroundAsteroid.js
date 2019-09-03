export default class BackgroundAsteroid extends Phaser.Physics.Arcade.Sprite {
	constructor(scene,x,y,config) {
		super(scene,x,y,config.key);

		scene.physics.world.enable(this);
		scene.add.existing(this);
		this.setScale((Math.random() * 6) + 4);
		this.setVelocity(Math.random() * 100,Math.random() * 100);
		this.setAngularVelocity(Math.random() * 100); 
	}

	preUpdate() {
		if(this.x > (500) || this.y > 700) {
			this.destroy();
		}
	}
}