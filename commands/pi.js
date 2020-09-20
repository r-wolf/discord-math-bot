module.exports = {
  name: "pi",
  description: "Prints the value of π",

  execute(message) {
    message.reply(`π: ${Math.PI}`);
  },
};
