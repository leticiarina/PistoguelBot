# PistoguelBot

[PT-BR] A Telegram bot to help the management of expenses in Rep Pistoguel (student residence).

## Commands

/start - Presents the bot

/help - Shows available commands and its functions

/comprar - Adds item to grocery list

/comprado - Removes item from grocery list

/contas - Shows due date of water, internet, energy and rent expenses

/listadecompras - Shows grocery list

/pago - Sets an expense as paid and the notification won't be sent to that expense in that month anymore

/splitwise - Shows balance of each member

## Notifications

Three days before each expense due date, the bot sends a message saying that due date is close. Except for the rent, all the notifications also shows who is the person with the biggest negative balance. If a expense is already paid, the notification won't be shown in that month anymore.
