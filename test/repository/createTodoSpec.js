const path = process.cwd();
const createTodo = require(path + '/repository/createTodo.js');
const db = require(path + '/models');
const sinon = require('sinon');
const assert = require('assert');
const Promise = require('bluebird');

describe('createTodo', () => {

  var sandbox, getTodoListStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    createTodoStub = sandbox.stub(db.Todo, "create");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should create Todo', () => {
    const userId = 1;
    const expectedContent = 'create content';
    createTodoStub.returns(Promise.resolve({
      id: 1,
      content: 'create content',
      userId: 1
    }));
    createTodo(db)(expectedContent, userId, result => {
      assert.deepStrictEqual(result, {
        id: 1,
        content: expectedContent,
        userId: userId
      })
    })
  });
});
