# node-restify-example


## restify란?

- 오로지 Restful API를 만들기 위한 Node.js module이다.
- Node.js에서 유명한 Express module에서도 Restful API를 지원하지만,
웹 서버기 때문에, RestFul API를 제외한 View단도 지원하므로, 단지 Restful API만을 위해서는 사용하기에 무겁다.

## restify 서버 만들기

- 기본적으로 Node.js와 Atom에 설치되어 있다는 가정하에 진행한다.
- 우리는 아무것도 없는 상태에서 restify 서버를 만들 것이다.
- step 1) Desktop 경로에 node-restify-example 이라는 폴더를 생성한다.
- step 2) 콘솔에서 해당 폴더로 들어가서 `npm init`을 쳐준다
- step 3) npm init 명령어를 치게되면 해당 디렉토리에 `package.json` 파일이 생성된다.
  그후 완료될 때까지, 엔터만 눌러준다.
- step 4) config.js라는 파일을 생성한 후, 아래대로 따라 코딩한다.

```
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

```
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

```
  node app.js
```
  
