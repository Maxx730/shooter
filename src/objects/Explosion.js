export default class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.add.existing(this);

        let ExplosionAnimation = {
            key: 'explode_'+config.key,
            frames: scene.anims.generateFrameNumbers(config.key),
            frameRate: 60
        }
        
        scene.anims.create(ExplosionAnimation);
        this.anims.load('explode_'+config.key);
        this.anims.play('explode_'+config.key);
    }
}