const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN, PISTOGUEL_CHAT } = require("./config");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const balance = require("./balance");
const notifications = require("./notifications");

const express = require("express");
const app = express();
const host = "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
  if (PISTOGUEL_CHAT) {
    let notifyGroup = null;
    setInterval(async () => {
      notifyGroup = await notifications.expenses();
      notifyGroup
        ? bot.sendMessage(PISTOGUEL_CHAT, notifyGroup, { parse_mode: "HTML" })
        : false;
    }, 60000);
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
      "/start - Apresentação\n/help - Comandos do bot\n/contas - Data de vencimento de cada conta\n/splitwise - Saldo de todo mundo no Splitwise\nAlém disso, mando uma mensagem no dia anterior ao vencimento de alguma conta, junto com o @ da pessoa com maior saldo devedor."
    );
  });

  bot.onText(/\/splitwise/, async msg => {
    let swBalance = await balance.showBalance();
    bot.sendMessage(msg.chat.id, swBalance, { parse_mode: "HTML" });
  });

  bot.onText(/\/contas/, msg => {
    const dueDate =
      "Dia 15 - Água 🚰\n\nDia 15 - Internet 💻\n\nDia 22 - Luz 💡\n\nDia 24 - Aluguel 🏠";
    bot.sendMessage(msg.chat.id, dueDate);
  });
});
