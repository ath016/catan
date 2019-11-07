/* VARIABLES **************************************************** */

// canvas setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// text colors
const textColor = 'black';
const highlightColor =  'red';
const backgroundColor = '#000';

// tile color
const colorLumber = '#739877';
const colorGrain = '#eec67e';
const colorOre = '#8e8e8c';
const colorBrick = '#9c7a71';
const colorSheep = '#a9b470';
const colorWater = '#37566b';
const colorRobber = '#555';

// standard map
const map0 = {
	tileCount: [
		{type:'lumber', amount:4, color:colorLumber},
		{type:'grain', amount:4, color:colorGrain},
		{type:'ore', amount:3, color:colorOre},
		{type:'brick', amount:3, color:colorBrick},
		{type:'sheep', amount:4, color:colorSheep},
		{type:'nothing', amount:1, color:colorRobber}
	],
	boardLayout: [3,4,5,4,3],
	numberDist: [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12],
	port: [
		{location:0, direction:4, trade:'3 ?:1'},
		{location:1, direction:5, trade:'2 sheep:1'},
		{location:3, direction:3, trade:'2 ore:1'},
		{location:6, direction:5, trade:'3 ?:1'},
		{location:11, direction:0, trade:'3 ?:1'},
		{location:12, direction:3, trade:'2 grain:1'},
		{location:15, direction:1, trade:'2 brick:1'},
		{location:16, direction:2, trade:'3 ?:1'},
		{location:17, direction:1, trade:'2 lumber:1'}
	]
};

// 5-6 player map
const map1 = {
	tileCount: [
		{type:'lumber', amount:6, color:colorLumber},
		{type:'grain', amount:6, color:colorGrain},
		{type:'ore', amount:5, color:colorOre},
		{type:'brick', amount:5, color:colorBrick},
		{type:'sheep', amount:6, color:colorSheep},
		{type:'nothing', amount:2, color:colorRobber}
	],
	boardLayout: [3,4,5,6,5,4,3],
	numberDist: [2,3,3,3,4,4,4,5,5,5,6,6,6,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12],
	port: [
		{location:0, direction:4, trade:'3 ?:1'},
		{location:1, direction:5, trade:'2 sheep:1'},
		{location:6, direction:5, trade:'3 ?:1'},
		{location:7, direction:3, trade:'2 ore:1'},
		{location:17, direction:0, trade:'3 ?:1'},
		{location:18, direction:3, trade:'2 sheep:1'},
		{location:22, direction:1, trade:'2 brick:1'},
		{location:23, direction:3, trade:'2 grain:1'},
		{location:27, direction:2, trade:'3 ?:1'},
		{location:28, direction:1, trade:'2 lumber:1'},
		{location:29, direction:0, trade:'3 ?:1'}
	]
};

const map2 = {
	tileCount: [
		{type:'lumber', amount:6, color:colorLumber},
		{type:'grain', amount:6, color:colorGrain},
		{type:'ore', amount:5, color:colorOre},
		{type:'brick', amount:6, color:colorBrick},
		{type:'sheep', amount:5, color:colorSheep},
		{type:'nothing', amount:11, color:colorRobber}
	],
	boardLayout: [7,8,9,8,7],
	numberDist: [3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11],
	port: [
		{location:0, direction:4, trade:'2 sheep:1'},
		{location:2, direction:4, trade:'3 ?:1'},
		{location:4, direction:5, trade:'2 grain:1'},
		{location:6, direction:5, trade:'3 ?:1'},
		{location:7, direction:3, trade:'3 ?:1'},
		{location:14, direction:0, trade:'2 brick:1'},
		{location:24, direction:3, trade:'2 ore:1'},
		{location:31, direction:0, trade:'3 ?:1'},
		{location:32, direction:2, trade:'3 ?:1'},
		{location:34, direction:2, trade:'2 lumber:1'},
		{location:36, direction:1, trade:'3 ?:1'},
		{location:38, direction:1, trade:'2 sheep:1'}
	]
};

