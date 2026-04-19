export default function render(theatre, ctx, ships, mouse, dotRadius, lineSpacePixels) {

    // ctx.shadowBlur = 15;

    

    clearCanvas(theatre, ctx);

    //offset canvas

    ctx.save();
    ctx.translate(-ships[0].x, -ships[0].y);

    renderGrid(theatre, ctx, lineSpacePixels);
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

    ctx.shadowColor = "rgb(40,70,70)"; // can make this other color, but rgba is rough.

    // horizontal lines
    ctx.strokeStyle = "rgb(40,70,70)";
    ctx.beginPath();

    for (let i = -theatre.canvas.height / 2; i < theatre.canvas.height / 2; i += lineSpacePixels) {
        ctx.moveTo(-theatre.canvas.width / 2, i);
        ctx.lineTo(theatre.canvas.width / 2, i);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgb(0,70,70)";
    ctx.beginPath();
    for (let i = -theatre.canvas.width / 2; i < theatre.canvas.width / 2; i += lineSpacePixels) {
        ctx.moveTo(i, -theatre.canvas.height / 2);
        ctx.lineTo(i, theatre.canvas.height / 2);
        ctx.stroke();
    }
}