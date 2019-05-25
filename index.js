const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN, PISTOGUEL_CHAT } = require("./config");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const balance = require("./balance");
const notifications = require("./notifications");

const express = require("express");
const app = express();
const host = "0.0.0.0";
const port = process.env.PORT || 3000;

paidExpenses = {
  water: false,
  internet: false,
  light: false,
  rent: false
};

app.listen(port, host, function() {
  if (PISTOGUEL_CHAT) {
    let notifyGroup = null;
    setInterval(async () => {
      notifyGroup = await notifications.expenses(paidExpenses);
      notifyGroup
        ? bot.sendMessage(PISTOGUEL_CHAT, notifyGroup, { parse_mode: "HTML" })
        : false;
    }, 60000);

    setInterval(() => {
      let resetMonth = notifications.firstDayOfMonth();
      if (resetMonth) {
        paidExpenses = {
          water: false,
          internet: false,
          light: false,
          rent: false
        };
        console.log("First day of month: all expenses set to unpaid.\n");
      }
    }, 60000 * 24);
  }

  bot.onText(/\/start/, msg => {
    bot.sendMessage(
      msg.chat.id,
      "Oi, eu sou o bot da Pistoguel :)\nPara saber o que eu faço, mande o comando /help."
    );
  });

  bot.onText(/\/help/, msg => {
    bot.sendMessage(
      msg.chat.id,
      "/contas - Mostra a data de vencimento de cada conta\n\n/splitwise - Mostra o saldo de todo mundo no Splitwise\n\nAlém disso, mando uma mensagem quando faltar três dias para o vencimento de alguma conta, junto com o @ da pessoa com maior saldo devedor."
    );
  });

  bot.onText(/\/splitwise/, async msg => {
    let swBalance = await balance.showBalance();
    bot.sendMessage(msg.chat.id, swBalance, { parse_mode: "HTML" });
  });

  bot.onText(/\/pago/, msg => {
    bot.sendMessage(msg.chat.id, "Selecione a conta que foi paga.", {
      reply_markup: {
        keyboard: [["🚰 Água", "💻 Internet"], ["💡 Luz", "🏠 Aluguel"]]
      }
    });
  });

  bot.on("message", msg => {
    if (msg.text.indexOf("🚰 Água") === 0) {
      paidExpenses.water = true;
      const message =
        "Conta de <b>água</b> paga! 💵\nA notificação para este mês foi <b>desativada</b>.";
      bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
      console.log("Water expense set as paid.\n");
    }

    if (msg.text.indexOf("💻 Internet") === 0) {
      paidExpenses.internet = true;
      const message =
        "Conta de <b>internet</b> paga! 💵\nA notificação para este mês foi <b>desativada</b>.";
      bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
      console.log("Internet expense set as paid.\n");
    }

    if (msg.text.indexOf("💡 Luz") === 0) {
      paidExpenses.light = true;
      const message =
        "Conta de <b>luz</b> paga! 💵\nA notificação para este mês foi <b>desativada</b>.";
      bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
      console.log("Light expense set as paid.\n");
    }

    if (msg.text.indexOf("🏠 Aluguel") === 0) {
      paidExpenses.rent = true;
      const message =
        "<b>Aluguel</b> pago! 💵\nA notificação para este mês foi <b>desativada</b>.";
      bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
      console.log("Rent set as paid.\n");
    }
  });

  bot.onText(/\/contas/, msg => {
    const dueDate =
      "Dia 15 - Água 🚰\n\nDia 15 - Internet 💻\n\nDia 22 - Luz 💡\n\nDia 24 - Aluguel 🏠";
    bot.sendMessage(msg.chat.id, dueDate);
  });
});
