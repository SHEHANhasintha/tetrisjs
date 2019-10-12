/*
//Example object litteral.!!!!!!!!!

GraniteRight {movableRight: true, movableLeft: true, movableUp: true, movableDown: true, rotatableLeft: true, …}
	
	brickValue: 0
	center: {x: 35, y: 20}
	centerBrickX: 20
	centerBrickY: 35
	color: "rgb(61,56,222)"
	cos90: 0
	downMove: true
	eveMment: true
	gra: 0.1
	leftMove: true
	moo: 0
	movableDown: true
	movableLeft: true
	movableRight: true
	movableUp: true
	name: "basault13"
	ncos90: 0
	nsin90: -1
	posLocked: false
	rightMove: true
	rotatableLeft: true
	rotatableRight: true
	rotateLeft: true
	rotateRight: true
	shapeArr: (4) [{…}, {…}, {…}, {…}]
	sin90: 1
	tileArr: (10000) [Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, Tile, …]
	tiles: {[0:0]: {…}, [0:1]: {…}, [0:2]: {…}, [0:3]: {…}, [0:4]: {…}, …}
	upMove: true
	getBasaltId: (...)

		__proto__: CharObject
		constructor: class GraniteRight
		getBasaltId: (...)
		makeObject: ƒ makeObject()
		moveUp: ƒ moveUp()

			__proto__: CollitionDitection
			addBrick: ƒ addBrick(currentPos,fillValue)
			constructor: class CharObject
			draw: ƒ draw()
			eventMovement: eventMovement(){
			document.addEventListener('keypress',(e) => {…}
			getBasaltId: (...)
			gotoCenter: ƒ gotoCenter(currentPos)
			gotoDown: ƒ gotoDown(currentPos)
			gotoLeft: ƒ gotoLeft(currentPos)
			gotoRight: ƒ gotoRight(currentPos)
			gotoUp: ƒ gotoUp(currentPos)
			gravity: ƒ gravity()
			logBasalt: ƒ logBasalt()
			moveDown: ƒ moveDown()
			moveLeft: ƒ moveLeft()
			moveRight: ƒ moveRight()
			moveUp: ƒ moveUp()
			possDistanceUpdate: ƒ possDistanceUpdate()
			randomColorGenrator: ƒ randomColorGenrator(value)
			resetArr: ƒ resetArr()
			turnLeft: ƒ turnLeft()
			turnRight: ƒ turnRight()
			set basaltId: ƒ basaltId(id)
			get getBasaltId: ƒ getBasaltId()

				__proto__:
				constructor: class CollitionDitection
				plankCheck: ƒ plankCheck()

					__proto__: Object

*/



/*
Example tile coardinate system!!!!!!!!!!!!!!
	bottomRightX: 130
	bottomRightY: 700
	canvas: CanvasRenderingContext2D {canvas: canvas#canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
	codenessX: 12
	codenessY: 0
	downLeftX: 120
	downLeftY: 700
	fillValue: false
	tileColor: undefined
	tileId: 1200
	topLeftX: 120
	topLeftY: 690
	topRightX: 130
	topRightY: 690

*/



//real time communication with the server over to the client
class SocketWs{

	constructor(ip,port){
		this.ip = ip;
		this.port = port;
		this.portStatus = false;
	}

	createWsServer(){
		try{
			const wss = new WebSocket(`ws://${this.ip}:${this.port}`);
			this.portStatus = true;
			this.loggingPortInfo('open');
			return wss;
		} catch(event){
			this.portStatus = false;
			this.loggingPortInfo('unable to connect');
			console.log(event);
			return false;

		}

	}

	wsServerEvents(event,callback){
		socktSet.on('${event}',callback);
	}

	loggingPortInfo(){
		console.log(`The port is ${this.portStatus == false ? 'unable to connect' : 'open'}`)
	}

}

//define movable tiles
class Tile{
	constructor(tileId,codenessX,codenessY,downLeftX,downLeftY,topLeftX,topLeftY,topRightX,topRightY,bottomRightX,bottomRightY,canvas,tileColor){
		//codenessX,codenessY,downLeftX,downLeftY,topLeftX,topLeftY,topRightX,topRightY,bottomRightX,bottomRightY,this.canvas,tileColor
		//this.canvas = canvas.getContext('2d');
		this.tileId = tileId;
		this.codenessX = codenessX;
		this.codenessY = codenessY;
		this.downLeftX = downLeftX;
		this.downLeftY = downLeftY;
		this.topRightX = topRightX;
		this.topRightY = topRightY;
		this.topLeftX = topLeftX;
		this.topLeftY = topLeftY;
		this.bottomRightX = bottomRightX;
		this.bottomRightY = bottomRightY;
		this.tileColor = tileColor;
		this.fillValue = false;
		this.canvas = canvas;
	}

	drawlines(){
		this.canvas.beginPath();
				

		//this.canvas.strokeStyle = "#0f00";

		this.canvas.moveTo(this.bottomRightX,this.bottomRightY);
		this.canvas.lineTo(this.downLeftX,this.downLeftY);
		this.canvas.lineTo(this.topLeftX,this.topLeftY);

		this.canvas.lineTo(this.topRightX,this.topRightY);
		this.canvas.lineTo(this.bottomRightX,this.bottomRightY);
		this.canvas.fillStyle = this.tileColor;
		this.canvas.lineWidth = 0;
		this.canvas.fill();
		this.canvas.fillStyle = '#000';
		this.canvas.font = "12px Arial";
		this.canvas.fillText(  this.codenessX + ' ' + this.codenessY,this.topLeftX+5,this.topLeftY+15 );
		this.canvas.closePath();
		//this.canvas.stroke();

	}



}

//collition ditection
class CollitionDitection{
	constructor(){
		this.movableRight = true;
		this.movableLeft = true;
		this.movableUp = true;
		this.movableDown = true;

		this.rotatableLeft = true;
		this.rotatableRight = true;
	}

