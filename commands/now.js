module.exports.run = (client, message) => {
    const queue = require('../liste.json');
    
    const Discord = require('discord.js');

    let song = queue.liste
    
    let musicfs = song[client.page];

        const embed = new Discord.MessageEmbed()
        .addField('Joué actuellement :', `${musicfs.titre}`, false)
        .setTimestamp()
        message.channel.send(embed)
}
