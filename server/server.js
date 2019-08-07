const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const webSocketServer = require("ws").Server;

const server = {};

server.availableFormats = {'js':'text/javascript',
							'ico':'image/x-icon',
							'css':'text/css',
							'png':'image/png',
							'jpg':'image/jpeg'
							};

//server 1 for the websocket protocall wss or ws for the realtime 2 way connection
server.wss = new webSocketServer({port : 4000});  
server.wss.on('connection',function(ws,conn){
	ws.send('welcome to the paradime');
})



//server 2 for the http requests
server.httpServer = http.createServer();

server.httpServer.on('request', (request,responce) => {
	//console.log('requested');
	let contentOut;
	let contentformat;

	let url = request.url;
	let parsedUrl = server.parser(url);
	let pathVar = server.pathmodel(parsedUrl.source);
	responce.statusCode = 200;
	contentformat = parsedUrl.path.trim();
	//console.log(url,contentformat);

	let content = fs.readdir(pathVar,async (err,data) => {
		console.log(data);
		for (let i=0;i<data.length;i++){

			await server.readFiles(pathVar,data[i],async function(file){
				await console.log();
				contentOut = file;
				//console.log(file)

				if (server.availableFormats[contentformat] != undefined){
					server.responceContent(responce,server.availableFormats[contentformat],200,contentOut);
				} else if (contentformat.trim() == ''){
					let res = contentOut;
					//console.log('ok',responce)
					server.responceContent(responce,'text/html',200,res);
				} else {
					let res = 'not Found';
					server.responceContent(responce,'text/plain',404,res);
				}
			})
			
		}
	});
})

server.parser = function(url){
	// url could be either /,js,ico,css
	let properties = {};
	let preurl = url;
	url = url.split('/');
	properties.file = url[url.length - 1];
	properties.source = preurl.replace(properties.file,'');
	properties.path = url[url.length - 1].split('.')[url[url.length - 1].split('.').length - 1];
	//console.log(properties)
	return properties;
}

//defe and configure the parts of path
server.pathmodel = function(patModel){
	let baseDir = path.join(__dirname , '../src/' + patModel);
	console.log(path.join(__dirname , '../src/' + patModel))
	return baseDir;
}

//read the file and return the content of the file
server.readFiles = function(dir,currFile,callback){
	return new Promise(async function(resolve,reject){
		await fs.readFile(dir + currFile,'utf8',(err,filenow) => {
			//console.log(dir + currFile);
			if (!err){
				//console.log(filenow,currFile)
				//xxconsole.log(dir+ 'src/' + currFile);
				resolve(callback(filenow));
			}else{
				
				reject(err);
			}

		});
	}).catch(function(err){
		//console.log(err)
	})
}

server.responceContent = function(responce,contentFormat,statusCode,responceFile){
	responce.File = responceFile;
	responce.setHeader('Content-Type',contentFormat);
	responce.writeHead(statusCode,{'Content-Type' : contentFormat});
	//responce.write(responce.File);
	responce.end(responce.File);
}


console.log("server started at port 3000");
server.httpServer.listen("3000");


module.exports = "server";