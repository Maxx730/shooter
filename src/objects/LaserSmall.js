
import Explosion from './Explosion';
export default class LaserSmall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this._scene = scene;

        this.SPEED = -700;
        this.setVelocityY(this.SPEED);
        this.explosions = [
            'RoundExp',
            'VortexExp'
        ]
    }

    preUpdate() {
        this.setVelocityY(this.SPEED);
    }

    getExp() {
        return this.explosions[Math.floor(Math.random() * this.explosions.length)]
    }
}