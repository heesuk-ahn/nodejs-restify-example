# node-restify-example


## restify란?

- 오로지 Restful API를 만들기 위한 Node.js module이다.
- Node.js에서 유명한 Express module에서도 Restful API를 지원하지만,
웹 서버기 때문에, RestFul API를 제외한 View단도 지원하므로, 단지 Restful API만을 위해서는 사용하기에 무겁다.

## restify 서버 만들기

- 기본적으로 Node.js와 Atom이 컴퓨터 설치되어 있다는 가정하에 진행한다.

- 우리는 아무것도 없는 상태에서 restify 서버를 만들 것이다.

- step 1) Desktop 경로에 node-restify-example 이라는 폴더를 생성한다.

- step 2) 콘솔에서 해당 폴더로 들어가서 `npm init`을 쳐준다

- step 3) npm init 명령어를 치게되면 해당 디렉토리에 `package.json` 파일이 생성된다.
  그후 완료될 때까지, 엔터만 눌러준다.

- step 4) config.js라는 파일을 생성한 후, 아래대로 따라 코딩한다.

```javascript
/*
(information)

- javascript에서 module은 관련된 코드들을 하나의 코드 단위로 캡슐화 할때 사용된다.
- 위와 같은 module은 다른 js파일에서 사용될 수 있어야 재사용되고, 활용도가 높아질 수 있다.
  그러기 위해서, module.exports를 사용하는데, 이는 다른 파일에서 import하기 위한 선언이라고
  이해하면 된다.
- 아래 코드는 config module을 만든것인데,
*/

module.exports = {
	name:'API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000'
};
```

- step 5) terminal을 열고, 해당 디렉토리 경로에서 `sudo npm install restify --save`를 입력한다.
  이는 npm으로부터 모듈을 다운로드 받게 해주고, --save는 package.json 파일에 dependencies를 자동으로 추가해준다.

```javascript
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

```

- step 6) terminal에서 해당 디렉토리 경로에서 아래와 같은 명령어를 쳤을 때, 터미널에 `server start` 가 나오면
  서버가 정상적으로 해당 포트에 boot up되었다는 것을 알 수 있다.

```terminal
  node app.js
```

- step 7) step 6를 통해서 app이 정상적으로 3000번 포트에 물린것을 확인했다면, 해당 터미널을 종료 후에,
  다시 Atom으로 와서 이번에는 `routes` 라는 디렉토리를 생성한다.

- step 8) routes 밑에 `createTodoRoute.js` 라는 파일을 생성한다. 경로는 `routes/createTodoRoute.js`가 될 것이다.

- step 9) 이제 test를 위한 모듈을 추가할 것이다. 우리가 사용할 모듈은 `mocha`이다.

```
  mac : sudo npm install mocha --save
  window : npm install mocha -- save (관리자 모드로 명령프롬포트 실행)
```

- step 10) package.json에 해당 스크립트를 추가한다.

```javascript
"scripts": {
  "test": "node_modules/.bin/mocha $(find ./test -name '*.js') --recursive -w"
}
```
위에 스크립트는 `mocha` test를 실행할 때 사용되는 스크립트이다. 위에 -w 옵션은 watcher 옵션으로
테스트가 변경되면 즉각적으로 테스트 성공? 실패?에 대해서 모니터링이 가능하다.

- step 11) test 라는 폴더를 생성한다 (`node-resify-example/test`).
그 후, test 폴더에 test1.js라는 파일을 만들어 간단한 테스트를 진행해보자.

```javascript
var assert = require('assert')

describe('Test suit', function(){
  it('should be ok', function() {
      assert.equal(1, 2);
  });
});
```

mocha 테스트는 `describe` 함수의 첫번째에 테스트를 할 대상 주어를 작성하고, 그리고 it에는 동사를
작성한다. 위에 테스트 예시를 보면, Test suit는 OK여야 한다고 적은 것이다.
`assert`는 TDD 테스트시에 많이 사용되는 비교함수로, 첫번째 인자와 두번째 인자가 같은지 확인한다.

