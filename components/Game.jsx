import React, { useEffect } from "react";
import Phaser from "phaser";
//Scenes
import Preload from "../scenes/Preload";

const Game = () => {

    // Configuración Tamaño Canvas
    const DEFAULT_WIDTH = 751
    const DEFAULT_HEIGHT = 1000
    const MAX_WIDTH = 751;
    const MAX_HEIGHT = 1000;
    // Configuración Base de Phaser3
    var config = {
        title: '',
        url: '',
        version: '1',
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "gamecontainer",
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            //mode: Phaser.Scale.NONE,
            zoom: 1,  // Size of game canvas = game size * zoom
        },
        dom: {
            createContainer: true
        },
        type: Phaser.WEBGL,
        parent: "gamecontainer",
        backgroundColor: "#000000",
        resolution: window.devicePixelRatio || 1,
        scene: [
            Preload,
        ],
        transparent: false,
        fps: 60,
        pixelArt: false,
        physics: {
            default: "arcade",
            gravity: {
                y: 0
            }
        }
    }

    // Adaptación de pantalla
    useEffect(() => {
        if (document.querySelector("canvas"))
            return;
        const game = new Phaser.Game(config);
        const resize = () => {
            return;
            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;
            let scale = 360 / 640;
            const isPortrait = window.innerHeight > window.innerWidth;

            if (isPortrait) {
                // We want to constrain the canvas by its width
                game.canvas.style.width = windowWidth + "px";
                console.log(windowWidth)
                // The height depends on the width to ensure we don't stretch pixels
                // on the canvas.
                game.canvas.style.height = game.canvas.style.width / scale + "px";
            } else {
                // constrain by height
                game.canvas.style.height = windowHeight + "px";
                game.canvas.style.width = game.canvas.style.height * scale + "px";
            }


        }
        window.addEventListener('resize', event => {
            setTimeout(resize, 500)
        })
        setTimeout(resize, 1000);
        //eslint-disable-next-line
    }, []);

    return (
        <div className="contgame">
            <div id="gamecontainer"></div>
        </div>
    )
}
export default Game;