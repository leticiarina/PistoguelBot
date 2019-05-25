const balance = require("./balance");

const WATER_INTERNET = 15;
const LIGHT = 22;
const RENT = 24;

module.exports = {
  expenses: async paidExpenses => {
    let message = null;
    const today = new Date();
    const day = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();

    if (hour === 15 && minute === 00) {
      let mostNegative = await balance.mostNegative();

      if (!paidExpenses.water && !paidExpenses.internet) {
        if (day === WATER_INTERNET - 3) {
          message =
            "As contas de <b>água</b> e <b>internet</b> vencem daqui <b>três</b> dias! 🚰💻\n\n";
          message = message.concat(mostNegative);
        } else if (day === WATER_INTERNET) {
          message =
            "As contas de <b>água</b> e <b>internet</b> vencem <b>hoje</b>! 🚰💻\n\n";
          message = message.concat(mostNegative);
        }
      } else if (!paidExpenses.water && paidExpenses.internet) {
        if (day === WATER_INTERNET - 3) {
          message =
            "A conta de <b>água</b> vence daqui <b>três</b> dias! 🚰\n\n";
          message = message.concat(mostNegative);
        } else if (day === WATER_INTERNET) {
          message = "A conta de <b>água</b> vence <b>hoje</b>! 🚰\n\n";
          message = message.concat(mostNegative);
        }
      } else if (paidExpenses.water && !paidExpenses.internet) {
        if (day === WATER_INTERNET - 3) {
          message =
            "A conta de <b>internet</b> vence daqui <b>três</b> dias! 💻\n\n";
          message = message.concat(mostNegative);
        } else if (day === WATER_INTERNET) {
          message = "A conta de <b>internet</b> vence <b>hoje</b>! 💻\n\n";
          message = message.concat(mostNegative);
        }
      }

      if (!paidExpenses.light) {
        if (day === LIGHT - 3) {
          message =
            "A conta de <b>luz</b> vence daqui <b>três</b> dias! 💡\n\n";
          message = message.concat(mostNegative);
        } else if (day === LIGHT) {
          message = "A conta de <b>luz</b> vence <b>hoje</b>! 💡\n\n";
          message = message.concat(mostNegative);
        }
      }

      if (!paidExpenses.rent) {
        if (day === RENT - 3) {
          message = "O <b>aluguel</b> vence daqui <b>três</b> dias! 🏠";
        } else if (day === RENT) {
          message = "O <b>aluguel</b> vence <b>hoje</b>! 🏠";
        }
      }
    }
    return message;
  },
  firstDayOfMonth: () => {
    const today = new Date();
    const day = today.getDate();
    return day === 1 ? true : false;
  }
};
