const balance = require("./balance");
const cleaningDays = require("./cleaning");

const GATE = 07;
const WATER_INTERNET = 15;
const LIGHT = 17;
const RENT = 24;

module.exports = {
  expenses: async (paidExpenses) => {
    let message = null;
    const today = new Date();
    const day = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();

    if (hour === 15 && minute === 00) {
      let mostNegative = await balance.mostNegative();

      if (day === GATE - 1) {
        message =
          "A parcela do <b>portão</b> vence <b>amanhã</b>! 🏠\n\nValor: R$97.92\n\n@Aluguel @leticiarina @mrpipizones @leopiccaro";
      } else if (day === GATE) {
        message =
          "A parcela do <b>portão</b> vence <b>hoje</b>! 🏠\n\nValor: R$97.92\n\n@Aluguel @leticiarina @mrpipizones @leopiccaro";
      }

      if (!paidExpenses.water && !paidExpenses.internet) {
        if (day === WATER_INTERNET - 1) {
          message =
            "As contas de <b>água</b> e <b>internet</b> vencem <b>amanhã</b>! 🚰💻\n\n";
          message = message.concat(mostNegative);
        } else if (day === WATER_INTERNET) {
          message =
            "As contas de <b>água</b> e <b>internet</b> vencem <b>hoje</b>! 🚰💻\n\n";
          message = message.concat(mostNegative);
        }
      } else if (!paidExpenses.water && paidExpenses.internet) {
        if (day === WATER_INTERNET - 1) {
          message = "A conta de <b>água</b> vence <b>amanhã</b>! 🚰\n\n";
          message = message.concat(mostNegative);
        } else if (day === WATER_INTERNET) {
          message = "A conta de <b>água</b> vence <b>hoje</b>! 🚰\n\n";
          message = message.concat(mostNegative);
        }
      } else if (paidExpenses.water && !paidExpenses.internet) {
        if (day === WATER_INTERNET - 1) {
          message = "A conta de <b>internet</b> vence <b>amanhã</b>! 💻\n\n";
          message = message.concat(mostNegative);
        } else if (day === WATER_INTERNET) {
          message = "A conta de <b>internet</b> vence <b>hoje</b>! 💻\n\n";
          message = message.concat(mostNegative);
        }
      }

      if (!paidExpenses.light) {
        if (day === LIGHT - 1) {
          message = "A conta de <b>luz</b> vence <b>amanhã</b>! 💡\n\n";
          message = message.concat(mostNegative);
        } else if (day === LIGHT) {
          message = "A conta de <b>luz</b> vence <b>hoje</b>! 💡\n\n";
          message = message.concat(mostNegative);
        }
      }

      if (!paidExpenses.rent) {
        if (day === RENT - 1) {
          message =
            "O <b>aluguel</b> vence <b>amanhã</b>! 🏠\n\n@Aluguel @leticiarina @mrpipizones @leopiccaro";
        } else if (day === RENT) {
          message =
            "O <b>aluguel</b> vence <b>hoje</b>! 🏠\n\n@Aluguel @leticiarina @mrpipizones @leopiccaro";
        }
      }

      cleaningDays.map((cleaningDay) => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();

        if (
          day === cleaningDay.getDate() - 1 &&
          month === cleaningDay.getMonth()
        ) {
          message = "Amanhã é dia de <b>faxina</b>! \n\n";
          message = message.concat(mostNegative);
        }
      });
    }
    return message;
  },
  firstDayOfMonth: () => {
    const today = new Date();
    const day = today.getDate();
    return day === 1 ? true : false;
  },
};
