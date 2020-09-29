const MongoDocker = require('./index');

describe('index', () => {
  it('should return a MongoDocker class', () => {
    expect(MongoDocker.prototype.start).toBeInstanceOf(Function);
    expect(MongoDocker.prototype.stop).toBeInstanceOf(Function);
    expect(MongoDocker.prototype.isRunning).toBeInstanceOf(Function);
    expect(MongoDocker.prototype.exists).toBeInstanceOf(Function);
    expect(MongoDocker.prototype.eval).toBeInstanceOf(Function);
  });
});
