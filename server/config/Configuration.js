class Configuration {
  #database = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
  };

  constructor() {
    if (!Configuration.instance) Configuration.instance = this;
    return Configuration.instance;
  }

  get database() {
    return this.#database;
  }
}

module.exports = new Configuration();
