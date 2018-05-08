/*
  (information)
  - Database 모델을 만든다.
  - 여기서 주로 알아야 할 것은, `sequelize`를 이용하여 table을 정의하는 법이다.
  - 아래 모델 테이블 정의에서, id는 `primaryKey`로, 유일무이한 키, 중복되지 않는 키이다.
  - content 컬럼은 실제 내용이 입력되는 컬럼값이다.
  - model을 정의할 때는 sequelize의 define을 이용한다.
  - autoIncrement를 true로하면, 값이 생성될 경우, 인덱스가 1씩 늘어난다.

  * 참고 사이트
  - http://webframeworks.kr/tutorials/expressjs/expressjs_orm_one/ : ORM에 대하여 설명이 잘되어있다.
  -
*/

module.exports = function (sequelize, DataTypes) {
  const todo = sequelize.define('Todo', {
    id: { field: 'id', type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: { field: 'content', type: DataTypes.STRING, allowNull: true },
    userId: { field: 'userId', type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'todo',
    underscored: false
  });
  return todo;
};
