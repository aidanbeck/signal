import { ships, setAbilityVisual } from "./main.js";

const SHIP = ships[0];
const SUB = ships[1];
const BOUEY = ships[2];

function distanceAbility() {

  const distance = SHIP.distance(SUB);
  setAbilityVisual({ type: 'distance', x: SHIP.x, y: SHIP.y, r: distance});
  console.log("kilometers: " + SHIP.distance(SUB) / SHIP.tileSize);

}

function boueyAbility() {

    const shipIsCloser = SHIP.isCloserToBouey(SUB, BOUEY);

    if (shipIsCloser) {
        console.log("Bouey: You are closer to me than the sub is.");
    } else {
        console.log("Bouey: The sub is closer to me than you are.")
    }
}

function longitudeAbility() {
    const eastWest = SHIP.longitude(SUB);

    if (eastWest == -1) {
        console.log("The sub is west of you.");
        setAbilityVisual({ type: 'west', x: SHIP.x, y: SHIP.y});
    } else {
        console.log("The sub is east of you.");
        setAbilityVisual({ type: 'west', x: SHIP.x, y: SHIP.y});
    }

    
}

function latitudeAbility() {
    const northSouth = SHIP.latitude(SUB);

    if (northSouth == -1) {
        console.log("The sub is north of you.");
        setAbilityVisual({ type: 'north', x: SHIP.x, y: SHIP.y});
    } else {
        console.log("The sub is south of you.");
        setAbilityVisual({ type: 'south', x: SHIP.x, y: SHIP.y});
    }
}

function radiusAbility(searchRadius) {
    const withinRadius = SHIP.radius(SUB, searchRadius * SHIP.tileSize);

    if (withinRadius) {
        console.log(`Sub is within ${searchRadius} kilometers.`);
        setAbilityVisual({ type: 'radius', x: SHIP.x, y: SHIP.y, r: searchRadius * SHIP.tileSize, subInsideRadius: true});
    }
    else {
        console.log(`Sub is beyond ${searchRadius} kilometers.`);
        setAbilityVisual({ type: 'radius', x: SHIP.x, y: SHIP.y, r: searchRadius * SHIP.tileSize, subInsideRadius: false});
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

  hits && console.log("You hit the sub!");
  !hits && console.log("You missed.");
}

function addListener(id, func) {
    document.getElementById(id).addEventListener("click", func);
}

addListener("distanceAbility", distanceAbility);
addListener("boueyAbility", boueyAbility);
addListener("longitudeAbility", longitudeAbility);
addListener("latitudeAbility", latitudeAbility);
addListener("radius2kAbility", radius2kAbility);
addListener("radius4kAbility", radius4kAbility);
addListener("radius8kAbility", radius8kAbility);
addListener("launchMissile", launchMissile);