export const moveSound = new Audio("./sound/move.mp3");
moveSound.volume = 0.05;

export const abilitySound = new Audio("./sound/notif.mp3");
abilitySound.volume = 0.6;

export const backgroundMusic = new Audio("./sound/background.m4a");
let trackStarted = false;
export function startTrack() {
    if (trackStarted) { return; }
    
    backgroundMusic.volume = 0.6;
    backgroundMusic.loop = true;
    backgroundMusic.play();
    trackStarted = true;
}