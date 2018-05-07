
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
