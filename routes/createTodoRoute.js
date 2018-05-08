const path = process.cwd();
const createTodoHandler = require(path + '/repository/createTodo.js');
const db = require(path + '/models');

/*
익명함수로 server 파라미터를 받는다.

* 익명 함수 type 1)
fucntion(server) {

}

* arrow 를 이용한 익명함수 type 2)
server => {

}
어떤 스타일을 택할지는 본인 마음~

module.exports = db => (content, userId, callback) => {
*/
module.exports = server => {
  server.post('/todos', (req, res) => {
    const data = req.body;
    const content = data.content;
    const userId = data.userId;

    createTodoHandler(db)(content, userId, result => {
      res.send(result);
    })
  });
}