const map3 = {
	tileCount: [
		{type:'lumber', amount:6, color:colorLumber},
		{type:'grain', amount:6, color:colorGrain},
		{type:'ore', amount:6, color:colorOre},
		{type:'brick', amount:6, color:colorBrick},
		{type:'sheep', amount:6, color:colorSheep},
		{type:'nothing', amount:7, color:colorRobber}
	],
	boardLayout: [1,2,7,6,5,6,7,2,1],
	numberDist: [2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,12],
	port: [
		{location:0, direction:3, trade:'3 ?:1'},
		{location:0, direction:0, trade:'3 ?:1'},
		{location:3, direction:5, trade:'3 ?:1'},
		{location:3, direction:2, trade:'3 ?:1'},
		{location:5, direction:4, trade:'3 ?:1'},
		{location:7, direction:5, trade:'3 ?:1'},
		{location:9, direction:4, trade:'3 ?:1'},
		{location:9, direction:1, trade:'3 ?:1'},
		{location:16, direction:3, trade:'3 ?:1'},
		{location:20, direction:0, trade:'3 ?:1'},
		{location:27, direction:1, trade:'3 ?:1'},
		{location:27, direction:4, trade:'3 ?:1'},
		{location:29, direction:2, trade:'3 ?:1'},
		{location:31, direction:1, trade:'3 ?:1'},
		{location:33, direction:2, trade:'3 ?:1'},
		{location:33, direction:5, trade:'3 ?:1'},
		{location:36, direction:0, trade:'3 ?:1'},
		{location:36, direction:3, trade:'3 ?:1'},
	]
};

// assign map variable
let {tileCount, boardLayout, numberDist, port} = map0;

// check map
checkMap();

// tile size
let size = 50;
const increment = 5;
const sqrt3 = Math.sqrt(3);

// font
const font = 'px Times New Roman';
const textSizingHorz = 2;
const textSizingVert = 0.1;

// key binds
const keyMap = new Map();
keyMap.set('ArrowRight', {nextBoard:true, prevBoard:false, nextNumber:false, prevNumber:false, increase: false, decrease: false});
keyMap.set('ArrowLeft', {nextBoard:false, prevBoard:true, nextNumber:false, prevNumber:false, increase: false, decrease: false});
keyMap.set('ArrowUp', {nextBoard:false, prevBoard:false, nextNumber:true, prevNumber:false, increase: false, decrease: false});
keyMap.set('ArrowDown', {nextBoard:false, prevBoard:false, nextNumber:false, prevNumber:true, increase: false, decrease: false});
keyMap.set('-', {nextBoard:false, prevBoard:false, nextNumber:false, prevNumber:true, increase: false, decrease: true});
keyMap.set('=', {nextBoard:false, prevBoard:false, nextNumber:false, prevNumber:true, increase: true, decrease: false});

// object
const board = new Board();
const logic = new Logic();
const ocean = new Ocean();

/* OBJECT ******************************************************* */