Q. 여기서 테스트를 통과하게 하려면 어떻게 해주면 될까? 테스트를 통과하게 바꿔보고, 실행시켜 확인해보세요.

- step 12) 작성한 테스트가 동작하는지 확인해보자. 우리가 예상하기로는 실패하여야 한다.
  왜냐면 1과 2는 엄연히 다른 숫자이기 때문이다. 실행은 해당 디렉토리 터미널에서 (/node-resify-exmaple)
  `npm test` 커맨드를 입력하면 된다.

## Database Set up 하기

- Database는 간단하게 생각하자면, 컴퓨터가 기억하고 있는 테이블 정보이다. 이러한 테이블 정보를
  손쉽게 관리하고, 접근하기 위한 툴셋이 데이터베이스라고 생각하면 된다.

- 일반적으로 Database도 언어를 가지고 있다. Query문이라고 하는 것이 그것인데, 우리는 이러한 쿼리문을
  치는 것이 귀찮으므로, `ORM`을 사용할 것이다.

- `ORM`은 `Object-relational mapping` 약자로 단순하게 표현하면, 객체와 관계와의 설정이다.

- 좀 더 쉽게 얘기하면, 쿼리문 대신 라이브러리를 이용해서 데이터베이스에 접근한다고 생각하면 된다.

- ORM을 추가하자. ORM은 `sequelize`를 사용한다.

```terminal
mac :
  1) sudo npm install sequelize --save
  2) sudo npm install pg pg-hstore --save
  3) sudo npm install -g sequelize-cli

window (관리자 모드 실행):
  1) npm install sequelize --save
  2) npm install pg pg-hstore --save
  3) npm install -g sequelize-cli
```

- `sequelize-cli`를 이용하면, 제일 초기 ORM 설정을 좀 더 쉽게 할 수 있다.
  아래 커맨드를 입력하면, `models`라는 폴더와 `config`라는 폴더가 생성된다.

```terminal
sequelize init:config --config config/sequelize.json
sequelize init:models

```

- `config/sequelize.json`을 살펴보자. 여기서 보면 key 값에 development, test, production
  이렇게 3가지로 나누어져 있는 것을 알 수 있다. 이는 데이터베이스가 환경에 따라서 타켓 데이터 베이스를 변경해주기
  위함이다. 왜 이런 환경이 나누어져야하는가? 만약에 실제로 서비스를 개발을 할 때, production에 있는 데이터베이스는
  실제 유저가 사용하는 데이터들이 저장되어있기 때문에, 매우 조심스럽게 다루어야 할 것이다.
  실수로 정말 실수로 user 데이터 베이스를 날려버린다면..? 페이스북 개발자가 실수로 테스트를 하다가 20억명
  유저 데이터를 날린다면 엄청난 대사건이 될 것이다.
   그래서 개발환경 데이터베이스 환경설정을 따로 할 수 있도록 나누어져 있는 것이고,
    이는 `NODE_ENV` 라는 환경 변수를 추가하여 변경할 수 있다.

```json
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "database",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "database",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "database",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

- 다음으로 `models/index.js`를 살펴보자. 이 파일은 간단히 생각하면, models 아래에 table을
  정의하면, 그 table을 읽어들여서 `db`라는 컨텍스트로 만들어주는 파일이다.
  이 `db`를 통해서 우리는 다른 파일에서도 원하는 테이블에 접근할 수 있다.
  여기서 말하는 테이블은 user 정보를 담는 테이블, 학과 정보를 담는 테이블등 유저가 저장하고 싶은
  데이터들의 일련의 집합을 의미한다.

```javascript
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
```


- docker-compose.yml 파일을 추가한 후, 아래 내용을 입력한다.

```
version: '2'
services:
  postgres:
    image: postgres:9.5.4
    ports:
      - "7432:7432"
    environment:
      - POSTGRES_USER=root
      - POSTGRES_DB=database
      - POSTGRES_PASSWORD=root
```
