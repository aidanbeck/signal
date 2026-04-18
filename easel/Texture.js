export default class Texture {
    constructor(src, frameWidth = null, offsetX = 0, offsetY = 0) {
        
        this.frameWidth = frameWidth;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            if (this.frameWidth == null) {
                this.frameWidth = this.image.width;
            }
            this.frameCount = this.image.width / this.frameWidth;
        }

    }

    draw(x, y, frame, ctx) {
        
        ctx.drawImage(
            this.image,
            this.frameWidth * frame, // sample x
            0, // sample y
            this.frameWidth,
            this.image.height,
            x + this.offsetX,
            y + this.offsetY,
            this.frameWidth,
            this.image.height
        )
    }

    fillDraw(x, y, widthPixels, heightPixels, frame, ctx) {

        for (let i = 0; i < widthPixels; i += this.frameWidth) {
            for (let j = 0; j < heightPixels; j+= this.image.height) {
                this.draw(x+i, y+j, frame, ctx);
            }
        }
    }
}