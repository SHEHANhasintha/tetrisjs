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

class Canvas{
	constructor(width=window.innerWidth/2,height=window.innerHeight/2){
		this.height = height;
		this.width = width;
		this.canvas;
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

	draw(){
		
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
		this.canvas.closePath();
		//this.canvas.stroke();
	}

}

class TilesManupiulate{
	constructor(verticalLines,horizeLines,canvasWidth,canvasHeight,canvas){
		this.verticalLines = verticalLines;
		this.horizeLines = horizeLines;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.tileWidth = this.canvasWidth /  this.horizeLines;
		this.tileHeight = this.canvasHeight / this.verticalLines;
		this.canvas = canvas;

		this.tileCount = 0;
		this.tiles = {};
		this.arrTile = new Array();
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


				tileColor  = `rgba(255,255,255)`;

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
					tileColor
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
					'bottomRightY' : bottomRightY
				}

				this.tileCount += 1;
			}
		}

	}

}

class CharObject{
	constructor(tiles,center){
		this.shapeArr =  new Array();
		this.color;
		this.tiles;
		this.tileArr;
		this.center = center;

		this.sin90 = 1;
		this.cos90 = 0;
		this.nsin90 = -1;
		this.ncons90 = 0;
	}

	addBrick(currentPos,fillValue){
		
		let brick = `[${currentPos.x}:${currentPos.y}]`;
		this.tiles[brick].fillValue = fillValue;
		this.tiles[brick].BrickValue = this.brickValue;
		this.tiles[brick].lenToCenterX = currentPos.x - this.centerBrickX;
		this.tiles[brick].lenToCenterY = currentPos.y - this.centerBrickY;
		this.possDistanceUpdate(currentPos);
		this.brickValue += 1;
		this.shapeArr.push(this.tiles[brick]);
	}

	possDistanceUpdate(){
		//let brick = `[${currentPos.x}:${currentPos.y}]`;
		//console.log('============================')
		for (let i=0;i<this.shapeArr.length;i++){

			//console.log(this.shapeArr[i].codenessX,this.shapeArr[i].codenessY,this.centerBrickX,this.centerBrickY)
			//console.log(this.shapeArr[i].codenessX - this.centerBrickX,this.shapeArr[i].codenessY - this.centerBrickY)
			this.shapeArr[i].lenToCenterX = this.shapeArr[i].codenessX - this.centerBrickX;
			this.shapeArr[i].lenToCenterY = this.shapeArr[i].codenessY - this.centerBrickY;
		}

		//this.shapeArr[brick].lenToCenterX = currentPos.x - this.centerBrickX;
		//this.shapeArr[brick].lenToCenterY = currentPos.y - this.centerBrickY;
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
		console.log(currentPos);
		currentPos.y = currentPos.y - 1;
		return currentPos;
	}

	//turn the object
	turnLeft(){
		for (let i=0;i<this.shapeArr.length;i++){
this.possDistanceUpdate();
			let codenessXDash = (this.shapeArr[i].lenToCenterX * this.cos90 - this.shapeArr[i].lenToCenterY * this.sin90) + this.centerBrickX;
			let codenessYDash = (this.shapeArr[i].lenToCenterX * this.sin90 + this.shapeArr[i].lenToCenterY * this.cos90) + this.centerBrickY;
			let findCodeness = `[${codenessXDash}:${codenessYDash}]`;
			//let resetCodeness = `[${this.shapeArr[i].codenessX}:${this.shapeArr[i].codenessY}]`;

			//console.log(codenessXDash,codenessYDash);
			//console.log(this.shapeArr[i].codenessX,this.shapeArr[i].codenessY,this.shapeArr[i].tileId,this.tiles[findCodeness].tileId)
//this.shapeArr[i] = this.tiles[findCodeness];

			this.shapeArr[i].bottomRightX = this.tiles[findCodeness].bottomRightX;
			this.shapeArr[i].bottomRightY = this.tiles[findCodeness].bottomRightY;
			this.shapeArr[i].downLeftX = this.tiles[findCodeness].downLeftX;
			this.shapeArr[i].downLeftY = this.tiles[findCodeness].downLeftY;
			this.shapeArr[i].topLeftX = this.tiles[findCodeness].topLeftX;
			this.shapeArr[i].topLeftY = this.tiles[findCodeness].topLeftY;
			this.shapeArr[i].topRightX = this.tiles[findCodeness].topRightX;
			this.shapeArr[i].topRightY = this.tiles[findCodeness].topRightY;
			this.shapeArr[i].tileId = this.tiles[findCodeness].tileId;

			this.shapeArr[i].codenessX = codenessXDash;
			this.shapeArr[i].codenessY = codenessYDash;
			//console.log(this.shapeArr[i].codenessX,this.shapeArr[i].codenessY,this.shapeArr[i].tileId,this.tiles[findCodeness].tileId)
			this.possDistanceUpdate();

			//console.log(this.shapeArr[i],this.shapeArr,i)


		}
	}

