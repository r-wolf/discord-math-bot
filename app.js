const { Client, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const bot = new Client();

bot.login(process.env.DISCORD_TOKEN);
bot.commands = new Collection();

const files = fs
  .readdirSync(`./${config.command_folder}`)
  .filter((f) => f.endsWith(".js"));

files.forEach((f) => {
  const command = require(`./${config.command_folder}/${f}`);
  bot.commands.set(command.name, command);
  console.info(`registered command ${command.name}: ${command.description}`);
});

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (message) => {
  const { prefix } = config;
  const { content } = message;
  const { commands } = bot;

  if (message.author.bot || !content.startsWith(prefix)) {
    return;
  }

  const arguments = content.slice(prefix.length).trim().split(/ +/);
  const keyword = arguments.shift();

  if (commands.has(keyword)) {
    commands.get(keyword).execute(message);
  }
});
