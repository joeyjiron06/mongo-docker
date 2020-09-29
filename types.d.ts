interface MongoDockerOptions {
  /**
   * Optional port number to expose on the machine that is running this script
   * @default 27017
   */
  port?: Number;

  /**
   * Optional name for the docker container
   * @default "mongo-for-testing"
   */
  containerName?: String;

  /**
   * Optional version of mongo to run
   * @default latest
   */
  version?: String;

  /**
   * A logger object
   * @default console
   */
  logger?: Object;
}

interface MongoDocker {


  /**
   * Starts a docker instance of mongo with the given options providied in the constructor
   */
  start(): Promise<void>;

  /**
   * Kills and removes the mongo docker instance if one is found
   */
  stop(): Promise<void>;

  /**
   * @returns {boolean} true if mongo is running, otherwise false
   */
  isRunning(): Promise<boolean>;

  /**
   * @returns {boolean} true if mongo docker container exists. Can exist, but may not be running.
   */
  exists(): Promise<boolean>;

  /**
   * Evaluate a mongo script.
   * @param {string} scriptCode - the script code to run in the mongo db docker instance.
   */
  eval(scriptCode: String): Promise<void>;
}