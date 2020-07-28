const balance = require("./balance");
const cleaningDays = require("./cleaning");
const changeCleaning = require("./changeCleaning");

const WATER_INTERNET = 15;
const LIGHT = 17;
const RENT = 24;

const expenses = async () => {
  let message = null;
  const today = new Date();
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();

  if (hour === 15 && minute === 00) {
    let mostNegative = await balance.mostNegative();

    if (day === WATER_INTERNET - 1) {
      message =
        "As contas de <b>água</b> e <b>internet</b> vencem <b>amanhã</b>! 🚰💻\n\n";
      message = message.concat(mostNegative);
    } else if (day === WATER_INTERNET) {
      message =
        "As contas de <b>água</b> e <b>internet</b> vencem <b>hoje</b>! 🚰💻\n\n";
      message = message.concat(mostNegative);
    }

    if (day === LIGHT - 1) {
      message = "A conta de <b>luz</b> vence <b>amanhã</b>! 💡\n\n";
      message = message.concat(mostNegative);
    } else if (day === LIGHT) {
      message = "A conta de <b>luz</b> vence <b>hoje</b>! 💡\n\n";
      message = message.concat(mostNegative);
    }

    if (day === RENT - 1) {
      message =
        "O <b>aluguel</b> vence <b>amanhã</b>! 🏠\n\n@Aluguel @leticiarina @mrpipizones @leopiccaro";
    } else if (day === RENT) {
      message =
        "O <b>aluguel</b> vence <b>hoje</b>! 🏠\n\n@Aluguel @leticiarina @mrpipizones @leopiccaro";
    }

    if (hour === 20 && minute === 00) {
      changeCleaning.map(cleaningDay => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();

        if (
          day === cleaningDay.getDate() &&
          month === cleaningDay.getMonth()
        ) {
          message = "Atualizar planilha de limpeza! \n\nhttps://docs.google.com/spreadsheets/d/1zZloZSBKl-1h30LVrT0QJ6WZ4GPivM4EzkCEEFhGmW4/edit#gid=236045095";
        }
      });
    }
  // Turned off due to pandemics
  // cleaningDays.map(cleaningDay => {
  //   const today = new Date();
  //   const day = today.getDate();
  //   const month = today.getMonth();

  //   if (
  //     day === cleaningDay.getDate() - 1 &&
  //     month === cleaningDay.getMonth()
  //   ) {
  //     message = "Amanhã é dia de <b>faxina</b>! \n\n";
  //     message = message.concat(mostNegative);
  //   }
  // });
  }
  return message;
}

module.exports = {
  expenses,
};
