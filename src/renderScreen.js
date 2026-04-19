export default function render(theatre, ctx, ships, mouse, dotRadius, lineSpacePixels) {

    // ctx.shadowBlur = 15;

    

    clearCanvas(theatre, ctx);

    //offset canvas

    ctx.save();
    ctx.translate(-ships[0].x, -ships[0].y);

    renderGrid(theatre, ctx, lineSpacePixels);
    renderGridChars(theatre, ctx, ships, lineSpacePixels);
    lineToMouse(ctx, ships, mouse);
    renderShips(ctx, ships, dotRadius);

    ctx.restore();
    
}

function lineToMouse(ctx, ships, mouse) {

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(ships[0].x, ships[0].y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
}

function clearCanvas(theatre, ctx) {
    ctx.clearRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
}

function renderShips(ctx, ships, radius) {

    ctx.shadowColor = "white"; // can make this other color, but rgba is rough.
    

    for (let ship of ships) {
        
        ctx.fillStyle = ship.color;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

}

function renderGrid(theatre, ctx, lineSpacePixels) {

    let gridWidth = 12;
    let gridHeight = 8;

    ctx.shadowColor = "rgb(40,70,70)"; // can make this other color, but rgba is rough.

    // horizontal lines
    ctx.strokeStyle = "rgb(40,70,70)";
    ctx.beginPath();

    for (let i = 0; i < lineSpacePixels * (gridHeight + 1); i += lineSpacePixels) {
        ctx.moveTo(0, i);
        ctx.lineTo(gridWidth * lineSpacePixels, i);
        ctx.stroke();
    }

    for (let i = 0; i < lineSpacePixels * (gridWidth + 1); i += lineSpacePixels) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, gridHeight * lineSpacePixels);
        ctx.stroke();
    }

}

function renderGridChars(theatre, ctx, ships, lineSpacePixels) {

    let gridWidth = 12;
    let gridHeight = 8;

    gridWidth--;

    for (let i = 0; i < lineSpacePixels * (gridHeight + 1); i += lineSpacePixels) {
        let string = i / lineSpacePixels;
        ctx.fillStyle = "rgb(140,170,170)";
        ctx.fillText(string, -theatre.canvas.width / 2 + 5 + ships[0].x, i - lineSpacePixels/2 + 3 + lineSpacePixels);
    }

    for (let i = 0; i < lineSpacePixels * (gridWidth + 1); i += lineSpacePixels) {
        let string = i / lineSpacePixels;
        ctx.fillStyle = "rgb(140,170,170)";
        ctx.fillText(string, i + lineSpacePixels/2 - 3, -theatre.canvas.height / 2 + 5 + ships[0].y + 5);
    }

}