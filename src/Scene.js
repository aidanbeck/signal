import Texture from '../easel/Texture.js';
import { Rectangle } from '../easel/Shape.js';

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

    constructor(backgroundImageSrc) {
        this.backgroundImage = new Texture(backgroundImageSrc);
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
    }

    hover(x, y) {

    }

    click(x, y) {
        console.log(x, y);
    }
}