// text box
function TextBox(start, end, textColor, text) {
	// properties
	this.start = start;
	this.end = end;
	this.text = text.toString().split('\n');
	this.width = this.end.x - this.start.x;
	this.height = Math.min(
		(this.end.y - this.start.y) / this.text.length,
		((this.end.x - this.start.x) * textSizingHorz) / Math.max.apply(
			null, this.text.map(text => {return text.length;}))
	); // end of min
	this.textColor = textColor;
	this.textAlign = 'center';
	this.textAlignVert = 'middle';
	
	// draw function
	this.draw = function() {
		// draw background
		//c.fillRect(this.start.x, this.start.y, this.width, this.end.y - this.start.y);
		
		// set text properties
		c.font = this.height + font;
		c.fillStyle = this.textColor;
		c.textAlign = this.textAlign;
		c.textBaseline = this.textAlignVert;
		
		// draw text
		for(var i = 0; i < this.text.length; i++) {
			c.fillText(
				this.text[i],
				this.width / 2 + this.start.x,
				this.height / 2 + this.start.y + this.height * textSizingVert + i * this.height
			);
		} // end of for
	} // end of draw
	
	// check location
	this.check = function(location) {
		return this.start.x <= location.x && location.x <= this.end.x && this.start.y <= location.y && location.y <= this.end.y;
	} // end of check location
	
	// set text
	this.setText = function(text) {
		// split text into lines
		this.text = text.toString().split('\n');
		
		// compute new height
		this.height = Math.min(
			(this.end.y - this.start.y) / this.text.length,
			((this.end.x - this.start.x) * textSizingHorz) / Math.max.apply(null, this.text.map(text => {return text.length;}))
		); // end of min
	} // end of set text
	
	// set color
	this.setColor = function(color) {
		this.textColor = color;
	} // end of set color
	
	// resize
	this.resize = function(start, end) {
		// update properties
		this.start = start;
		this.end = end;
		this.width = this.end.x - this.start.x;
		this.height = Math.min(
			(this.end.y - this.start.y) / this.text.length,
			((this.end.x - this.start.x) * textSizingHorz) / Math.max.apply(null, this.text.map(text => {return text.length;}))
		); // end of min
	} // end of resize
} // end of text box class */

