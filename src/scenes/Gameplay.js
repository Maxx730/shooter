import PlayerImage from '../assets/player.png';
import ExhaustImage from '../assets/exhaust.png';
import SmallLaserImg from '../assets/laser-small.png';
import Player from '../objects/Player';
import RoundExpImg from '../assets/round_exp.png';
import VortextExpImg from '../assets/vortex_exp.png';
import Asteroid1Img from '../assets/asteroid-1.png';
import Asteroid2Img from '../assets/asteroid-2.png';
import Asteroid3Img from '../assets/asteroid-3.png';
import Asteroid4Img from '../assets/asteroid-4.png';
import Asteroid from '../objects/Asteroid';
import Exsplotion from '../objects/Explosion';
import Explosion from '../objects/Explosion';

export default class Gameplay extends Phaser.Scene {
    constructor() {
        super({
            key: 'Gameplay'
        })
    }

    preload() {
        this.load.spritesheet('Player',PlayerImage,{frameWidth: 64,frameHeight: 64});
        this.load.spritesheet('Exhaust',ExhaustImage,{frameWidth: 22,frameHeight: 22});
        this.load.spritesheet('LaserSmall',SmallLaserImg,{frameWidth: 22,frameHeight: 22});
        this.load.spritesheet('RoundExp',RoundExpImg,{frameWidth: 100,frameHeight: 100});
        this.load.spritesheet('VortexExp',VortextExpImg,{frameWidth: 100,frameHeight: 100});
        this.load.spritesheet('Asteroid1',Asteroid1Img,{frameWidth: 39,frameHeight: 39});
        this.load.spritesheet('Asteroid2',Asteroid2Img,{frameWidth: 39,frameHeight: 39});
        this.load.spritesheet('Asteroid3',Asteroid3Img,{frameWidth: 39,frameHeight: 39});
        this.load.spritesheet('Asteroid4',Asteroid4Img,{frameWidth: 39,frameHeight: 39});
    }

    create() {
        this.asteroidImg = [
            'Asteroid1',
            'Asteroid2',
            'Asteroid3',
            'Asteroid4'
        ]
        this.SCORE = 0;
        this.asteroids = this.physics.add.group({
            bounceX: 2,
            bounceY: 1
        });
        this.shots = this.physics.add.group({

        });

        this.Player = new Player(this,10,600 - 84,{
            key: 'Player',
            shots: this.shots
        });

        let _self = this;

        setInterval(function(){
            _self.asteroids.add(new Asteroid(_self,Math.random() * 800,Math.random() * -100,{
                key: _self.asteroidImg[Math.floor(Math.random() * _self.asteroidImg.length)]
            }))
        },500)

        this.physics.add.collider(this.shots,this.asteroids,null,function(shot,asteroid) {
            shot.destroy();
            asteroid.destroy();
            this.SCORE += 50;
            new Exsplotion(this,asteroid.x,asteroid.y,{
                key: shot.getExp()
            })
        },this);

        this.physics.add.collider(this.asteroids,this.asteroids,null,function(asteroid1,asteroid2) {
            asteroid1.destroy();
            asteroid2.destroy();
            new Explosion(_self,(asteroid1.x + 32),asteroid1.y,{
                key: 'VortexExp'
            })
        })

        this.physics.add.collider(this.Player,this.asteroids,null,function(asteroid,player) {
            console.log('working')
        })

        this.scoreText = this.add.text(12,12,'SCORE: ' + this.SCORE)
    }

    update() {
        this.scoreText.setText('SCORE: ' + this.SCORE)
    }
}