import { ships, setAbilityVisual } from "./state.js";
import {
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
} from './audio.js';

const SHIP = ships[0];
const SUB = ships[1];
const BOUY = ships[2];

function distanceAbility() {

  const distance = SHIP.distance(SUB);
  setAbilityVisual({ type: 'distance', x: SHIP.x, y: SHIP.y, r: distance,
    text: "kilometers: " + SHIP.distance(SUB) / SHIP.tileSize
  });

}

function bouyAbility() {

    const shipIsCloser = SHIP.isCloserToBouy(SUB, BOUY);

    if (shipIsCloser) {
        setAbilityVisual({ type: "bouy", text: "Bouy: You are closer."});
    } else {
        setAbilityVisual({ type: "bouy", text: "bouy: The sub is closer."});
    }
}

function longitudeAbility() {
    const eastWest = SHIP.longitude(SUB);

    if (eastWest == -1) {
        setAbilityVisual({ type: 'west', x: SHIP.x, y: SHIP.y,
            text: "The sub is west of you."
        });
    } else {
        setAbilityVisual({ type: 'east', x: SHIP.x, y: SHIP.y,
            text: "The sub is east of you."
        });
    }

    
}

function latitudeAbility() {
    const northSouth = SHIP.latitude(SUB);

    if (northSouth == -1) {
        setAbilityVisual({ type: 'north', x: SHIP.x, y: SHIP.y,
            text: "The sub is north of you."
        });
    } else {
        setAbilityVisual({ type: 'south', x: SHIP.x, y: SHIP.y,
            text: "The sub is south of you."
        });
    }
}

function radiusAbility(searchRadius) {
    const withinRadius = SHIP.radius(SUB, searchRadius * SHIP.tileSize);

    if (withinRadius) {
        setAbilityVisual({ type: 'radius', x: SHIP.x, y: SHIP.y, r: searchRadius * SHIP.tileSize, subInsideRadius: true,
            text: `Sub is within ${searchRadius} kilometers.`
        });
    }
    else {
        setAbilityVisual({ type: 'radius', x: SHIP.x, y: SHIP.y, r: searchRadius * SHIP.tileSize, subInsideRadius: false,
            text: `Sub is beyond ${searchRadius} kilometers.`
        });
    }
}

function radius2kAbility() {
 radiusAbility(2);
}
function radius4kAbility() {
 radiusAbility(4);
}
function radius8kAbility() {
 radiusAbility(8);
}

function launchMissile(x, y) {
  let hits = SUB.hits(x, y);

  if (hits) {
    setAbilityVisual({ type: "hit", text: "You hit the sub!"});

    let newSound = successhit.cloneNode(); // !!! unoptomized
    newSound.currentTime = -2;
    // newSound.volume = 0.05;
    newSound.play();
    return true;
  } else {
    setAbilityVisual({ type: "miss", text: "You missed."});

    let newSound = miss.cloneNode(); // !!! unoptomized
    newSound.currentTime = -5;
    // newSound.volume = 0.05;
    newSound.play();
    return false;
  }

}

export {
    distanceAbility,
    bouyAbility,
    longitudeAbility,
    latitudeAbility,
    radius2kAbility,
    radius4kAbility,
    radius8kAbility,
    launchMissile
}