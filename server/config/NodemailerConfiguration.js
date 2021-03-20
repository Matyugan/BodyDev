const nodemailer = require("nodemailer");

class NodemailerConfiguration {
  #dataConfig = {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_SECURE,
    auth: {
      user: process.env.NODEMAILER_USER_NAME,
      pass: process.env.NODEMAILER_USER_PASSWORD,
    },
  };
  constructor() {
    if (!NodemailerConfiguration.instance)
      NodemailerConfiguration.instance = this;
    return NodemailerConfiguration.instance;
  }

  getTransporter() {
    return nodemailer.createTransport(this.#dataConfig);
  }
}

const nodemailerConfiguration = new NodemailerConfiguration();

module.exports = nodemailerConfiguration.getTransporter();
