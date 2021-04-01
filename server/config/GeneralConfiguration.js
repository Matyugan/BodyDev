class GeneralConfiguration {
  #database = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
  };

  constructor() {
    if (!GeneralConfiguration.instance) GeneralConfiguration.instance = this;
    return GeneralConfiguration.instance;
  }

  get database() {
    return this.#database;
  }
}

module.exports = new GeneralConfiguration();