	plankCheck(){

		this.movableLeft = true;
		this.movableRight = true;
		this.movableUp = true;
		this.movableDown = true;

		this.rotatableLeft = true;
		this.rotatableRight = true;

		let defRFunctions = ['rotateRight','rotateLeft'];
		let defMFunctions = ['moveLeft','moveRight','moveUp','moveDown'];

		let helper = Helper;

		let change = [];

		let findCodeness;
		let tileValue;
		let codenessX;
		let codenessY;


		//moveing collaptions
		for (let y=0; y<defMFunctions.length; y++){
			for (let i=0;i<this.shapeArr.length;i++){

				let move = Helper[defMFunctions[y]](this.shapeArr[i]);
				codenessX = move[0];
				codenessY = move[1];



				findCodeness = `[${codenessX}:${codenessY}]`;
				tileValue = this.tiles[findCodeness].tileId;
				tileValue = this.tileArr[tileValue].fillValue;
				//console.log(`[${codenessX}:${codenessY}]`,defMFunctions[y],'collition',TilesManupiulate.tiles[findCodeness].fillValue);
				//console.log(`[${codenessX}:${codenessY}]`,defMFunctions[y],'collition',TilesManupiulate.tiles[findCodeness].fillValue);

				if ((this.tiles[findCodeness].name != undefined) && (this.tiles[findCodeness].name != this.shapeArr[i].name)){
				//console.log(`[${codenessX}:${codenessY}]`,defMFunctions[y],'collition',TilesManupiulate.tiles[findCodeness].fillValue);
					//console.log(this.tiles[findCodeness].name,this.tiles[findCodeness].name,this.shapeArr[i].name);
					switch (defMFunctions[y]){
						case "moveLeft":
							this.movableLeft = false;
							break;
						case "moveRight":
							this.movableRight = false;
							break;
						case "moveUp":
							this.movableUp = false;
							break;
						case "moveDown":
							this.movableDown = false;
							break;
						default:
							this.movableLeft = true;
							this.movableRight = true;
							this.movableUp = true;
							this.movableDown = true;
					}
				}	
			}
		}

		//rotation collaptions
		for (let y=0; y<defRFunctions.length; y++){
			for (let i=0;i<this.shapeArr.length;i++){

				let rotation = Helper[defRFunctions[y]](this.shapeArr[i],this.centerBrickX,this.centerBrickY);
				codenessX = rotation[0];
				codenessY = rotation[1];

				findCodeness = `[${codenessX}:${codenessY}]`;
				tileValue = this.tiles[findCodeness].tileId;
				tileValue = this.tileArr[tileValue].fillValue;

				if ((this.tiles[findCodeness].name != undefined) && (this.tiles[findCodeness].name != this.shapeArr[i].name)){
					switch (defRFunctions[y]){
						case "rotateLeft":
							this.rotatableLeft = false;
							break;
						case "rotateRight":
							this.rotatableRight = false;
							break;
						default:
							this.rotatableLeft = true;
							this.rotatableRight = true;
					}
				}


				
			}
		}
	}
}




//create tile objects
class TilesManupiulate extends CollitionDitection{
	constructor(verticalLines,horizeLines,canvasWidth,canvasHeight,canvas){
		super();
		this.verticalLines = verticalLines;
		this.horizeLines = horizeLines;

		TilesManupiulate.verticalLines = this.verticalLines;
		TilesManupiulate.horizeLines = this.horizeLines;

		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.tileWidth = this.canvasWidth /  this.horizeLines;
		this.tileHeight = this.canvasHeight / this.verticalLines;

		this.tileWidth = 10;
		this.tileHeight = 10;

		this.canvas = canvas;
		this.fillValue = false;

		this.tileCount = 0;
		this.tiles = {};
		this.arrTile = new Array();

		TilesManupiulate.tiles = this.tiles;
		TilesManupiulate.arrTile = this.arrTile;
	}

	createTile(){
		//tileId:[codenessX,codenessY,downLeftX,downLeftY,topLeftX,topLeftY,topRigthX,topRightY,bottomRightX,bottomRightY,canvas,tilecolor]
		let tileColor;
		for (let countX=0;countX<this.horizeLines;countX++){
			for (let countY=0;countY<this.verticalLines;countY++){
				let downLeftX = countX * this.tileWidth;
				let downLeftY = this.canvasHeight - countY * this.tileHeight;

				let topLeftX = downLeftX;
				let topLeftY = downLeftY - this.tileHeight;

				let topRightX = downLeftX + this.tileWidth;
				let topRightY =  downLeftY - this.tileHeight;

				let bottomRightX = downLeftX + this.tileWidth;
				let bottomRightY = downLeftY;

				let codenessX = countX;
				let codenessY = countY;


				//tileColor  = `rgba(255,255,255)`;

				let key = `[${codenessX}:${codenessY}]`;
				
				this.arrTile.push(new Tile(
					this.tileCount,				
					codenessX,
					codenessY,
					downLeftX,
					downLeftY,
					topLeftX,
					topLeftY,
					topRightX,
					topRightY,
					bottomRightX,
					bottomRightY,
					this.canvas,
					tileColor,
					this.fillValue
					));

				this.tiles[key] = {
					'tileId'	: this.tileCount,
					'codenessX' : codenessX,
					'codenessY' : codenessY,

					/*
					'downLeftX' : downLeftX,
					'downLeftY' : downLeftY,
					'topLeftX'	: topLeftX,
					'topLeftY'	: topLeftY,
					'topRightX'	: topRightX,
					'topRightY' : topRightY,
					'bottomRightX' : bottomRightX,
					'bottomRightY' : bottomRightY,*/

					'fillValue' : this.fillValue
				}

				this.tileCount += 1;
			}
		}

	}

}


//drawing pannel
class Canvas extends TilesManupiulate{
	constructor(width=window.innerWidth/2,height=window.innerHeight/2){
		super();
		this.height = height;
		this.width = width;
		this.canvas;

		Canvas.Width = this.width;
		Canvas.height = this.height;

		this.winWidth =  document.documentElement.clientWidth;
		this.winHeight =  document.documentElement.clientHeight;


	}

	makeCanvas(){
		var img = new Image();
		const canvas = document.getElementById("canvas");
		this.canvas = canvas;
		const panel = canvas.getContext("2d");
		canvas.width =  document.documentElement.clientWidth - 300;
		canvas.height =  document.documentElement.clientHeight - 100;
		
		//panel.fillStyle = "#FF0000";
		//panel.drawImage(img, 0, 0, 1000, 1000);
		//panel.fillRect(0, 0, this.height, this.width);
		//canvas.toDataURL('image/jpeg');
		return panel;
	}

	async responsiveScaller(){
		let winCheckWidth = this.winWidth;
		let winCheckHeight = this.winHeight;
		let wRatio = document.documentElement.clientWidth / this.winWidth;
		let hRatio = document.documentElement.clientHeight / this.winHeight;

		if ((winCheckWidth != document.documentElement.clientWidth) || (winCheckHeight != document.documentElement.clientHeight)){
			//console.log("this is height and width of the screen" + wRatio + "   " + hRatio );
			console.log( TilesManupiulate.arrTile);
			this.winWidth =  document.documentElement.clientWidth;
			this.winHeight =  document.documentElement.clientHeight;

			canvas.width = canvas.width * hRatio;
			canvas.height = canvas.height * hRatio;

			for (let chArr=0;chArr<TilesManupiulate.arrTile.length;chArr++){
				TilesManupiulate.arrTile[chArr].downLeftX = TilesManupiulate.arrTile[chArr].downLeftX * hRatio;
				TilesManupiulate.arrTile[chArr].topLeftX = TilesManupiulate.arrTile[chArr].topLeftX * hRatio;
				TilesManupiulate.arrTile[chArr].downLeftY = TilesManupiulate.arrTile[chArr].downLeftY * hRatio;
				TilesManupiulate.arrTile[chArr].topLeftY = TilesManupiulate.arrTile[chArr].topLeftY * hRatio;
				TilesManupiulate.arrTile[chArr].topRightX = TilesManupiulate.arrTile[chArr].topRightX * hRatio;
				TilesManupiulate.arrTile[chArr].topRightY = TilesManupiulate.arrTile[chArr].topRightY * hRatio;
				TilesManupiulate.arrTile[chArr].bottomRightX = TilesManupiulate.arrTile[chArr].bottomRightX * hRatio;
				TilesManupiulate.arrTile[chArr].bottomRightY = TilesManupiulate.arrTile[chArr].bottomRightY * hRatio;

			}
		}
	}

}

//get images and base code from the server
class XhttpReq{
	constructor(method,address){
		this.method = method;
		this.address = address;
	}

