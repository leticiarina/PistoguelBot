const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  consumerKey: process.env.consumerKey,
  consumerSecret: process.env.consumerSecret,
  accessToken: process.env.accessToken,
  BOT_TOKEN: process.env.BOT_TOKEN,
  PISTOGUEL_SPLT: process.env.PISTOGUEL_SPLT,
  PISTOGUEL_CHAT: process.env.PISTOGUEL_CHAT,
  ANA_ID: process.env.ANA_ID,
  OSAMA_ID: process.env.OSAMA_ID,
  PINK_ID: process.env.PINK_ID,
  PINOQUIO_ID: process.env.PINOQUIO_ID,
  RINA_ID: process.env.RINA_ID
};
