module.exports = (client, message) => {
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (message.content.indexOf(client.config.prefix) !== 0) return;
  if (!cmd) return message.channel.send("Je crois que cette commande n'existe pas...")
  cmd.run(client, message, args);
};
