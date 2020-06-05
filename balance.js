const Splitwise = require("splitwise");
const {
  PISTOGUEL_SPLT,
  OSAMA_ID,
  PINK_ID,
  PINOQUIO_ID,
  RINA_ID,
  consumerKey,
  consumerSecret,
  accessToken
} = require("./config");

const showBalance = async () => {
  const sw = Splitwise({
    consumerKey,
    consumerSecret,
    accessToken
  });

  const group = await sw.getGroup({ id: PISTOGUEL_SPLT });
  let balance = "";

  group.members.map(member => {
    const amount = parseFloat(member.balance[0].amount);
    let value = null;
    let emoji = null;

    if (amount < 0) {
      value = `<b>deve</b> ${Math.abs(amount).toFixed(2)}`;
      emoji = "🅾️";
    } else {
      value = `<b>receberá</b> ${Math.abs(amount).toFixed(2)}`;
      emoji = "✅";
    }

    if (member.id === parseInt(OSAMA_ID)) {
      balance = balance.concat(`${emoji} Osama ${value} reais.\n\n`);
    } else if (member.id === parseInt(PINK_ID)) {
      balance = balance.concat(`${emoji} Pink ${value} reais.\n\n`);
    } else if (member.id === parseInt(PINOQUIO_ID)) {
      balance = balance.concat(`${emoji} Pinóquio ${value} reais.\n\n`);
    } else if (member.id === parseInt(RINA_ID)) {
      balance = balance.concat(`${emoji} Rina ${value} reais.\n\n`);
    }
  });

  return balance;
}

const mostNegative = async () => {
  const sw = Splitwise({
    consumerKey,
    consumerSecret,
    accessToken
  });

  const group = await sw.getGroup({ id: PISTOGUEL_SPLT });
  let balance = 1000;
  let user = null;

  group.members.map(member => {
    const amount = parseFloat(member.balance[0].amount);
    if (amount < balance) {
      balance = amount;
      switch (member.id) {
        case parseInt(OSAMA_ID):
          user = "@Aluguel";
          break;
        case parseInt(RINA_ID):
          user = "@leticiarina";
          break;
        case parseInt(PINK_ID):
          user = "@leopiccaro";
          break;
        case parseInt(PINOQUIO_ID):
          user = "@mrpipizones";
          break;
        default:
          break;
      }
    }
  });
  return `🅾️ Maior saldo devedor: ${user} (deve ${Math.abs(balance).toFixed(
    2
  )} reais)`;
}

module.exports = {
  showBalance,
  mostNegative,
};