	makeRequest(){
		let result;
		let xhr = new XMLHttpRequest();
		xhr.open(this.method, this.address, false);
		xhr.onload = async function(){
			if (xhr.readyState === 4 && xhr.status === 200){
				let response = xhr.responseText;
				let binary = '';
				let encodedData;
				 console.log(xhr.status)

				for(let i=0;i<response.length-1;i++){
					binary += String.fromCharCode(response.charCodeAt(i) & 0xff);
				}

				encodedData = 'data:image/jpeg;base64,' + btoa(binary);
				result = encodedData;
				return result;
			}
		}
		xhr.overrideMimeType('text/plain; charset=x-user-defined');
		xhr.send();
		return result;
	}

	cute(){
		return "fgdfgdfgdfgdfg";
	}

}

//images for the object
class ObjectManx{
	constructor(widthOb,heightOb,location,canvas,x,y){
		this.widthOb = widthOb;
		this.heightOb = heightOb;
		this.location = location;
		this.canvas = canvas;
		this.imgDataUrl;
		this.x = x;
		this.y = y;

	}

	getImage(){
		let Xhtt = new XhttpReq('GET',this.location,true).makeRequest();
		this.imgDataUrl = Xhtt;
	}

	drawImage(){
		let image = new Image();
		image.src = this.imgDataUrl;
		//var imag=document.getElementById("img");
		//imag.src=this.imgDataUrl;
		this.canvas.drawImage(image, this.x, this.y);
	}

}




//camara
class Camara{
//lock the position to a fixed position
	constructor(scallerWidth,scallerHeight,positionLock){
		//scaller height
		this.scallerHeight = scallerHeight;
		//scaller width
		this.scallerWidth = scallerWidth;
		//middle position location
		this.positionLock = positionLock;

		//locked posotion
		this.leftTop = {};
		this.rightTop = {};
		this.bottomLeft = {};
		this.bottomRight = {};

		this.shutterWidth;
		this.shutterHeight;

		//positionArr
		this.positionArr = new Array();

		this.scaleSizeY = TilesManupiulate.verticalLines / this.scallerHeight;
		this.scaleSizeX = TilesManupiulate.horizeLines / this.scallerWidth;

		//console.log(this.scaleSizeX,this.scaleSizeY);

	}

	//scale the camara view to that position
	UpdateLock(){

		this.leftTop.x = this.positionLock.x - (this.scallerWidth/2);
		this.rightTop.x = this.positionLock.x + (this.scallerWidth/2);

		this.leftTop.y = this.positionLock.y + (this.scallerHeight/2);
		this.rightTop.y = this.positionLock.y + (this.scallerHeight/2);

		this.bottomLeft.x = this.positionLock.x - (this.scallerWidth/2);
		this.bottomRight.x = this.positionLock.x + (this.scallerWidth/2);

		this.bottomLeft.y = (this.positionLock.y - (this.scallerHeight/2));
		this.bottomRight.y = (this.positionLock.y - (this.scallerHeight/2));

		//console.log(this.leftTop,this.rightTop,this.bottomLeft,this.bottomRight)

	}

	getUpdatedPos(){
		//console.log(this.bottomLeft.y,this.bottomRight.y,this.leftTop.x,this.rightTop.x);
		//wipelist
		this.positionArr = [];
		let assignPos;
		let tileId;

		//rewrite list;
		for (let viewCollectionY=this.bottomLeft.y; viewCollectionY < this.rightTop.y; viewCollectionY++){
			for (let viewCollectionX=this.leftTop.x; viewCollectionX < this.rightTop.x; viewCollectionX++){
				 assignPos = `[${viewCollectionX}:${viewCollectionY}]`;
				 //console.log(assignPos)
				 tileId = TilesManupiulate.tiles[assignPos].tileId;
				 
				 this.positionArr.push(tileId);
			}
		}
	}

	scaller(){

		//scaleSizeX = 2.5;
		//scaleSizeY = 2.5;
		this.dragY = (TilesManupiulate.verticalLines -this.leftTop.y) * this.scaleSizeY * (Canvas.height / TilesManupiulate.verticalLines);
		
		this.dragX = (this.leftTop.x) * this.scaleSizeX * (Canvas.Width / TilesManupiulate.horizeLines);
		//console.log(this.dragY,this.scallerHeight,Canvas.height,TilesManupiulate.verticalLines)
		this.dragY = 560;

		//this.dragY = 790;
		//console.log(this.scaleSizeY,this.scaleSizeX,this.dragY,'yyyyyyyyyyyyy')
		for (let scaleCount=0;scaleCount<this.positionArr.length;scaleCount++){
			let currentPos = TilesManupiulate.arrTile[this.positionArr[scaleCount]];
			
			//TilesManupiulate.arrTile[this.positionArr[scaleCount]].codenessX = currentPos.codenessX * scaleSizeX ;
			//TilesManupiulate.arrTile[this.positionArr[scaleCount]].codenessY = currentPos.codenessY * scaleSizeY;x

			TilesManupiulate.arrTile[this.positionArr[scaleCount]].downLeftX = currentPos.downLeftX * this.scaleSizeX - this.dragX;
			TilesManupiulate.arrTile[this.positionArr[scaleCount]].bottomRightX = currentPos.bottomRightX * this.scaleSizeX - this.dragX;
			TilesManupiulate.arrTile[this.positionArr[scaleCount]].topLeftX = currentPos.topLeftX * this.scaleSizeX - this.dragX;
			TilesManupiulate.arrTile[this.positionArr[scaleCount]].topRightX = currentPos.topRightX * this.scaleSizeX - this.dragX;
			//console.log((TilesManupiulate.verticalLines -this.leftTop.y) * 2.5 * (Canvas.height / TilesManupiulate.verticalLines), this.bottomLeft.y,this.bottomRight.y , this.positionLock.x)
			TilesManupiulate.arrTile[this.positionArr[scaleCount]].downLeftY = (currentPos.downLeftY * this.scaleSizeY) - this.dragY;
			TilesManupiulate.arrTile[this.positionArr[scaleCount]].bottomRightY = currentPos.bottomRightY * this.scaleSizeY - this.dragY;
			TilesManupiulate.arrTile[this.positionArr[scaleCount]].topLeftY = currentPos.topLeftY * this.scaleSizeY - this.dragY;
			TilesManupiulate.arrTile[this.positionArr[scaleCount]].topRightY = currentPos.topRightY * this.scaleSizeY - this.dragY;
		}
	}

}

//mathmatical calculations
class Helper{
	static constructor(){
		this.sin90 = 1;
		this.cos90 = 0;
		this.nsin90 = -1;
		this.ncos90 = 0;

		this.counter = 0;
	}

	static rotateLeft(currentPoint,centerBrickX,centerBrickY){
		let codenessXDash = (currentPoint.lenToCenterX * this.cos90 - currentPoint.lenToCenterY * this.sin90) + centerBrickX;
		let codenessYDash = (currentPoint.lenToCenterX * this.sin90 + currentPoint.lenToCenterY * this.cos90) + centerBrickY;
		return [codenessXDash,codenessYDash];
	}

	static rotateRight(currentPoint,centerBrickX,centerBrickY){
		let codenessXDash = (currentPoint.lenToCenterX * this.ncos90 - currentPoint.lenToCenterY * this.nsin90) + centerBrickX;
		let codenessYDash = (currentPoint.lenToCenterX * this.nsin90 + currentPoint.lenToCenterY * this.ncos90) + centerBrickY;
		return [codenessXDash,codenessYDash];
	}