function Item(start, size, type) {
	// properties
	this.start = start;
	this.size = size;
	this.type = type;
	
	// draw object
	this.draw = function() {
		c.globalAlpha = 0.5;
		c.fillStyle = '#FFF';
		
		switch(type.type) {
			case 'lumber':
				c.beginPath();
				c.moveTo(this.start.x + this.size*sqrt3/2, this.start.y + this.size*.5);
				c.lineTo(this.start.x + this.size*(sqrt3/2 - .15), this.start.y + this.size*1.6);
				c.lineTo(this.start.x + this.size*(sqrt3/2 + .15), this.start.y + this.size*1.6);
				c.lineTo(this.start.x + this.size*sqrt3/2, this.start.y + this.size*.5);
				c.fill();
				
				c.beginPath();
				c.moveTo(this.start.x + this.size*(sqrt3/2 - .45), this.start.y + this.size*.4);
				c.lineTo(this.start.x + this.size*(sqrt3/2 - .6), this.start.y + this.size*3/2);
				c.lineTo(this.start.x + this.size*(sqrt3/2 - .3), this.start.y + this.size*3/2);
				c.lineTo(this.start.x + this.size*(sqrt3/2 - .45), this.start.y + this.size*.4);
				c.fill();
				
				c.beginPath();
				c.moveTo(this.start.x + this.size*(sqrt3/2 +.45), this.start.y + this.size*.4);
				c.lineTo(this.start.x + this.size*(sqrt3/2 + .3), this.start.y + this.size*3/2);
				c.lineTo(this.start.x + this.size*(sqrt3/2 + .6), this.start.y + this.size*3/2);
				c.lineTo(this.start.x + this.size*(sqrt3/2 + .45), this.start.y + this.size*.4);
				c.fill();
				break;
			
			case 'grain':
				c.beginPath();
				c.ellipse(this.start.x + this.size*sqrt3/2, this.start.y + this.size*.5,
									this.size/3, this.size/9, Math.PI/2, 0, Math.PI*2);
				c.fill();
				
				c.beginPath();
				c.ellipse(this.start.x + this.size*sqrt3/2 - this.size*.2, this.start.y + this.size,
									this.size/3, this.size/9, Math.PI/4, 0, Math.PI*2);
				c.fill();
				
				c.beginPath();
				c.ellipse(this.start.x + this.size*sqrt3/2 - this.size*.2, this.start.y + this.size*1.5,
									this.size/3, this.size/9, Math.PI/4, 0, Math.PI*2);
				c.fill();
				
				c.beginPath();
				c.ellipse(this.start.x + this.size*sqrt3/2 + this.size*.2, this.start.y + this.size,
									this.size/3, this.size/9, -Math.PI/4, 0, Math.PI*2);
				c.fill();
				
				c.beginPath();
				c.ellipse(this.start.x + this.size*sqrt3/2 + this.size*.2, this.start.y + this.size*1.5,
									this.size/3, this.size/9, -Math.PI/4, 0, Math.PI*2);
				c.fill();
				break;
			
			case 'ore':
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2, this.start.y + this.size*.6, this.size*.3, 0, 2 * Math.PI);
				c.fill();
				
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2 - this.size*Math.cos(Math.PI/6)*.4,
							this.start.y + this.size + this.size*Math.sin(Math.PI/6)*.4, this.size*.3, 0, 2 * Math.PI);
				c.fill();
				
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2 + this.size*Math.cos(Math.PI/6)*.4,
							this.start.y + this.size + this.size*Math.sin(Math.PI/6)*.4, this.size*.3, 0, 2 * Math.PI);
				c.fill();
				break;
			
			case 'brick':
				c.beginPath();
				c.rect(this.start.x + this.size*sqrt3/2 + this.size*.2,
							 this.start.y + this.size*1.1, this.size*.6, this.size*.3);
				c.fill();
				
				c.beginPath();
				c.rect(this.start.x + this.size*sqrt3/2 - this.size*.5,
							 this.start.y + this.size*1.1, this.size*.6, this.size*.3);
				c.fill();
				
				c.beginPath();
				c.rect(this.start.x + this.size*sqrt3/2 - this.size*.8,
							 this.start.y + this.size*.7, this.size*.6, this.size*.3);
				c.fill();
				
				c.beginPath();
				c.rect(this.start.x + this.size*sqrt3/2 - this.size*.1,
							 this.start.y + this.size*.7, this.size*.6, this.size*.3);
				c.fill();
				break;
			
			case 'sheep':
				c.beginPath();
				c.rect(this.start.x + this.size*sqrt3/2 - this.size*.3,
							 this.start.y + this.size*.7, this.size*.6, this.size*.6);
				c.fill();
				
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2,
							this.start.y + this.size*.7, this.size*.3, Math.PI, Math.PI*2);
				c.fill();
				
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2,
							this.start.y + this.size*1.3, this.size*.3, Math.PI*2, Math.PI);
				c.fill();
				
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2 - this.size*.3,
							this.start.y + this.size, this.size*.3, Math.PI/2, Math.PI*3/2);
				c.fill();
				
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2 + this.size*.3,
							this.start.y + this.size, this.size*.3, Math.PI*3/2, Math.PI/2);
				c.fill();
				break;
			
			case 'nothing':
				c.beginPath();
				c.arc(this.start.x + this.size*sqrt3/2, this.start.y + this.size, this.size*.4, 0, 2 * Math.PI);
				c.fill();
		} // end of switch
		c.globalAlpha = 1;
	} // end of draw object
	
	// resize
	this.resize = function(start, size) {
		this.start = start;
		this.size = size;
	} // end of resize
} // end of item class */

