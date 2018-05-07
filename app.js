/*
(information)
- require는 다른 파일에 있는 module을 불러오게 도와준다.
*/
var restify = require('restify');
var config = require('./config.js');

const server = restify.createServer({
	name: config.name,
	version: config.version,
});

server.listen(config.port, () => {
  console.log("server start!");
  console.log("port : %d", config.port);
});