	static moveUp(currentPoint){
		let codenessXDash = currentPoint.codenessX;
		let codenessYDash = currentPoint.codenessY + 1;
		return [codenessXDash,codenessYDash];
	}

	static moveDown(currentPoint){
		let codenessXDash = currentPoint.codenessX;
		let codenessYDash = currentPoint.codenessY - 1;
		return [codenessXDash,codenessYDash];
	}

	static moveLeft(currentPoint){
		let codenessXDash = currentPoint.codenessX - 1;
		let codenessYDash = currentPoint.codenessY;
		return [codenessXDash,codenessYDash];
	}
	static moveRight(currentPoint){
		let codenessXDash = currentPoint.codenessX + 1;
		let codenessYDash = currentPoint.codenessY;
		return [codenessXDash,codenessYDash];
	}

	static printer(statement,speed){
		this.counter++;
		for (;this.counter>speed;this.counter++){
			console.log(statement);
			this.counter = 0;
		}
	}

	static pointTileArr(coadinate){
		console.log(TilesManupiulate.tileArr[coadinate]);

	}

}

//boundies
class Block{
	constructor(codenessX, codenessY, color){
		//super();
		//this.width = width;
		//this.height = height;
		this.blockCodenessX = codenessX
		this.blockCodenessY = codenessY;
		this.color = color;
		this.fillValue = true;

		this.verticalLines = TilesManupiulate.verticalLines;
		this.horizeLines = TilesManupiulate.horizeLines;

		this.solidBlockArr = new Array();
	}

	set solidBlockArray(arr = new Array()){
		this.solidBlockArr = arr;
	}

	get solidBlockArray(){
		return this.solidBlockArr;
	}

	createBlock(){

		let arr = {
			'codenessX' : codenessX,
			'codenessY'	: codenessY,
			'color' : this.color,
			'fillValue' : this.fillValue
		}

		this.solidBlockArr.push(arr);
	}

	static draw(){

		for (let blockSteps = 0; blockSteps < solidBlockArr().length; blockSteps++){
			let properties = this.tiles[`${this.codenessX}:${this.codenessY}`];
			propertiesId = properties.id;
			//console.log(propertiesId);
		}

		//console.log()
	}

}

class BoundryBlock extends Block{
	constructor(boundryCodenesArrX,boundryCodenesArrY){
		super();
		//this.boundryCodenesArrY = [0,19];
		//this.boundryCodenesArrX = [0,30];
		this.boundryCodenesArrY = boundryCodenesArrY;
		this.boundryCodenesArrX = boundryCodenesArrX;
		this.color = 'rgb(220,85,57)';
	}

	shape(){
		//Canvas.Width ,Canvas.height
		let codenesSet;
		let tileOb;
		this.blockCodenessX = 1;

		//console.log('fdfdf',boundryCodenesArr.length,this.verticalLines)
		//this part is hard coded in order to get the right limitation of boundry
		for (let blockNumX=0; blockNumX<this.boundryCodenesArrY.length; blockNumX++){
			this.blockCodenessX = this.boundryCodenesArrY[blockNumX];
			for (let blockNumY=2; blockNumY<35; blockNumY++){
				this.blockCodenessY = blockNumY;
				codenesSet = `[${this.blockCodenessX}:${this.blockCodenessY}]`;
				//console.log(codenesSet,TilesManupiulate.tiles[codenesSet]);
				tileOb = TilesManupiulate.tiles[codenesSet];
				this._shapeTiles(codenesSet,tileOb);
			}
		}

		for (let blockNumX=0; blockNumX<this.boundryCodenesArrX.length; blockNumX++){
			this.blockCodenessX = this.boundryCodenesArrX[blockNumX];
			for (let blockNumY=15; blockNumY<32; blockNumY++){
				this.blockCodenessY = blockNumY;
				codenesSet = `[${this.blockCodenessY}:${this.blockCodenessX}]`;
				//console.log(codenesSet,TilesManupiulate.tiles[codenesSet]);
				tileOb = TilesManupiulate.tiles[codenesSet];
				this._shapeTiles(codenesSet,tileOb);
			}
		}

	}

	_shapeTiles(codenesSet,tileOb){
		
		TilesManupiulate.tiles[codenesSet].fillValue = true;
		TilesManupiulate.tiles[codenesSet].tileColor = this.color;
		TilesManupiulate.tiles[codenesSet].name = `solidWall${this.blockCodenessX}:${this.blockCodenessY}`;
		//console.log(TilesManupiulate.arrTile[tileOb.tileId])
		TilesManupiulate.arrTile[tileOb.tileId].fillValue = true;
		TilesManupiulate.arrTile[tileOb.tileId].tileColor = this.color;
		TilesManupiulate.arrTile[tileOb.tileId].name = `solidWall${this.blockCodenessX}:${this.blockCodenessY}`;
		//console.log(TilesManupiulate.arrTile[tileOb.tileId])

	}

}

//main block of shapes and objects
class CharObject extends CollitionDitection{
	constructor(tiles,center){
		//this.shapeArr =  new Array();
		super();
		this.leftMove = true;
		this.rightMove = true;
		this.upMove = true;
		this.downMove = true;
		this.rotateRight = true;
		this.rotateLeft = true;

		this.name;

		//this.gra;
		this.moo = 0;

		this.color;
		//this.tiles;
		//this.tileArr;
		this.center = center;

		this.sin90 = 1;
		this.cos90 = 0;
		this.nsin90 = -1;
		this.ncos90 = 0;

		this.eveMment = true;
	}

	set basaltId(id){
		if (Basalt.number == undefined){
			Basalt.number = id;
		}
	}

	get getBasaltId(){
		Basalt.number += 1
		this.name = 'basault' + Basalt.number;
		return this.name;
	}

	logBasalt(){
		console.log(this.name);
	}

	randomColorGenrator(value){
		let color;
		if (value == 'hex'){
			let allowColors = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
			 color = '#'
			for (let i=0; i<6; i++){
				let random = Math.floor(Math.random() * (16 - 0) + 0);
				color += `${allowColors[random]}`;
			}
		} else {
			 color = `rgb(`;
			for (let i=0; i<3; i++){
				let random = Math.floor(Math.random() * (255 - 0) + 0);
				if (i != 2){
					color += `${random},`;
				} else {
					color += `${random}`;
				}
			}
			color += ')';
		}


		return color;
	}

	addBrick(currentPos,fillValue){
		let brick = `[${currentPos.x}:${currentPos.y}]`;
		this.tiles[brick].fillValue = fillValue;
		this.tiles[brick].BrickValue = this.brickValue;
		this.tiles[brick].lenToCenterX = currentPos.x - this.centerBrickX;
		this.tiles[brick].lenToCenterY = currentPos.y - this.centerBrickY;
		this.tiles[brick].tileColor = this.color;
		this.tiles[brick].name = this.name;
		this.possDistanceUpdate(currentPos);
		this.brickValue += 1;
		this.shapeArr.push(this.tiles[brick]);
	}

	possDistanceUpdate(){
		for (let i=0;i<this.shapeArr.length;i++){
			this.shapeArr[i].lenToCenterX = this.shapeArr[i].codenessX - this.centerBrickX;
			this.shapeArr[i].lenToCenterY = this.shapeArr[i].codenessY - this.centerBrickY;
		}
	}

