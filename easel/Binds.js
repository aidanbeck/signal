class BindableFunction {
    constructor (downFunction, upFunction) {
        this.downFunction = downFunction;
        this.upFunction = upFunction;
    }
}

class BindableVariable {
    constructor (variable, downValue, upValue) {
        this.variable = variable; // make sure this is a pointer, not a copy.
        this.downValue = downValue;
        this.upValue = upValue;
    }
}

export default class Binds {
    constructor(element = document) {

        const binds = [];
        element.addEventListener('keydown', keyDown);
        element.addEventListener('keyup', keyUp);
    }

    bindToVariable(key, variable, downValue = true, upValue = false) {
        const bind = new BindableVariable(variable, downValue, upValue);

        !this.binds[key] && (this.binds[key] = [])
    }

    bindToFunction(key, variable, downFunction = () => {}, upFunction = () => {}) { }

    keyDown(event) {

        let key = event.key;

        this.binds[key] && console.log("exists"); 

    }

    keyUp(event) {

        let key = event.key;
    }
}