// ocean
function Ocean() {
	this.boundry = [];
	this.port = []
	
	this.generate = function() {
		// reset
		this.boundry = [];
		this.port = [];
		
		
		// bounding hexigon
		board.tiles.forEach(tile => {
			this.boundry.push(() => {
				const angle = Math.PI/3;
				const start = tile.start;
				
				c.fillStyle = colorWater;
				c.beginPath();
				c.moveTo(
					start.x + size*sqrt3/2 + size*4/sqrt3*Math.cos((0)*angle),
					start.y + size + size*4/sqrt3*Math.sin((0)*angle)
				);
				
				for(let i = 0; i < 6; i++) {
					c.lineTo(
						start.x + size*sqrt3/2 + size*4/sqrt3*Math.cos((-i-1)*angle),
						start.y + size + size*4/sqrt3*Math.sin((-i-1)*angle)
					);
				} // end of for
				c.fill();
			});
		});
		
		// generate ports
		port.forEach(value => {
			this.port.push(() => {
				const angle = Math.PI/3
				const start = board.tiles[value.location].start;
				const grd = c.createLinearGradient(
					start.x + size*sqrt3/2 + size*sqrt3*Math.cos(value.direction*angle),
					start.y + size + size*sqrt3*Math.sin(value.direction*angle),
					start.x + size*sqrt3/2 + size*sqrt3/2*Math.cos(value.direction*angle),
					start.y + size + size*sqrt3/2*Math.sin(value.direction*angle)
				);
				grd.addColorStop(.5, colorWater);
				grd.addColorStop(1,"white");

				c.fillStyle = grd;
				c.beginPath();
				c.moveTo(
					start.x + size*sqrt3/2 + size*sqrt3*Math.cos(value.direction*angle),
					start.y + size + size*sqrt3*Math.sin(value.direction*angle)
				);
				c.lineTo(
					start.x + size*sqrt3/2 + size*Math.cos((value.direction-0.5)*angle),
					start.y + size + size*Math.sin((value.direction-0.5)*angle)
				);
				c.lineTo(
					start.x + size*sqrt3/2 + size*Math.cos((value.direction+0.5)*angle),
					start.y + size + size*Math.sin((value.direction+0.5)*angle)
				);
				c.lineTo(
					start.x + size*sqrt3/2 + size*sqrt3*Math.cos(value.direction*angle),
					start.y + size + size*sqrt3*Math.sin(value.direction*angle)
				);
				c.fill();

				// set text properties
				c.font = size/3 + font;
				c.fillStyle = 'white';
				c.textAlign = 'center';
				c.textBaseline = 'middle';
				
				c.fillText(
					value.trade,
					start.x + size*sqrt3/2 + size*sqrt3*Math.cos(value.direction*angle),
					start.y + size + size*sqrt3*Math.sin(value.direction*angle)
				);
			});
		});
	} // end of generate ocean
	
	this.draw = function() {
		// draw ocean
		this.boundry.forEach(fn => fn());
		
		// draw port
		this.port.forEach(fn => fn());
	} // end of draw
} // end of ocean class

// tile
function Tile(start, size, type) {
	// properties
	this.start = start;
	this.size = size;
	this.type = type;
	this.text = new TextBox(
		{x:this.start.x, y:this.start.y + this.size/2},
		{x:this.start.x + this.size*sqrt3, y:this.start.y + this.size*3/2},
		textColor, ''
	);
	this.item = new Item(this.start, this.size, this.type);
	
	// draw object
	this.draw = function() {
		c.beginPath();
		c.moveTo(this.start.x + this.size*sqrt3/2, this.start.y);
		c.lineTo(this.start.x, this.start.y + this.size/2);
		c.lineTo(this.start.x, this.start.y + this.size*3/2);
		c.lineTo(this.start.x + this.size*sqrt3/2, this.start.y + this.size*2);
		c.lineTo(this.start.x + this.size*sqrt3, this.start.y + this.size*3/2);
		c.lineTo(this.start.x + this.size*sqrt3, this.start.y + this.size/2);
		c.lineTo(this.start.x + this.size*sqrt3/2, this.start.y);
		
		c.fillStyle = this.type.color;
		c.fill();
		
		c.strokeStyle = "white";
		c.stroke();
		
		this.item.draw();
		this.text.draw();
	} // end of draw object
	
	// set number
	this.setNumber = function(number) {
		this.text.setText(number);
	} // end of set number
	
	// set text color
	this.setTextColor = function(color) {
		this.text.setColor(color);
	} // end of set text color
	
	// resize
	this.resize = function(start, size) {
		this.start = start;
		this.size = size;
		
		this.text.resize(
			{x:this.start.x, y:this.start.y + this.size/2},
			{x:this.start.x + this.size*sqrt3, y:this.start.y + this.size*3/2}
		);
		
		this.item.resize(this.start, this.size);
	} // end of resize
} // end of question box class