	//place and define the object
	gotoCenter(currentPos){
		currentPos.x = this.centerBrickX;
		currentPos.y = this.centerBrickY;
		return currentPos;
	}

	gotoLeft(currentPos){

		currentPos.x = currentPos.x - 1;
		return currentPos;
	}

	gotoRight(currentPos){
		currentPos.x = currentPos.x + 1;
		return currentPos;
	}

	gotoUp(currentPos){
		currentPos.y = currentPos.y + 1;
		return currentPos;
	}

	gotoDown(currentPos){
		currentPos.y = currentPos.y - 1;
		return currentPos;
	}

	resetArr(){
		for (let i=0; i<this.shapeArr.length; i++){
			this.shapeArr[i].fillValue = false;
			//this.arrTile[]
			//console.log(this.shapeArr[i].codenessX,this.shapeArr[i].codenessY);
			let findCodeness = `[${this.shapeArr[i].codenessX}:${this.shapeArr[i].codenessY}]`;
			//console.log(this.tiles[findCodeness]);
			this.tiles[findCodeness].name = undefined;
		}
	}

	//turn the object
	turnLeft(){
		this.plankCheck();
		if (this.rotatableLeft === false){
			return;
		}

		this.resetArr();
		this.draw();

		for (let i=0;i<this.shapeArr.length;i++){

			let help = Helper.rotateLeft(this.shapeArr[i],this.centerBrickX,this.centerBrickY);
			let codenessXDash = help[0];
			let codenessYDash = help[1];

			let findCodeness = `[${codenessXDash}:${codenessYDash}]`;
			let replacer = {};

			replacer.tileColor = this.color;
			replacer.bottomRightX = this.tiles[findCodeness].bottomRightX;
			replacer.bottomRightY = this.tiles[findCodeness].bottomRightY;
			replacer.downLeftX = this.tiles[findCodeness].downLeftX;
			replacer.downLeftY = this.tiles[findCodeness].downLeftY;
			replacer.topLeftX = this.tiles[findCodeness].topLeftX;
			replacer.topLeftY = this.tiles[findCodeness].topLeftY;
			replacer.topRightX = this.tiles[findCodeness].topRightX;
			replacer.topRightY = this.tiles[findCodeness].topRightY;
			replacer.fillValue = true;
			replacer.tileId = this.tiles[findCodeness].tileId;
			replacer.name = this.name;

			replacer.codenessX = codenessXDash;
			replacer.codenessY = codenessYDash;

			this.tiles[findCodeness].name = replacer.name;
			this.shapeArr[i] = replacer;
			this.possDistanceUpdate();

		}
	}

	//turn the object
	turnRight(){
		this.plankCheck();
		if (this.rotatableRight === false){
			return;
		}

		this.resetArr();
		this.draw();

		for (let i=0;i<this.shapeArr.length;i++){

			let help = Helper.rotateRight(this.shapeArr[i],this.centerBrickX,this.centerBrickY);
			let codenessXDash = help[0];
			let codenessYDash = help[1];

			let findCodeness = `[${codenessXDash}:${codenessYDash}]`;
			let replacer = {};

			replacer.tileColor = this.color;
			replacer.bottomRightX = this.tiles[findCodeness].bottomRightX;
			replacer.bottomRightY = this.tiles[findCodeness].bottomRightY;
			replacer.downLeftX = this.tiles[findCodeness].downLeftX;
			replacer.downLeftY = this.tiles[findCodeness].downLeftY;
			replacer.topLeftX = this.tiles[findCodeness].topLeftX;
			replacer.topLeftY = this.tiles[findCodeness].topLeftY;
			replacer.topRightX = this.tiles[findCodeness].topRightX;
			replacer.topRightY = this.tiles[findCodeness].topRightY;
			replacer.fillValue = true;
			replacer.tileId = this.tiles[findCodeness].tileId;
			replacer.name = this.name;

			replacer.codenessX = codenessXDash;
			replacer.codenessY = codenessYDash;


			this.tiles[findCodeness].name = replacer.name;
			this.shapeArr[i] = replacer;

			this.possDistanceUpdate();


		}
	}

	moveLeft(){
		this.plankCheck();
		if (this.movableLeft === false){
			return;
		}
		this.resetArr();
		this.draw();
	
		this.centerBrickX = this.centerBrickX - 1;
		for (let i=0;i<this.shapeArr.length;i++){

			//let codenessXDash = this.shapeArr[i].codenessX - 1;
			//let codenessYDash = this.shapeArr[i].codenessY;
			let help = Helper.moveLeft(this.shapeArr[i]);
			let codenessXDash = help[0];
			let codenessYDash = help[1];////

			let findCodeness = `[${codenessXDash}:${codenessYDash}]`;
			//let resetCodeness = `[${this.shapeArr[i].codenessX}:${this.shapeArr[i].codenessY}]`;
			let replacer = {};

			replacer.tileColor = this.color;
			replacer.bottomRightX = this.tiles[findCodeness].bottomRightX;
			replacer.bottomRightY = this.tiles[findCodeness].bottomRightY;
			replacer.downLeftX = this.tiles[findCodeness].downLeftX;
			replacer.downLeftY = this.tiles[findCodeness].downLeftY;
			replacer.topLeftX = this.tiles[findCodeness].topLeftX;
			replacer.topLeftY = this.tiles[findCodeness].topLeftY;
			replacer.topRightX = this.tiles[findCodeness].topRightX;
			replacer.topRightY = this.tiles[findCodeness].topRightY;
			replacer.fillValue = true;
			replacer.tileId = this.tiles[findCodeness].tileId;
			replacer.name = this.name;

			replacer.codenessX = codenessXDash;
			replacer.codenessY = codenessYDash;

			this.tiles[findCodeness].name = replacer.name;
			this.shapeArr[i] = replacer;
			this.possDistanceUpdate();
		}
	}

	moveRight(){
		this.plankCheck();

		if (this.movableRight === false){
			return;
		}

		this.resetArr();
		this.draw();
				

		this.centerBrickX = this.centerBrickX + 1;
		for (let i=0;i<this.shapeArr.length;i++){

			let help = Helper.moveRight(this.shapeArr[i]);
			let codenessXDash = help[0];
			let codenessYDash = help[1];
			
			let findCodeness = `[${codenessXDash}:${codenessYDash}]`;
			let replacer = {};

			replacer.tileColor = this.color;
			replacer.bottomRightX = this.tiles[findCodeness].bottomRightX;
			replacer.bottomRightY = this.tiles[findCodeness].bottomRightY;
			replacer.downLeftX = this.tiles[findCodeness].downLeftX;
			replacer.downLeftY = this.tiles[findCodeness].downLeftY;
			replacer.topLeftX = this.tiles[findCodeness].topLeftX;
			replacer.topLeftY = this.tiles[findCodeness].topLeftY;
			replacer.topRightX = this.tiles[findCodeness].topRightX;
			replacer.topRightY = this.tiles[findCodeness].topRightY;
			replacer.fillValue = true;
			replacer.tileId = this.tiles[findCodeness].tileId;
			replacer.name = this.name;

			replacer.codenessX = codenessXDash;
			replacer.codenessY = codenessYDash;

			this.tiles[findCodeness].name = replacer.name;
			this.shapeArr[i] = replacer;
			this.possDistanceUpdate();
		}
	}

