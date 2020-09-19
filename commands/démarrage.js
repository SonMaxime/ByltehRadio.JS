const ytdl = require('ytdl-core-discord');
const queue = require('../liste.json');
const config = require('../json/config.json');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.keyYT);

module.exports.run = (client, message) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas les perms.");
    message.channel.send('Démarrage.')
    start(client, message)
}

const start = async (client, message) => {

    let song = queue.liste
    
    let musicfs = song[client.page];
    
    if(musicfs.loop1) {
        client.page = 0;
        let musicfs = song[client.page];
        var resultats = await youtube.getVideo(musicfs.url);

     return playSong(client, message, resultats)

    } else {
    var resultats = await youtube.getVideo(musicfs.url);

    playSong(client, message, resultats)
    }
}

const playSong = async (client, message, resultats) => {
    
    const canal = message.guild.channels.cache.get(`Channel_ID`);

    if (!canal) return message.channel.send("Vérifiez que le canal de connection possède le bon ID.");
    const conn = await canal.join()

    const song = {
        url: `https://www.youtube.com/watch?v=${resultats.id}`
    };

    const musique = {
        connection: conn,
        dispatcher: null,
        songs: [],
        volume: 10
    };
    musique.songs.push(song);
    let musicnow = musique.songs[0];
    musique.dispatcher = await musique.connection.play(await ytdl(musicnow.url, { highWaterMark: 1 << 25, filter: "audioonly" }), {
        type: "opus",
      });

    musique.dispatcher.on('start', () => {
    });
    
    musique.dispatcher.on('finish', () => {
        client.page++;
        start(client, message)
    });

}
