/*
	Creates a Responsive JS Canvas.
	- Creates Canvas & Exposes CTX
	- Manages resizing the resolution width & height, with preference rules.
	- Helpers for getting the X,Y coordinates of pointer events.
	
	Future Features:
	- isCoordinateOnScreen(x, y)
	- clear()
	- Scaling The Resolution / Zooming In & Out
	- Convert Mobile Touch Events to Pointer Events (Problem seen in Sequence, may find better solution)
	- this.centerCoordinate variable, could replace the "Origin" cardinal direction system.
		- upon resizing, this.centerCoordinate will be updated for external things to call.
		- wait to implement until an "offsets" system is invented.
*/

export default class Theatre {
	constructor(canvas, width = 256, height = 256) {
		
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.canvas.width = width;
		this.canvas.height = height;
		this.preventOddDimensions();
		
		this.origin = "NW";
		this.redraw = () => {};
		
		this.preferredWidth = width;
		this.preferredHeight = height;
		this.widthConsistent = false;
		this.heightConsistent = false;
		this.longerDimensionConsistent = false;
		this.shorterDimensionConsistent = false;
		
		this.observer = new ResizeObserver((entries) => this.onResize(entries));
		this.observer.observe(canvas);
	}
	
	addEventListener(type, func) {
		this.canvas.addEventListener(type, func);
	}
	
	makeFullScreen() {
		this.canvas.style.width = "100vw"
		this.canvas.style.height = "100vh";
	}
	
	getEventCoordinates(event) {
		
		// Account for canvas context origin translation
		const transform = this.ctx.getTransform();
		const xOffset = transform.e;
		const yOffset = transform.f;
		
		const rect = this.canvas.getBoundingClientRect();
		let horizontalPixelScale = rect.width / this.canvas.width;
		let verticalPixelScale = rect.height / this.canvas.height;

        let x = event.clientX / horizontalPixelScale - rect.left - xOffset;
	    let y = event.clientY / verticalPixelScale - rect.top - yOffset;
		
		return { x, y };
	}
	
	onResize(entries) {

		const contentRect = entries[0].contentRect;
		const width = contentRect.width;
		const height = contentRect.height;

		let newResolution = this.getNewResolution(width, height);

		this.canvas.width = newResolution.width;
		this.canvas.height = newResolution.height;
		this.preventOddDimensions();
		
		this.translateOrigin(this.origin);		
		this.redraw();
	}
	
	translateOrigin(cardinalDirection) {

		const width = this.canvas.width;
		const height = this.canvas.height;
	
		switch (cardinalDirection) {
			
			case "N":  this.ctx.translate( width/2, 0        ); break;
			case "S":  this.ctx.translate( width/2, height   ); break;
			case "E":  this.ctx.translate( width,   height/2 ); break;
			case "W":  this.ctx.translate( 0,       height/2 ); break;
			case "NW": this.ctx.translate( 0,       0        ); break;
			case "NE": this.ctx.translate( width,   0        ); break;
			case "SW": this.ctx.translate( 0,       height   ); break;
			case "SE": this.ctx.translate( width,   height   ); break;
			case "CENTER":
			default:   this.ctx.translate( width/2, height/2 );
		}
	}
	
	getNewResolution(availableWidth, availableHeight) {
		
		// Defined here because parameters can be changed after initialization by the developer.
		this.staticDimensions = (this.widthConsistent && this.heightConsistent) || (this.longerDimensionConsistent && this.shorterDimensionConsistent);
		this.fluidDimensions = !this.widthConsistent && !this.heightConsistent && !this.longerDimensionConsistent && !this.shorterDimensionConsistent;
		
		if (this.staticDimensions) {
			return { width: this.preferredWidth, height: this.preferredHeight };
		}
		
		if (this.fluidDimensions) {
			return { width: availableWidth, height: availableHeight };
		}
		
		if (this.longerDimensionConsistent) {
			if (availableWidth > availableHeight){
				this.widthConsistent = true;
				this.heightConsistent = false;
			} else {
				this.widthConsistent = false;
				this.heightConsistent = true;
			}
		}
		
		if (this.shorterDimensionConsistent) {
			if (availableWidth < availableHeight){
				this.widthConsistent = true;
				this.heightConsistent = false;
			} else {
				this.widthConsistent = false;
				this.heightConsistent = true;
			}
		}

		if (this.widthConsistent) {
			const pixelRatio = availableWidth / this.preferredWidth; // use the width to find out how many theatre pixels there are per screen pixel
			const newHeight = availableHeight / pixelRatio;
			return { width: this.preferredWidth, height: newHeight };
		}
		
		if (this.heightConsistent) {
			const pixelRatio = availableHeight / this.preferredHeight; // use the height to find out how many theatre pixels there are per screen pixel
			const newWidth = availableWidth / pixelRatio;
			return { width: newWidth, height: this.preferredHeight };
		}

	}

	preventOddDimensions() {
		const widthIsOdd = Math.abs(this.canvas.width % 2) === 1;
		const heightIsOdd = Math.abs(this.canvas.height % 2) === 1;

		widthIsOdd && this.canvas.width++;
		heightIsOdd && this.canvas.height++;

	}
}