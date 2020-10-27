const ytdl = require('ytdl-core-discord');
const queue = require('../json/liste.json');
const config = require('../json/config.json');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAhPLtjqee-H0lINdBEP5a_2rO6UuRtICM");

module.exports.run = (client, message) => {
    message.delete();

    if(!message.member.hasPermission("KICK_MEMBERS")) return;
    start(client, message)
}

const start = async (client, message) => {
    let song = queue.liste;
    let musicfs = song[client.page];
    client.page = 0;
    var resultats = await youtube.getVideo(musicfs.url);

    return playSong(client, message, resultats)
}

const playSong = async (client, message, resultats) => {

    const canal = message.guild.channels.cache.get(`770684296175943712`);

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
        client.page = 0;
        start(client, message)
    });

}
