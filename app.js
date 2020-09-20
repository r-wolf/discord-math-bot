import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import config from "./config.js";

const { prefix, command_folder } = config;
const bot = new Client();

bot.login(process.env.DISCORD_TOKEN).then(() => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
bot.commands = new Collection();

const files = readdirSync(`./${command_folder}`).filter((f) =>
  f.endsWith(".js")
);

files.forEach(async (f) => {
  const module = await import(`./${command_folder}/${f}`);
  bot.commands.set(module.name, module);
  console.info(`Registered '${module.name}' -> ${module.description}`);
});

bot.on("message", (message) => {
  const { content } = message;

  if (message.author.bot || !content.startsWith(prefix)) {
    return;
  }

  const { commands } = bot;
  const args = content.slice(prefix.length).trim().split(/ +/);
  const keyword = args.shift();

  if (commands.has(keyword)) {
    commands.get(keyword).execute(message);
  }
});