	//draw the object
	draw(){
		//console.log(this.shapeArr);
		let tileNav;
		for (let i=0;i<this.shapeArr.length;i++){
			tileNav = this.shapeArr[i].tileId;
			this.tileArr[tileNav].tileColor = 'rgba(255,255,0)';
			this.tileArr[tileNav].fillValue = this.shapeArr[i].fillValue;
		}
	}

}

//capital L shaped Object
class Basalt extends CharObject{
	constructor(brickColor,center,tiles,tileArr){
		super();
		this.color = brickColor;
		this.color = '#ffffff';
		this.center = center;
		this.centerBrickX = center.y;
		this.centerBrickY = center.x;
		this.brickValue = 0;
		this.tileArr = tileArr;
		this.tiles = tiles.tiles;
		this.shapeArr;
	}

	makeObject(){
		let currentPos = {};
		currentPos = this.gotoCenter(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoDown(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoDown(currentPos);
		this.addBrick(currentPos,true)
		currentPos = this.gotoRight(currentPos);
		this.addBrick(currentPos,true)
	}

}

//trangle shaped Object
class Diamand extends CharObject{}
//straight line stick shaped oject
class Limestone extends CharObject{}
//very rectanluar shaped object
class Marble extends CharObject{}
//dancing figure looking object
class Granite extends CharObject{}

window.onload = function(){
	//const webSocket = new SocketWs('localhost',4000);
	//webSocket.createWsServer();
	let panel = new Canvas(500,500)
	let canvas = panel.makeCanvas();
	let imageReady = new ObjectManx(100,100,'/src/images/earth.jpg',canvas,0,0);
	imageReady.getImage();

	//grid system create
	const Grid = new TilesManupiulate(24,16,panel.width,panel.height,canvas);
	Grid.createTile();
	//console.log(Grid.arrTile);

	const basalt1 = new Basalt('#ffffff',{x:5,y:8},Grid,Grid.arrTile);

	basalt1.makeObject();
	//basalt1.draw();
	basalt1.turnLeft();
	//basalt1.draw();
	//console.log(basalt1);
	basalt1.turnLeft();
	//basalt1.draw();
	basalt1.turnLeft();
	//basalt1.draw();
	//basalt1.turnLeft();

	basalt1.draw();


	let [x,y] = [0,0];
	const fps = 30;

	loop();

	//Main Game Loop
	function loop(){

		setTimeout(function() {
			//clean the canvas
			basalt1.draw();
			basalt1.turnLeft();
			canvas.clearRect(0,0,panel.width,panel.height);
			for (let i=0; i<Grid.arrTile.length;i++){
				if (Grid.arrTile[i].fillValue == true){
					Grid.arrTile[i].drawlines();
						
	
					//console.log(Grid.arrTile[i])
				}
			}
			
			window.requestAnimationFrame(loop);
		},1000 / fps);

	}
}