// board
function Board() {
	// property
	this.tiles = [];
	this.numbers = JSON.parse(JSON.stringify(numberDist));
	
	// draw tiles
	this.draw = function() {		
		this.tiles.forEach(tile => {
			tile.draw();
		}); // end of for each
	} // end of draw
	
	// set tiles
	this.setTiles = function(tiles) {
		this.tiles = tiles;
		this.linker();
	} // end of set tiles
	
	// set numbers
	this.setNumbers = function(numbers) {
		this.numbers = numbers
		this.linker();
	} // end of set numbers
	
	// link tiles with numbers
	this.linker = function() {
		for(let i = 0, j = 0; i < this.tiles.length; i++) {
			if(this.tiles[i].type.type != 'nothing') {
				this.tiles[i].setNumber(this.numbers[j]);
				this.tiles[i].setTextColor(this.numbers[j] >= 6 && this.numbers[j] <= 8? highlightColor: textColor);
				j++;
			} // end of if
		} // end of for
	} // end of link numbers
	
	// resize card
	this.resize = function(index, start, size) {
		this.tiles[index].resize(start, size);
	} // end of resize card
} // end of question board object

// game logic
function Logic() {
	// property
	this.resource = JSON.parse(JSON.stringify(tileCount));
	this.amount = this.resource.map(type => type.amount).reduce((a,b) => a + b, 0);
	// history
	this.tileHistory = [];
	this.tileIndex = -1;
	this.numberHistory = [];
	this.numberIndex = -1;
	
	// return resourse type
	this.getResource = function() {
		let resource = undefined;
		
		// find free resource
		do {
			resource = this.resource[Math.floor(Math.random() * this.resource.length)];
		} // end of do
		while(!resource.amount);
		
		// update stock of resource
		this.amount--;
		resource.amount--;
		
		// return resource
		return resource;
	} // end of get resourse
	
	// create new tiles
	this.newTiles = function() {
		// reset property
		this.resource = JSON.parse(JSON.stringify(tileCount));
		this.amount = this.resource.map(type => type.amount).reduce((a,b) => a + b, 0);
		
		// create new tiles
		this.tileHistory.push(addTile());
		this.tileIndex = this.tileHistory.length - 1;
	} // end of reset
	
	// move to next tiles
	this.nextTiles = function() {
		// create new tiles
		if(this.tileIndex == this.tileHistory.length - 1) {
			this.newTiles();
		} // end of if
		
		// move to next tiles
		else {
			this.tileIndex++;
		} // end of else
		
		// set tiles
		board.setTiles(this.tileHistory[this.tileIndex]);
		// resize tiles
		resizeTile()
	} // end of next board
	
	// previous tiles
	this.prevTiles = function() {
		// move to prev tiles
		if(this.tileIndex > 0) {
			this.tileIndex--;
			
			// set tiles
			board.setTiles(this.tileHistory[this.tileIndex]);
			// resize tiles
			resizeTile();
		} // end of if
	} // end of previous board
	
	// create new numbers
	this.newNumbers = function() {
		this.numberHistory.push(addNumber());
		this.numberIndex = this.numberHistory.length - 1;
	} // end of new Numbers
	
	// move to next numbers
	this.nextNumbers = function() {
		// create new numbers
		if(this.numberIndex == this.numberHistory.length - 1) {
			this.newNumbers();
		} // end of if
		
		// move to next numbers
		else {
			this.numberIndex++;
		} // end of else
		
		// set numbers
		board.setNumbers(this.numberHistory[this.numberIndex]);
	} // end of next number
	
	// move to previous numbers
	this.prevNumbers = function() {
		if(this.numberIndex > 0) {
			this.numberIndex--;
			
			// set numbers
			board.setNumbers(this.numberHistory[this.numberIndex]);
		} // end of if
	} // end of previous number
} // end of logic object


/* FUNCTIONS **************************************************** */

// initiation
function init() {
	// set canvas dimension
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
} // end of init

