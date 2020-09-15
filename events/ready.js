odule.exports = async client => {
    console.log('connecté');


    let status = [
        {name: 'status en fonction de la musique jouée(en cours de recherche)', type: 'WATCHING'},
    ]
    function setStatus(){
        let randomStatus = status[Math.floor(Math.random()*status.length)]
        client.user.setPresence({activity: randomStatus})
    }
    setStatus();
    setInterval(() => setStatus(), 20000)
}
