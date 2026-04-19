import Texture from '../easel/Texture.js';
import { Rectangle } from '../easel/Shape.js';

export class HitBox {
    constructor(shape, onClick = () => {}, onHover = () => {}, texture = null) {
        
        this.shape = shape;
        this.texture = texture

        this.onHover = onHover;
        this.onClick = onClick;
    }
}

export class Scene {
    constructor(backgroundImageSrc) {
        this.backgroundImage = new Texture(backGroundImageSrc);

        this.hitBoxes = []; // Hitbox class
        this.layeredImages = []; // Texture class
    }
}