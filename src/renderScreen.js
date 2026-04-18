export default function render(theatre, ctx, ships, dotRadius, lineSpacePixels) {

    clearCanvas(theatre, ctx);
    renderGrid(theatre, ctx, lineSpacePixels);
    renderShips(ctx, ships, dotRadius);
}

function clearCanvas(theatre, ctx) {
    ctx.clearRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
}

function renderShips(ctx, ships, radius) {

    for (let ship of ships) {
        ctx.fillStyle = ship.color;
        ctx.beginPath();
        ctx.arc(ship.x, ship.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

}

function renderGrid(theatre, ctx, lineSpacePixels) {

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