// animation function
function animate() {
	// clear screen
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	// draw background
	c.fillStyle = backgroundColor;
	c.fillRect(0, 0, canvas.width, canvas.height);
	
	// draw ocean
	ocean.draw();
	
	// draw board
	board.draw();
} // end of animate

// check map
function checkMap() {
	const tileAmount = tileCount.map(type => type.amount).reduce((a,b) => a + b, 0);
	const rowAmount = boardLayout.reduce((a,b) => a + b, 0);
	const numberAmount = numberDist.length;
	const resourceAmount = tileCount.filter(
		resource => resource.type != 'nothing').map(
		type => type.amount).reduce((a,b) => a + b, 0);
	
	// check tile amount
	if(tileAmount < rowAmount) {
		tileCount[5].amount += rowAmount - tileAmount;
	} // end of if
	
	// check resource
	if(numberAmount < resourceAmount) {
		numberDist.push(new Array(resourceAmount - numberAmount).fill(12));
		numberDist = numberDist.flat();
	} // end of if	
} // end of check map

// add tiles
function addTile() {
	// placement variable
	const start = {x:0, y:0};
	const end = {x:canvas.width, y:canvas.height};
	const width = end.x - start.x;
	const height = end.y - start.y;
	let workingTile = undefined;
	let resource = undefined;
	const value = [];
	
	for(let i = 0; i < boardLayout.length; i++) {
		for(let j = 0; j < boardLayout[i]; j++) {
			resource = logic.getResource();
			workingTile = new Tile({
				x:start.x + j*size*sqrt3 + width/2 - boardLayout[i]*size*sqrt3/2,
				y:start.y + i*size*3/2 + (height - boardLayout.length*size*3/2 - size/2)/2}, size, resource);
			value.push(workingTile);
		} // end of inner for
	} // end of outter for
	
	return value;
} // end of add card

// add numbers
function addNumber() {
	let array = JSON.parse(JSON.stringify(numberDist));
	let value = [];
	let index = undefined;
	
	while(array.length) {
		index = Math.floor(Math.random() * array.length);
		value.push(array[index]);
		array.splice(index, 1);
	} // end of while
	
	return value;
} // end of add number

// resize tiles
function resizeTile() {
	// placement variable
	const start = {x:0, y:0};
	const end = {x:canvas.width, y:canvas.height};
	const width = end.x - start.x;
	const height = end.y - start.y;
	
	for(let i = 0; i < boardLayout.length; i++) {
		for(let j = 0; j < boardLayout[i]; j++) {
			board.resize(
				boardLayout.filter((a,b) => {if(b < i) return true}).reduce((a,b) => a + b, 0) + j, {
					x:start.x + j*size*sqrt3 + width/2 - boardLayout[i]*size*sqrt3/2,
					y:start.y + i*size*3/2 + (height - boardLayout.length*size*3/2 - size/2)/2
				}, size);
		} // end of inner for
	} // end of outter for
} // end of resize tiles

/* EVENT ******************************************************** */

window.addEventListener('resize', function() {
	init();
	resizeTile();
	ocean.generate();
	animate();
}) // end of resize event listener

window.addEventListener('keydown', function(event) {
	// check key map
	if(!keyMap.has(event.key)) {
		return;
	} // end of if
	
	// get key state
	let keyState =  keyMap.get(event.key);
	
	if(keyState.nextBoard) {
		logic.nextTiles();
	} // end of if
	
	if(keyState.prevBoard) {
		logic.prevTiles();
	} // end of if
	
	if(keyState.nextNumber) {
		logic.nextNumbers();
	} // end of if
	
	if(keyState.prevNumber) {
		logic.prevNumbers();
	} // end of if
	
	if(keyState.decrease) {
		size -= increment;
		resizeTile();
		ocean.generate();
		animate();
	} // end of if
	
	if(keyState.increase) {
		size += increment;
		resizeTile();
		ocean.generate();
		animate();
	} // end of if
	
	animate();
}) // end of keydown event listener


/* START UP ***************************************************** */

init();
logic.nextTiles();
logic.nextNumbers();
ocean.generate();
animate();
