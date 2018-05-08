
"use strict";

/*
 - 모든 Node 어플리케이션의 비동기식 함수에서는 첫번째 매개변수로는 error를,
   마지막 매개변수로는 callback 함수를 받습니다.
 - https://velopert.com/255 : callback 함수에 대하여
 */
module.exports = db => (userId, callback) => {
  const query = { where: { userId: userId } };
  return db.Todo.findAll(query).then(getTodoLists => {
    callback(getTodoLists);
  })
};
