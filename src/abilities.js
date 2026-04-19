import { ships, setAbilityVisual } from "./main.js";

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

function launchMissile() {
  let x = document.getElementById("xInput").value;
  let y = document.getElementById("yInput").value;
  let hits = SUB.hits(x, y);

  hits && setAbilityVisual({ type: "hit", text: "You hit the sub!"});
  !hits && setAbilityVisual({ type: "miss", text: "You missed."});
}

function addListener(id, func) {
    document.getElementById(id).addEventListener("click", func);
}

addListener("distanceAbility", distanceAbility);
addListener("bouyAbility", bouyAbility);
addListener("longitudeAbility", longitudeAbility);
addListener("latitudeAbility", latitudeAbility);
addListener("radius2kAbility", radius2kAbility);
addListener("radius4kAbility", radius4kAbility);
addListener("radius8kAbility", radius8kAbility);
addListener("launchMissile", launchMissile);