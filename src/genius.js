// Genius Initializations.
const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_TOKEN);


function getLyric() {
  return new Promise((resolve, reject) => {
    Client.songs.search("capo gbe").then((songs) => {  // Get random lyric from a Capo song.
      var song = songs[Math.floor(Math.random() * songs.length)];
      var title = song.fullTitle;
      song.lyrics().then((lyrics) => {
        let lines = lyrics.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/\[.*\]/)) {
            if (lines[i].includes(':') && !lines[i].includes('Capo')) {  // Removes any verse that does not have Capo
              for (let j = i + 1; j < lines.length; j++) {
                if (!lines[j].match(/\[.*\]/)) {
                  lines.splice(j, 1);
                } else {
                  lines.splice(i, 1);  // Remove [ Intro/Verse/Hook ] line.
                  i = j - 1;
                  break;
                }
              }
            }
            lines.splice(i, 1);  // Remove [ Intro/Verse/Hook ] line.
          } 
        }
        lines = lines.filter(line => { return line !== '';});  // Filter out empty strings.
        let body = lines[Math.floor(Math.random() * songs.length)];
        let lyric = {
          body: body,
          title: title,
        };
        return resolve(lyric);
      }).catch((err) => {
        return reject(err);
      });
    }).catch((err) => {
      return reject(err);
    });
  });
}

module.exports = { getLyric };
