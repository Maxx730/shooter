export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        this.config = config;

        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setBounce(this.getBounce(),this.getBounce())
        this.setSize(10,10);
        
        this.angularVelocity = Math.random() * 100;
        this.velocityX = (Math.random() * 100) - 50;
        this.velocityY = Math.random() * 100;
    }

    preUpdate() {
        this.setVelocity(this.velocityX,this.velocityY)
        this.setAngularVelocity(this.angularVelocity);

        if(this.x > 800 || this.y > 600) {
            this.destroy();
        }
    }

    getBounce() {
        switch(this.config.key) {
            case 'Asteroid1':
                return 4;
            break;
            case 'Asteroid2':
                return 3;
            break;
            case 'Asteroid1':
                return 2
            break;
            default:
                return 1;
            break;
        }
    }
}