	moveDown(){
		this.plankCheck();

		if (this.movableDown === false){
			return;
		}

		this.resetArr();
		this.draw();
				

		this.centerBrickY = this.centerBrickY - 1;
		for (let i=0;i<this.shapeArr.length;i++){
			
			let help = Helper.moveDown(this.shapeArr[i]);
			let codenessXDash = help[0];
			let codenessYDash = help[1];

			let findCodeness = `[${codenessXDash}:${codenessYDash}]`;
			let replacer = {};

			replacer.tileColor = this.color;
			replacer.bottomRightX = this.tiles[findCodeness].bottomRightX;
			replacer.bottomRightY = this.tiles[findCodeness].bottomRightY;
			replacer.downLeftX = this.tiles[findCodeness].downLeftX;
			replacer.downLeftY = this.tiles[findCodeness].downLeftY;
			replacer.topLeftX = this.tiles[findCodeness].topLeftX;
			replacer.topLeftY = this.tiles[findCodeness].topLeftY;
			replacer.topRightX = this.tiles[findCodeness].topRightX;
			replacer.topRightY = this.tiles[findCodeness].topRightY;
			replacer.fillValue = true;
			replacer.tileId = this.tiles[findCodeness].tileId;
			replacer.name = this.name;

			TilesManupiulate.arrTile[this.shapeArr[i].tileId].fillValue = false
			
			replacer.codenessX = codenessXDash;
			replacer.codenessY = codenessYDash;

			this.tiles[findCodeness].name = replacer.name;
			this.shapeArr[i] = replacer;

						//console.log(this.tileArr[i].codenessX,this.shapeArr[i]);

			this.possDistanceUpdate();
		}
	}

	moveUp(){
		this.plankCheck();
		if (this.movableUp === false){
			return;
		}
		this.resetArr();
		this.draw();
				

		this.centerBrickY = this.centerBrickY + 1;
		for (let i=0;i<this.shapeArr.length;i++){
			
			let help = Helper.moveUp(this.shapeArr[i]);
			let codenessXDash = help[0];
			let codenessYDash = help[1];

			let findCodeness = `[${codenessXDash}:${codenessYDash}]`;
			let replacer = {};

			replacer.tileColor = this.color;
			replacer.bottomRightX = this.tiles[findCodeness].bottomRightX;
			replacer.bottomRightY = this.tiles[findCodeness].bottomRightY;
			replacer.downLeftX = this.tiles[findCodeness].downLeftX;
			replacer.downLeftY = this.tiles[findCodeness].downLeftY;
			replacer.topLeftX = this.tiles[findCodeness].topLeftX;
			replacer.topLeftY = this.tiles[findCodeness].topLeftY;
			replacer.topRightX = this.tiles[findCodeness].topRightX;
			replacer.topRightY = this.tiles[findCodeness].topRightY;
			replacer.fillValue = true;
			replacer.tileId = this.tiles[findCodeness].tileId;
			replacer.name = this.name;

			replacer.codenessX = codenessXDash;
			replacer.codenessY = codenessYDash;

			this.tiles[findCodeness].name = replacer.name;
			this.shapeArr[i] = replacer;
			//console.log(this.shapeArr[i]);
			this.possDistanceUpdate();
		}
	}

	eventMovement(){
		document.addEventListener('keypress',(e) => {
			let key = e.which;
			this.eveMment = (this.posLocked == true) ? false : true;
			if (this.eveMment){
				switch (key){
					case 100:
						//console.log('up',e)
						this.turnRight();
						break;
					case 97:
						//console.log('left',e);
						this.turnLeft();
						break;
				}
			}
		})

		document.addEventListener('keydown',(e) => {
			let key = e.which;
			this.eveMment = (this.posLocked == true) ? false : true;
			if (this.eveMment){
				switch (key){
					case 38:
						//console.log('up',e)
						this.moveUp();
						break;
					case 37:
						//console.log('left',e);
						this.moveLeft();
						break;
					case 39:
						this.moveRight();
						//console.log('right',e);
						break;
					case 40:
						this.moveDown();
						//console.log('down',e);
						break;

				}
			}
		})

	}

	//draw the object
	draw(){
		let tileNav;
		//console.log("ewtrewt");
		for (let i=0;i<this.shapeArr.length;i++){
			tileNav = this.shapeArr[i].tileId;
			this.tileArr[tileNav].tileColor = this.shapeArr[i].tileColor;
			this.tileArr[tileNav].fillValue = this.shapeArr[i].fillValue;

			//console.log(this.tileArr[tileNav]);
			//this.tileArr[tileNav].posX = this.shapeArr[i].posX;
			//this.tileArr[tileNav].posY = this.shapeArr[i].posY;
		}
	}

	gravity(){
		this.moo = this.moo + this.gra;
		if (this.moo >= 1){
			this.moveDown();
			this.moo = 0;
		}
	}

}

//capital L shaped Object
class Basalt extends CharObject{
	constructor(brickColor,center,tiles,tileArr,gra){
		super();

		this.color = this.randomColorGenrator('r');

		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;

		this.gra = gra;

		this.posLocked = false;

		this.basaltId = 0;
		this.name = this.getBasaltId;
		//this.name;
		this.shapeArr = [];
	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoUp(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoCenter(currentPos);

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)
		

		currentPos = this.gotoUp(currentPos);


	}

	moveUp(){}

	//moveLeft','moveRight','moveUp','moveDown

	turnLeft(){}


}

//capital L shaped Object
class BasaltRight extends CharObject{
	constructor(brickColor,center,tiles,tileArr,gra){
		super();

		this.color = this.randomColorGenrator('r');

		this.posLocked = false;

		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;

		this.gra = gra;

		this.basaltId = 0;
		this.name = this.getBasaltId;
		//this.name;
		this.shapeArr = [];
	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)
		
		currentPos = this.gotoCenter(currentPos);

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoUp(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoUp(currentPos);


	}

	moveUp(){}

}

//trangle shaped Object
class Diamand extends CharObject{
	constructor(brickColor,center,tiles,tileArr,gra){
		super();

		this.color = this.randomColorGenrator('r');

		this.posLocked = false;

		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;

		this.gra = gra;

		this.basaltId = 0;
		this.name = this.getBasaltId;
		//this.name;
		this.shapeArr = [];
	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);
		
		
		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);
		currentPos = this.gotoUp(currentPos);
		this.addBrick(currentPos,true)
	}

	moveUp(){}
}

//straight line stick shaped oject
class Limestone extends CharObject{
	constructor(brickColor,center,tiles,tileArr,gra){
		super();

		this.color = this.randomColorGenrator('r');

		this.posLocked = false;

		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;

		this.gra = gra;

		this.basaltId = 0;
		this.name = this.getBasaltId;
		//this.name;
		this.shapeArr = [];
	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);
		
		
		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)

	}

	moveUp(){}
}

//very rectanluar shaped object
class Marble extends CharObject{
		constructor(brickColor,center,tiles,tileArr,gra){
		super();

		this.color = this.randomColorGenrator('r');

		this.posLocked = false;

		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;

		this.gra = gra;

		this.basaltId = 0;
		this.name = this.getBasaltId;
		//this.name;
		this.shapeArr = [];


	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoDown(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);
		
	}

	moveUp(){}
}

