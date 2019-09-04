export default class Upgrade extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this);
    }

    preUpdate() {
        if(this.y > 700) {
            this.destroy()
        } else {
            this.setVelocityY(100)
        }
    }
}