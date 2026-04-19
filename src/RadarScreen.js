import Theatre from '../easel/Theatre.js';

export default class RadarScreen {

    constructor(theatre, ships, mouse, gridWidth = 12, gridHeight = 8, tileSizePixels = 50) {

        this.theatre = theatre
        this.ctx = theatre.ctx;
        this.ships = ships;
        this.mouse = mouse;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.tileSizePixels = tileSizePixels;
    }

    render() {
        this.clearCanvas();

        // Follow Player
        this.ctx.save();
        let player = this.ships[0];
        this.ctx.translate(-player.x, -player.y);

        this.renderGrid();
        this.renderGridLabels();
        this.lineToMouse();
        this.renderShips();

        this.ctx.restore();
    
    }

    clearCanvas() {

        const startX = -this.theatre.canvas.width / 2;
        const startY = -this.theatre.canvas.height / 2;
        this.ctx.clearRect(startX, startY, this.theatre.canvas.width, this.theatre.canvas.height);
    }

    renderGrid() {

        let ctx = this.ctx;
        ctx.strokeStyle = "rgb(40,70,70)";
        ctx.beginPath();

        // vertical lines
        for (let i = 0; i < this.tileSizePixels * (this.gridHeight + 1); i += this.tileSizePixels) {
            ctx.moveTo(0, i);
            ctx.lineTo(this.gridWidth * this.tileSizePixels, i);
            ctx.stroke();
        }

        //horizontal lines
        for (let i = 0; i < this.tileSizePixels * (this.gridWidth + 1); i += this.tileSizePixels) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.gridHeight * this.tileSizePixels);
            ctx.stroke();
        }

    }

    renderGridLabels() {

        let gridWidth = this.gridWidth - 1;
        let gridHeight = this.gridHeight;
        let ctx = this.ctx;
        ctx.fillStyle = "rgb(140,170,170)";

        // label rows
        for (let i = 0; i < this.tileSizePixels * (gridHeight + 1); i += this.tileSizePixels) {

            let string = i / this.tileSizePixels;
            let x = this.ships[0].x - this.theatre.canvas.width / 2;
            let y = i - this.tileSizePixels/2 + this.tileSizePixels;
            
            ctx.fillText(string, x + 5, y + 3);
        }

        //label columns
        for (let i = 0; i < this.tileSizePixels * (gridWidth + 1); i += this.tileSizePixels) {

            let string = i / this.tileSizePixels;
            let x = i + this.tileSizePixels / 2;
            let y = this.ships[0].y - this.theatre.canvas.height / 2;
            
            ctx.fillText(string, x - 3, y + 10);
        }

    }

    lineToMouse() {

        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(this.ships[0].x, this.ships[0].y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
    }

    renderShips() {

        for (let ship of this.ships) {
            
            this.ctx.fillStyle = ship.color;
            this.ctx.beginPath();
            this.ctx.arc(ship.x, ship.y, ship.dotRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }

}

}