//dancing figure looking object
class Granite extends CharObject{
		constructor(brickColor,center,tiles,tileArr,gra){
		super();

		this.color = this.randomColorGenrator('r');

		this.posLocked = false;

		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;

		this.gra = gra;

		this.basaltId = 0;
		this.name = this.getBasaltId;
		//this.name;
		this.shapeArr = [];
	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);

		currentPos = this.gotoDown(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);
		
	}

	moveUp(){}
}


//dancing figure looking object
class GraniteRight extends CharObject{
		constructor(brickColor,center,tiles,tileArr,gra){
		super();

		this.color = this.randomColorGenrator('r');

		this.posLocked = false;

		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;

		this.gra = gra;

		this.basaltId = 0;
		this.name = this.getBasaltId;
		//this.name;
		this.shapeArr = [];
	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);

		currentPos = this.gotoDown(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoLeft(currentPos);
		this.addBrick(currentPos,true)

		currentPos = this.gotoCenter(currentPos);
		


	}

	moveUp(){}
}

class Generaion extends CharObject{
	constructor(Grid){
		super();
		this.dropStatus = true;
		this.objectArr = [];
		Generaion.objectArr = [];
		this.Grid = Grid;
		
		this.localStartCoardinarte = {x:27,y:25}
	
	}

	 async createObject(){
		//for (let object=0; object<)

		return await new Promise((resolve,reject) => {
			let randomObject;		

			//object examples for test execution
			const basalt1 = new Basalt('#ffffff',this.localStartCoardinarte,this.Grid,this.Grid.arrTile,0.1);
			const Diamand1 = new Diamand('#ffffff',this.localStartCoardinarte,this.Grid,this.Grid.arrTile,0.1);
			const Limestone1 = new Limestone('#ffffff',this.localStartCoardinarte,this.Grid,this.Grid.arrTile,0.1);
			const marble1 = new Marble('#ffffff',this.localStartCoardinarte,this.Grid,this.Grid.arrTile,0.1);
			const Granite1 = new Granite('#ffffff',this.localStartCoardinarte,this.Grid,this.Grid.arrTile,0.1);
			const GraniteRight1 = new GraniteRight('#ffffff',this.localStartCoardinarte,this.Grid,this.Grid.arrTile,0.1);
			const basaltRight1 = new BasaltRight('#ffffff',this.localStartCoardinarte,this.Grid,this.Grid.arrTile,0.1);

			let availableObjects = [basalt1,Diamand1,Limestone1,marble1,Granite1,GraniteRight1,basaltRight1];

			if (this.dropStatus == true){
				randomObject = availableObjects[Math.floor(Math.random()*availableObjects.length)];
				//.log(randomObject);

				
				randomObject = Object.create(randomObject);
				//randomObject
				randomObject.makeObject();

				//randomObject.posLocked = false;
				//randomObject.__proto__.center = {x: 20, y: 20};
				//randomObject.__proto__.__proto__.__proto__.__proto__.plankCheck();
				//Helper.printer(randomObject.__proto__.center,10);

				randomObject.eventMovement();
				randomObject.plankCheck();
				//console.log(this.objectArr);
				//randomObject.draw();
				this.objectArr.push(randomObject);
				Generaion.objectArr.push(randomObject);
				resolve(1);
			}
		})

	}

	get getObjectArr(){
		return this.objectArr;
	}

	generateObject(){

	
	}


}

class Distroy extends Generaion{
	constructor(horiz,vertics,generation){
		super();
		this.filled = new Array();
		this.horizFill = new Array();
		this.horiz = horiz;
		this.vertics = vertics;
		this.generation = generation;

		
	}


	fillValueCollector(){
		//Helper.printer("");
		let cheXFill = true;
		//let key = `[${codenessX}:${codenessY}]`;
		//vertics

		//vertics means the size of the vertical lines
		//horiz menas the size of the horizantal lines
		for (let v=this.vertics[0];v<this.vertics[1];v++){
			for (let i=this.horiz[0];i<this.horiz[1];i++){
				if (TilesManupiulate.arrTile[TilesManupiulate.tiles[`[${i}:${v}]`].tileId].fillValue == false){
					cheXFill = false;
					continue;
				}

				//This part of the code gets the tile id that is filled as row 
				
				//this.filled.push(TilesManupiulate.tiles[`[${i}:${v}]`].tileId);
				//console.log(i,v);
			}
			if (cheXFill == true){

				this.horizFill.includes(v) ? false : this.horizFill.push(v);

				this.distroyFilledArrBl();
				console.log("bass",v);
			}

			this.filled = [];
			cheXFill = true;
			
		}

		
		
	}

