const path = process.cwd();
const getTodoList = require(path + '/repository/getTodoList.js');
const db = require(path + '/models');
const sinon = require('sinon');
const assert = require('assert');
const Promise = require('bluebird');

describe('getTodoList', () => {

  var sandbox, getTodoListStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    getTodoListStub = sandbox.stub(db.Todo, "findAll");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get todo lists', () => {
    getTodoListStub.returns(Promise.resolve(
      [
        {
          id: 1,
          content: 'test',
          userId: 1
        }
      ]
    ));
    getTodoList(db)(1, (result) => {
      assert.deepStrictEqual(result, [{
        id: 1,
        content: 'test',
        userId: 1
      }]);
    });
  });
});
