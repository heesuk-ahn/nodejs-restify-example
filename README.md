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

- step 8) routes 밑에 `get-todo-lists.js` 라는 파일을 생성한다. 경로는 `routes/get-todo-lists.js`가 될 것이다.

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

- step 11) 이제 간단한 테스트를 작성해보자.

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

- step 12) 작성한 테스트가 동작하는지 확인해보자. 우리가 예상하기로는 실패하여야 한다.
  왜냐면 1과 2는 엄연히 다른 숫자이기 때문이다. 실행은 해당 디렉토리 터미널에서 (/node-resify-exmaple)
  `npm test` 커맨드를 입력하면 된다.


- test directory를 만든다.

- ORM을 추가하자. ORM은 `sequelize`를 사용한다.

```terminal
mack :
  1) sudo npm install sequelize --save
  2) sudo npm install pg pg-hstore --save
  3) sudo npm install -g sequelize-cli

window (관리자 모드 실행):
  1) npm install sequelize --save
  2) npm install pg pg-hstore --save
  3) npm install -g sequelize-cli
```

- docker-compose.yml 파일을 추가한 후, 아래 내용을 입력한다.

```|
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
|```
