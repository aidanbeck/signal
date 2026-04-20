import Ship from '../src/Ship.js';

// Game State
export const ships = [
    new Ship(0, 0, 5, "rgba(0, 200, 0, 0.8)"),
    new Ship(0, 0, 5,"rgba(200, 0, 0, 0)"), // !!! set to 0.8 to visualize
    new Ship(0, 0, 5, "rgba(0, 0, 200, 0.8)"),
]

export function setAbilityVisual(visual) {
    abilitySound.play();
    abilitySound.currentTime = 0.4;
    Object.assign(abilityVisual, visual);
}

export let abilityVisual = { text: ""};