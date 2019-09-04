
import Explosion from './Explosion';
export default class LaserSmall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this);
		this._scene = scene;
		this._config = config;
		this.power = -20;
        this.SPEED = -700;
        this.setVelocity(config.velX,config.velY)
        this.explosions = [
            'RoundExp',
            'VortexExp'
		];

		this.rotation = this._config.startRotation
		
		scene.tweens.add({
			targets: this,
			props: {
				x: {
					value: this.x + this._config.distance
				},
				rotation: {
					value: this._config.endRotation
				}
			},
			duration: 500
		})
    }

    preUpdate() {
		this.y += this._config.velY
    }

    getExp() {
        return this.explosions[Math.floor(Math.random() * this.explosions.length)]
    }
}