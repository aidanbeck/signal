const backgroundMusic = new Audio("./sound/signal.m4a");
let trackStarted = false;
function startTrack() {
    if (trackStarted) { return; }
    
    backgroundMusic.volume = 0.6;
    backgroundMusic.loop = true;
    backgroundMusic.play();
    trackStarted = true;
}

const move = new Audio("./sound/move.mp3");
move.volume = 0.05;

const notif = new Audio("./sound/notif.mp3");
notif.volume = 0.6;

const abilityConsoleClick = new Audio("./sound/abilityConsoleClick.mp3");
const acceptStatus = new Audio("./sound/acceptStatus.mp3");
const drawing = new Audio("./sound/drawing.mp3");
const launchbutton = new Audio("./sound/launchbutton.mp3");
const miss = new Audio("./sound/miss.mp3");
const missilelaunch = new Audio("./sound/missilelaunch.mp3");
const radarscreenclicking = new Audio("./sound/radarscreenclicking.mp3");
const successhit = new Audio("./sound/sucesshit.mp3");

const numpads = [
    new Audio("./sound/numpad1bruh.mp3"),
    new Audio("./sound/numpad2bruv.mp3"),
    new Audio("./sound/numpad3lad.mp3"),
    new Audio("./sound/numpad4bro.mp3"),
];




export {
    startTrack,

    move,
    notif,
    abilityConsoleClick,
    acceptStatus,
    drawing,
    launchbutton,
    miss,
    missilelaunch,
    radarscreenclicking,
    successhit,

    numpads
}