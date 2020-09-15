const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.js");

let page = 0;
client.page = page

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/{file}`);
    let eventName = file.split(".")[0];
  });
});

client.commands = new Enmap();
