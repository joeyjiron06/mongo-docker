const MongoDocker = require('./src');

const mongoDocker = new MongoDocker({
  containerName: 'test-mongo',
  port: 9001,
});

async function main() {
  if (await mongoDocker.exists()) {
    await mongoDocker.stop();
  }

  await mongoDocker.start();
}

main();
