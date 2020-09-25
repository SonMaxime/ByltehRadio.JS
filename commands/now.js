const MessageEmbed = require('discord.js');

module.exports.run = (client, message) => {
    const queue = require('../liste.json');

    let song = queue.liste
    
    let musicfs = song[client.page];

        const embed = new MessageEmbed()
        .addField('Joué actuellement :', `${musicfs.titre}`, false)
        .setTimestamp()
        message.channel.send(embed)
}
