import Phaser from "phaser";
class Preload extends Phaser.Scene {
    constructor() {
        super({ key: "Preload" });
    }
    preload() {
        const WIDTH_GAME = this.game.canvas.width;
        const HEIGHT_GAME = this.game.canvas.height;
        this.load.path = '/assets/';
        //this.load.bitmapFont('normal', 'fonts/bitmap/Normal.png', 'fonts/bitmap/Normal.xml');
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect((WIDTH_GAME - 50 ) / 2, HEIGHT_GAME  / 2, 380, 50);

        var loadingText = this.make.text({
            x: WIDTH_GAME / 2,
            y: HEIGHT_GAME / 2,
            text: 'LOADING...',
            style: {
                font: '32px monospace',
                fill: '#ffffff',
            }
        });
        loadingText.setOrigin(0.5);
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(810, 460, 300 * value, 30);
        });
        this.load.on('complete', () => {
            /*progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            */

        });

    }

    create() {
        //this.scene.start('Start');
    }

}


export default Preload;