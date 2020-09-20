const { Client } = require("discord.js");
const bot = new Client();

bot.login(process.env.DISCORD_TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (message) => {
  if (message.content === "pi") {
    message.reply(`π: ${Math.PI}`);
  }
});
