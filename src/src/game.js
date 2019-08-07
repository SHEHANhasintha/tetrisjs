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

//drawing pannel
class Canvas{
	constructor(width=window.innerWidth/2,height=window.innerHeight/2){
		this.height = height;
		this.width = width;
		this.canvas;

		Canvas.Width = this.width;
		Canvas.height = this.height;
	}

	makeCanvas(){
		var img = new Image();
		const canvas = document.getElementById("canvas");
		this.canvas = canvas;
		const panel = canvas.getContext("2d");
		canvas.width = this.height;
		canvas.height = this.width;
		//panel.fillStyle = "#FF0000";
		//panel.drawImage(img, 0, 0, 1000, 1000);
		//panel.fillRect(0, 0, this.height, this.width);
		//canvas.toDataURL('image/jpeg');
		return panel;
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
					'downLeftX' : downLeftX,
					'downLeftY' : downLeftY,
					'topLeftX'	: topLeftX,
					'topLeftY'	: topLeftY,
					'topRightX'	: topRightX,
					'topRightY' : topRightY,
					'bottomRightX' : bottomRightX,
					'bottomRightY' : bottomRightY,
					'fillValue' : this.fillValue
				}

				this.tileCount += 1;
			}
		}

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

		this.bottomLeft.y = this.positionLock.y - (this.scallerHeight/2);
		this.bottomRight.y = this.positionLock.y - (this.scallerHeight/2);

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
		//console.log(this.dragX)
		
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
			for (let blockNumY=0; blockNumY<this.verticalLines; blockNumY++){
				this.blockCodenessY = blockNumY;
				codenesSet = `[${this.blockCodenessX}:${this.blockCodenessY}]`;
				//console.log(codenesSet,TilesManupiulate.tiles[codenesSet]);
				tileOb = TilesManupiulate.tiles[codenesSet];
				this._shapeTiles(codenesSet,tileOb);
			}
		}

		for (let blockNumX=0; blockNumX<this.boundryCodenesArrX.length; blockNumX++){
			this.blockCodenessX = this.boundryCodenesArrX[blockNumX];
			for (let blockNumY=0; blockNumY<this.horizeLines; blockNumY++){
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
		})

		document.addEventListener('keydown',(e) => {
			let key = e.which;
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

	//moveUp(){}
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

	//moveUp(){}
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
}

class Generaion extends CharObject{
	constructor(Grid){
		super();
		this.dropStatus = true;
		this.objectArr = [];
		this.Grid = Grid;
		

	//object examples for test execution
	const basalt1 = new Basalt('#ffffff',{x:5,y:7},this.Grid,this.Grid.arrTile,0.1);
	const Diamand1 = new Diamand('#ffffff',{x:12,y:17},this.Grid,this.Grid.arrTile,0.1);
	const Limestone1 = new Limestone('#ffffff',{x:9,y:17},this.Grid,this.Grid.arrTile,0.1);
	const marble1 = new Marble('#ffffff',{x:12,y:19},this.Grid,this.Grid.arrTile,0.1);
	const Granite1 = new Granite('#ffffff',{x:13,y:22},this.Grid,this.Grid.arrTile,0.1);
	const GraniteRight1 = new GraniteRight('#ffffff',{x:22,y:28},this.Grid,this.Grid.arrTile,0.1);
	const basaltRight1 = new BasaltRight('#ffffff',{x:7,y:16},this.Grid,this.Grid.arrTile,0.1);

	this.availableObjects = [basalt1,Diamand1,Limestone1,marble1,Granite1,GraniteRight1,basaltRight1];

	}

	createObject(){
		//for (let object=0; object<)
		let randomObject;
		if (this.dropStatus = true){
			randomObject = this.availableObjects[Math.floor(Math.random()*this.availableObjects.length)];
			//.log(randomObject);
			randomObject.makeObject();
			randomObject.eventMovement();
			randomObject.plankCheck();
			//randomObject.draw();
			this.objectArr.push(randomObject);
		}

		//const Limestone1 = new Limestone('#ffffff',{x:9,y:17},Grid,Grid.arrTile,0.1);

		/*Limestone1.makeObject();
		Limestone1.eventMovement();
		Limestone1.plankCheck();
*/

	}

	get getObjectArr(){
		return this.objectArr;
	}

	generateObject(){

	
	}


}

window.onload = function(){
	//const webSocket = new SocketWs('localhost',4000);
	//webSocket.createWsServer();

	Helper.constructor();

	let panel = new Canvas(750,700);
	let canvas = panel.makeCanvas();
	let imageReady = new ObjectManx(100,100,'/src/images/earth.jpg',canvas,0,0);
	imageReady.getImage();

	//grid system create
	const Grid = new TilesManupiulate(100,100,panel.width,panel.height,canvas);
	Grid.createTile();

	
/*
	//object examples for test execution
	//basalt object 1
	const basalt1 = new Basalt('#ffffff',{x:5,y:7},Grid,Grid.arrTile,0.1);
	
	basalt1.makeObject();
	//basalt1.eventMovement();
	basalt1.plankCheck();
	
	//basalt1.getBasaltId;

	//Diamand
	const Diamand1 = new Diamand('#ffffff',{x:12,y:17},Grid,Grid.arrTile,0.1);
	
	Diamand1.makeObject();
	//Diamand1.eventMovement();
	Diamand1.plankCheck();


	//Diamand
	const Limestone1 = new Limestone('#ffffff',{x:9,y:17},Grid,Grid.arrTile,0.1);
	
	Limestone1.makeObject();
	Limestone1.eventMovement();
	Limestone1.plankCheck();
	

	//Diamand
	const marble1 = new Marble('#ffffff',{x:12,y:19},Grid,Grid.arrTile,0.1);
	
	marble1.makeObject();
	marble1.eventMovement();
	marble1.plankCheck();


	//basalt object 2
	const basalt2 = new Basalt('#ffffff',{x:12,y:12},Grid,Grid.arrTile,0.1);
	basalt2.makeObject();
	//basalt2.getBasaltId;


	//basalt object 2
	const basalt3 = new Basalt('#ffffff',{x:6,y:5},Grid,Grid.arrTile,0.1);
	basalt3.makeObject();
	//basalt3.getBasaltId;

	//basalt object 2
	const basalt4 = new Basalt('#ffffff',{x:3,y:11},Grid,Grid.arrTile,0.1);
	basalt4.makeObject();
	//basalt4.getBasaltId;

	

	//Granite object 2
	const Granite1 = new Granite('#ffffff',{x:13,y:22},Grid,Grid.arrTile,0.1);
	Granite1.makeObject();

	//GraniteRight object 1
	const GraniteRight1 = new GraniteRight('#ffffff',{x:22,y:28},Grid,Grid.arrTile,0.1);
	GraniteRight1.makeObject();

	const basaltRight1 = new BasaltRight('#ffffff',{x:7,y:16},Grid,Grid.arrTile,0.1);
	basaltRight1.makeObject();
*/
	const block = new BoundryBlock([1,60],[9,32],"rgb(255,255,255)");
	block.shape();

	const generation = new Generaion(Grid);
	generation.createObject();


	//first two values of the camara represents the camara angle width and height then next parameter position of camara pointing to.
	//first two values should be twice of seconxd values.x
	const camara = new Camara(50,50,{x:29,y:26});
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


	for (let objectCount=0; objectCount<generation.objectArr.length; objectCount++){
		if ((generation.objectArr[objectCount].movableDown == false) && (generation.objectArr[objectCount].posLocked == false)){
			generation.objectArr[objectCount].plankCheck();
			generation.createObject();
			console.log('dfdfdfdf');			
			generation.objectArr[objectCount].posLocked = true;
		}

		generation.objectArr[objectCount].gravity();
		generation.objectArr[objectCount].draw();
		//console.log(generation.objectArr[objectCount]);


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


