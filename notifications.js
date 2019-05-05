const balance = require("./balance");

const WATER = 15;
const INTERNET = 17;
const LIGHT = 22;
const RENT = 24;

module.exports = {
  expenses: async () => {
    let message = null;
    const today = new Date();
    const day = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();

    if (hour === 15 && minute === 00) {
      let mostNegative = await balance.mostNegative();
      switch (day) {
        case WATER - 3:
          message = "A conta de água vence daqui <b>três</b> dias\n\n! 🚰";
          message = message.concat(mostNegative);
          break;
        case WATER:
          message = "A conta de água vence <b>hoje</b>! 🚰\n\n";
          break;
        case INTERNET - 3:
          message = "A conta de internet vence daqui <b>três</b> dias! 💻\n\n";
          message = message.concat(mostNegative);
          break;
        case INTERNET:
          message = "A conta de internet vence <b>hoje</b>! 💻\n\n";
          break;
        case LIGHT - 3:
          message = "A conta de luz vence daqui <b>três</b> dias! 💡\n\n";
          message = message.concat(mostNegative);
          break;
        case LIGHT:
          message = "A conta de luz vence <b>hoje</b>! 💡\n\n";
          break;
        case RENT - 3:
          message = "O aluguel vence daqui <b>três</b> dias! 🏠\n\n";
          break;
        case RENT:
          message = "O aluguel vence <b>hoje</b>! 🏠\n\n";
          break;
        default:
          break;
      }
    }
    return message;
  }
};
