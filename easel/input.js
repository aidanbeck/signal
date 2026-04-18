document.addEventListener('keydown', inputOn);
document.addEventListener('keydown', inputOff);

let binds = [];

function inputOn(event) {
    let bind = binds[event.key];
    bind.downFunction();
    bind.on = true;
}

function inputOff(event) {
    let bind = binds[event.key];
    // bind.upFunction();
    bind.on = false;
}

class Bind {
    constructor (key, downFunction, upFunction = null) {
        this.key = key;
        this.downFunction = downFunction;
        this.upFunction = upFunction;
        this.pressing = false;

        binds[key] = this;
    }
}

export default Bind;