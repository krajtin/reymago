import Phaser from "phaser";
var PIECE_WIDTH = 200,
    PIECE_HEIGHT = 200,
    BOARD_COLS,
    BOARD_ROWS;
var piecesGroup,
    piecesAmount,
    shuffledIndexArray = [];
const events = Phaser.Input.Events;
export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: "Play" });
    }
    init(data) {
        this.imageGame = data.image;
        this.textGame = data.textEnd;
    }
    preload() {
        this.load.path = '/assets/';
        this.load.spritesheet("background", `images/${this.imageGame}`, { frameWidth: PIECE_WIDTH, frameHeight: PIECE_HEIGHT });
        this.load.image("blackPiece", "images/blackPiece.png");
    }
    create() {

        var piecesIndex = 0,
            i, j,
            piece;


        BOARD_COLS = Math.floor(this.game.config.width / PIECE_WIDTH);
        BOARD_ROWS = Math.floor(this.game.config.height / PIECE_HEIGHT);

        piecesAmount = BOARD_COLS * BOARD_ROWS;

        shuffledIndexArray = this.createShuffledIndexArray();

        piecesGroup = this.add.group();

        for (i = 0; i < BOARD_ROWS; i++) {
            for (j = 0; j < BOARD_COLS; j++) {
                if (shuffledIndexArray[piecesIndex]) {
                    piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex]);
                }
                else { //initial position of black piece
                    piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "blackPiece");
                    piece.black = true;
                }
                piece.name = 'piece' + i.toString() + 'x' + j.toString();
                piece.currentIndex = piecesIndex;
                piece.destIndex = shuffledIndexArray[piecesIndex];
                piece.setOrigin(0);
                piece.inputEnabled = true;
                piece.setInteractive();
                piece.posX = j;
                piece.posY = i;
                piecesIndex++;
            }
        }
        var _array = piecesGroup.getChildren();
        for (let x = 0; x < _array.length; x++) {
            const element = _array[x];
            element.on(events.POINTER_DOWN, () => {
                this.selectPiece(element);
            });
        }
    }
    selectPiece(piece) {
        if (this.finish)
            return;
        var blackPiece = this.canMove(piece);
        //if there is a black piece in neighborhood
        if (blackPiece) {
            this.movePiece(piece, blackPiece);
        }

    }
    canMove(piece) {

        var foundBlackElem = false;
        var piecesArray = piecesGroup.getChildren();
        piecesArray.forEach(function (element) {
            if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
                element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
                element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
                element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
                foundBlackElem = element;
                return;
            }
        });

        return foundBlackElem;
    }
    movePiece(piece, blackPiece) {

        var tmpPiece = {
            posX: piece.posX,
            posY: piece.posY,
            currentIndex: piece.currentIndex
        };

        var tween = this.add.tween({
            targets: piece,
            x: blackPiece.posX * PIECE_WIDTH,
            y: blackPiece.posY * PIECE_HEIGHT,
            duration: 300,
            ease: "Linear",
        });

        //change places of piece and blackPiece
        piece.posX = blackPiece.posX;
        piece.posY = blackPiece.posY;
        piece.currentIndex = blackPiece.currentIndex;
        piece.name = 'piece' + piece.posX.toString() + 'x' + piece.posY.toString();

        //piece is the new black
        blackPiece.posX = tmpPiece.posX;
        blackPiece.posY = tmpPiece.posY;
        blackPiece.currentIndex = tmpPiece.currentIndex;
        blackPiece.name = 'piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();
        //after every move check if puzzle is completed
        this.checkIfFinished();
    }
    checkIfFinished() {

        var isFinished = true;

        piecesGroup.getChildren().forEach(function (element) {
            if (element.currentIndex !== element.destIndex) {
                isFinished = false;
                return;
            }
        });

        if (isFinished) {
            this.finish = true;
            this.showFinishedText();
        }

    }
    showFinishedText() {

        var style = { font: "37px Arial", fill: "#fff", align: "center" };

        var text = this.add.text(this.game.config.width / 2, this.game.config.height / 2, this.textGame, style);
        text.setOrigin(0.5);

    }
    createShuffledIndexArray() {

        var indexArray = [];

        for (var i = 0; i < piecesAmount; i++) {
            indexArray.push(i);
        }

        return this.shuffle(indexArray);

    }

    shuffle(array) {

        var counter = array.length,
            temp,
            index;

        while (counter > 0) {
            index = Math.floor(Math.random() * counter);

            counter--;

            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

}