/*
(information)
- require는 다른 파일에 있는 module을 불러오게 도와준다.
*/
var restify = require('restify');
var config = require('./config.js');
const db = require(path + '/models');

const server = restify.createServer({
	name: config.name,
	version: config.version,
});



server.listen(config.port, () => {
  console.log("server start!");
  console.log("port : %d", config.port);

	db.sequelize.sync().then(() => {
	    console.log('✓ DB connection success.');
	    console.log('  Press CTRL-C to stop\n');
	  })
	  .catch(err => {
	    console.error(err);
	    console.log('✗ DB connection error. Please make sure DB is running.';
	    process.exit();
	  });
});
