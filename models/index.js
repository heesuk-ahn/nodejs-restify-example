'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
//초기 config의 파일명이 `config.js`로 되어있다면 sequelize.json으로 수정해주자.
var config    = require(__dirname + '/../config/sequelize.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/*
  아래 부분을 잠깐 살펴보자면, 해당 디렉토리에서 파일들을 모두 읽어들여서, 끝이 .js로 끝나는 파일들을
  각각 모두 읽어들여서 import 하는 것이다. 그후 db 객체에 배열로써 넣어준다.
  즉, 우리는 database 스키마 정의를 `models` 하위 파일로 생성하면, 런타임시에 index.js에서 자동으로
  import하여 db 컨텍스트로 만들어준다.
*/
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//아래 exports를 통해서 여기서 만들어진 db object를 외부에서 사용가능한 모듈로 노출시킨다.
module.exports = db;
