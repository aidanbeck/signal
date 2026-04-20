import Texture from '../easel/Texture.js';
import { Point, Rectangle } from '../easel/Shape.js';

export class Card extends Rectangle {

    constructor(x, y, w, h, texture = null, onClick = () => {}, onHover = () => {}, customRender = null ) {
        super(x, y, w, h);

        this.frame = 0;
        this.texture = texture
        this.onHover = onHover;
        this.onClick = onClick;
        this.customRender = customRender;
    }
}

export class Scene {

    constructor(backgroundImageSrc, frameWidth = null) {
        this.backgroundImage = new Texture(backgroundImageSrc, frameWidth);
        this.frame = 0;
        this.cards = [];
    }

    render(ctx) {

        this.backgroundImage.draw(0, 0, this.frame, ctx);

        for (let card of this.cards) {
            if (card.customRender != null) {
                card.customRender(ctx);
                continue;
            }
            if (!card.texture) { continue; }

            card.texture.draw(card.x, card.y, card.frame, ctx);
        }

        //debug show hitboxes
        // ctx.strokeStyle = "red";
        // for (let card of this.cards) {
        //     ctx.strokeRect(card.x, card.y, card.w, card.h);
        // }
    }

    hover(x, y, ctx) {
        document.body.style.cursor = `url('./art/ui/hand.png') -16 -16, auto`;
        let hoverPoint = new Point(x, y);

        for (let card of this.cards) {
            if (hoverPoint.overlaps(card)) {
                card.onHover(x, y, ctx);
            }
        }
    }

    click(x, y, ctx) {

        let clickPoint = new Point(x, y);

        for (let card of this.cards) {
            if (clickPoint.overlaps(card)) {
                card.onClick(x, y, ctx);
            }
        }
    }
}