	distroyFilledArrBl(){
		//console.log(0,this.horizFill.length,this.horiz[0],this.horiz[1])




/*						for (let vCut=0;vCut<this.horizFill.length;vCut++){
							for (let hCut=this.horiz[0];hCut<this.horiz[1];hCut++){
								console.log(this.horizFill[vCut],hCut);
							}
						}*/

				let repelArr = {};
				let sequenceCutter = new Array();
				let ini = 0;
				let delList = new Array();

				//console.log("gods please help",this.generation.objectArr)

				for (let vCut=0;vCut<this.horizFill.length;vCut++){
					for (let hCut=this.horiz[0];hCut<this.horiz[1];hCut++){
							sequenceCutter[ini] = [hCut,this.horizFill[vCut]];
							ini++;
						}
					}
this.horizFill = [];
				ini = 0;

				//console.log(sequenceCutter);
				let primeArr = new Array();
				primeArr = [];
				let dialate = [];
				let tnt = 0;
				for ( ini = 0; ini<sequenceCutter.length; ini++){
					//console.log("object array now printing",this.generation.objectArr.length,this.generation.objectArr);

				for (let t1=0;t1<Generaion.objectArr.length;t1++){
					//console.log("fix it",t1,this.generation.objectArr[t1].__proto__.shapeArr.length,this.generation.objectArr[t1]);
					
					for (let t2=0;t2<Generaion.objectArr[t1].__proto__.shapeArr.length;t2++){

try{
							//console.log(this.generation.objectArr[t1].__proto__.shapeArr[t2].codenessX,this.generation.objectArr[t1].__proto__.shapeArr[t2].codenessY)
							dialate[0] = [Generaion.objectArr[t1].__proto__.shapeArr[t2].codenessX,Generaion.objectArr[t1].__proto__.shapeArr[t2].codenessY];
							
							//console.log(sequenceCutter[ini][0],sequenceCutter[ini][1],"jjjj",dialate[0][0],dialate[0][1],this.generation.objectArr[t1].__proto__.shapeArr.length);
							if ((sequenceCutter[ini][0] == dialate[0][0]) && (sequenceCutter[ini][1] == dialate[0][1])){
								//primeArr[ini+1] = [t1,t2];
								primeArr[tnt] = [t1,t2];
								tnt++;
								//console.log('Hey this is the same thing',primeArr[0],sequenceCutter[ini],t1,t2,primeArr[ini],ini);
								


							}
							dialate = [];

							//ini++;

}catch(err){
	console.log("Hey I missed this object",primeArr[0],sequenceCutter[ini])
}
						}

				

			}
		}

console.log("counted items,", ini);
//console.log("deletion items,", primeArr);

		//wipe me deletion items
		/*repelArr = {};
			for (let match = 0;match<primeArr.length;match++){
				//console.log(this.generation.objectArr.length,"yep there it is");
				//for (let matcht2 = 0;matcht2<primeArr.length;matcht2++){
					console.log("prime array",primeArr[match]);
					if (primeArr[match] != undefined){
						repelArr[match] = primeArr[match];
						//console.log("goddd",repelArr);
					//}
				}
				//primeArr = repelArr;
				//console.log("I have no idea what ",this.generation.objectArr[match].movableDown);
				//this.generation.objectArr[match].__proto__.movableDown = false;
				//this.generation.objectArr[match].movableDown = false;
				//repelArr = {};
			}
				primeArr = repelArr;
				console.log("prime repel array",repelArr);
				repelArr = {};
*/



	for (let ini=0;ini<primeArr.length;ini++){
		//delete this.generation.objectArr[primeArr[0][0]].__proto__.shapeArr[primeArr[0][1]];
		//console.log(primeArr[ini][0],primeArr[ini][1],this.generation.objectArr[primeArr[ini][0]].__proto__.shapeArr[primeArr[ini][1]]);


		Generaion.objectArr[primeArr[ini][0]].__proto__.shapeArr[primeArr[ini][1]].fillValue = false;
		//this.generation.objectArr[primeArr[ini][0]].movableDown = false;
		//console.log("this is not one of them",this.generation.objectArr[primeArr[ini][0]].movableDown);
		Generaion.objectArr[primeArr[ini][0]].draw();


		//delete this.generation.objectArr[primeArr[ini][0]].__proto__.shapeArr[primeArr[ini][1]];


			//console.log("solo that the object array",ini,this.generation.objectArr);
	}
//console.log("replacer",Generaion.objectArr);
	/*for (let ini=1;ini<primeArr.length;ini++){
		//delete this.generation.objectArr[primeArr[0][0]].__proto__.shapeArr[primeArr[0][1]];
		//console.log(primeArr[ini][0],primeArr[ini][1],this.generation.objectArr[primeArr[ini][0]].__proto__.shapeArr[primeArr[ini][1]]);

		delete Generaion.objectArr[primeArr[ini][0]].__proto__.shapeArr[primeArr[ini][1]];


			//console.log("solo that the object array",ini,this.generation.objectArr);
	}*/



//console.log("replacer",Generaion.objectArr);
		//wipe me
		/*repelArr = {};
			for (let match = 0;match<Generaion.objectArr.length;match++){
				//console.log(this.generation.objectArr.length,"yep there it is");
				for (let matcht2 = 0;matcht2<Generaion.objectArr[match].__proto__.shapeArr.length;matcht2++){
					if (Generaion.objectArr[match].__proto__.shapeArr[matcht2] != undefined){
						repelArr[matcht2] = Generaion.objectArr[match].__proto__.shapeArr[matcht2];
						//console.log("goddd",repelArr);
					}
				}
				Generaion.objectArr[match].__proto__.shapeArr = repelArr;
				repelArr = {};
			}*/



	console.log("replacer",this.generation.objectArr);
//this.generation.objectArr = [];

	/*for (let match = 0;match<this.generation.objectArr.length;match++){
		this.generation.objectArr[match].plankCheck();
		this.generation.objectArr[match].draw();
	}
*/

console.log("replacer2",primeArr);
}
}

window.onload = function(){
	//const webSocket = new SocketWs('localhost',4000);
	//webSocket.createWsServer();

	Helper.constructor();

	let panel = new Canvas(1280,700);
	let canvas = panel.makeCanvas();

	

	let imageReady = new ObjectManx(100,100,'/src/images/earth.jpg',canvas,0,0);
	imageReady.getImage();

	//grid system create
	const Grid = new TilesManupiulate(100,100,panel.width,panel.height,canvas);
	Grid.createTile();

	
/*
	//object examples for test execution

	//Diamand
	const Diamand1 = new Diamand('#ffffff',{x:12,y:17},Grid,Grid.arrTile,0.1);
	
	Diamand1.makeObject();
	//Diamand1.eventMovement();
	Diamand1.plankCheck();

*/
	const block = new BoundryBlock([2,60],[15,32],"rgb(255,255,255)");
	block.shape();

	var generation = new Generaion(Grid);
	generation.createObject();
	const loader = [];

	const distroy = new Distroy([16,32],[3,34],generation);
	distroy.fillValueCollector();



	//first two values of the camara represents the camara angle width and height then next parameter position of camara pointing to.
	//first two values should be twice of seconxd values.x
	//const camara = new Camara(50,50,{x:29,y:26});
	const camara = new Camara(60,60,{x:40,y:30});
	camara.UpdateLock();
	camara.getUpdatedPos();
	camara.scaller();
	/*console.log(
		camara.leftTop,
		camara.rightTop,
		camara.bottomLeft,
		camara.bottomRight
		);*/
	//console.log(camara.positionArr);
	//console.log(TilesManupiulate.arrTile);

	let [x,y] = [0,0];
	const fps = 15;

	loop();

	//Main Game Loop
	function loop(){

		//console.log(generation.objectArr.length);
		//Helper.printer("tricycle",300);
			//Helper.printer(generation.objectArr,300);
let ice = 0;
	for (let objectCount=0; objectCount<generation.objectArr.length; objectCount++){
		//Helper.printer("bicycle",300);
		//console.log("how ever");
			
		//panel.responsiveScaller();
//console.log("Generaion five",Generaion.objectArr);
		generation.objectArr[objectCount].gravity();
		generation.objectArr[objectCount].draw();
		//Helper.printer(generation.objectArr,300);
		//Helper.printer("kite changer",300);
		if ((generation.objectArr[objectCount].movableDown == false) && (generation.objectArr[objectCount].posLocked == false)){
			console.log("by the croud",Generaion.objectArr);
			generation.objectArr[objectCount].plankCheck();
			generation.objectArr[objectCount].posLocked = true;
			distroy.fillValueCollector();
			generation.createObject();

			//Generaion.objectArr = generation.objectArr;
			ice++;
//distroy.distroyFilledArrBl();
		}

	}



		//Limestone1.plankCheck();
		/*Diamand1.plankCheck();
		basalt2.plankCheck();
		basalt3.plankCheck();
		basalt4.plankCheck();
		basalt1.plankCheck();*/

		/*basalt1.gravity();
		basalt2.gravity();
		basalt3.gravity();
		basalt4.gravity();
		Diamand1.gravity();
		marble1.gravity();
		basaltRight1.gravity();
		Granite1.gravity();
		GraniteRight1.gravity();


		basalt1.draw();
		basalt2.draw();
		basalt3.draw();
		basalt4.draw();
		marble1.draw();
		basaltRight1.draw();
		Granite1.draw();
		Diamand1.draw();
		Limestone1.draw();
		GraniteRight1.draw();*/


		/*for (let i=0; i<Grid.arrTile.length;i++){
			if (Grid.arrTile[i].fillValue == true){
				Grid.arrTile[i].drawlines();
			}
		}*/

		//Helper.printer(camara.positionArr.length,200)

		//camara view
		for (let i=0; i<camara.positionArr.length;i++){
			if (Grid.arrTile[camara.positionArr[i]].fillValue == true){
				Grid.arrTile[camara.positionArr[i]].drawlines();
			}
		}

		setTimeout(function() {
			//clean the canvas
			canvas.clearRect(0,0,panel.width,panel.height);
			window.requestAnimationFrame(loop);
		},1000 / fps);

	}
}


