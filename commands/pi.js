export const name = "pi";
export const description = "Prints the value of π";
export function execute(message) {
  message.reply(`π: ${Math.PI}`);
}
