import Phaser from "phaser";
import Gameplay from './scenes/Gameplay';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [
    Gameplay
  ],
  physics: {
    default: 'arcade',
	  arcade :{
		  debug: true
	  }
  }
};

const game = new Phaser.Game(config);

