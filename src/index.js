const execa = require('execa');
const { waitFor } = require('poll-until-promise');

const defaultOptions = {
  port: 27017,
  containerName: 'mongo-for-testing',
  version: 'latest',
  logger: console,
};

class MongoDocker {
  /**
   * @param {MongoDockerOptions} options - the options for mongo docker container
   */
  constructor(options) {
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  async start() {
    const { port, containerName, version } = this.options;

    this.log('starting mongo docker...');

    await execa('docker', [
      'run',
      '-d',
      '-p',
      `${port}:27017`,
      '--name',
      containerName,
      `mongo:${version}`,
    ]);

    await waitFor(() => this.isRunning(), { interval: 250, timeout: 60000 });

    this.log('mongo docker is ready!');
  }

  async stop() {
    const containerId = await this.findContainerId();

    if (containerId) {
      this.log('stopping mongo docker...');

      // kill the container
      try {
        await execa('docker', ['kill', containerId]);
      } catch (error) {
        // if a container is dead but not removed, this command will throw an error.
        // so just try to kill it if it's running.
      }

      // remove the container
      await execa('docker', ['rm', containerId]);

      this.log('mongo docker stopped.');
    } else {
      this.log('no container found');
    }
  }

  async isRunning() {
    try {
      await this.eval('db.adminCommand({ ping: 1 })');
      return true;
    } catch (error) {
      return false;
    }
  }

  async exists() {
    const containerId = await this.findContainerId();
    return !!containerId;
  }

  eval(script) {
    const { containerName } = this.options;
    return execa('docker', [
      'exec',
      containerName,
      'mongo',
      '--eval',
      `"${script}"`,
    ]);
  }

  async findContainerId() {
    const { containerName } = this.options;
    const { stdout } = await execa('docker', ['ps', '-a']);

    const line = stdout.split('\n').find((rawLine) => rawLine.includes(containerName));

    if (!line) {
      return undefined;
    }

    const [containerId] = line.split(' ');
    return containerId;
  }

  log(...args) {
    this.options.logger.log(...args);
  }
}

module.exports = MongoDocker;
