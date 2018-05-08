"use strict";

module.exports = db => (content, userId, callback) => {
  const query = { content: content, userId: userId };
  return db.Todo.create(query).then(createdTodo => {
    callback(createdTodo);
  });
};
