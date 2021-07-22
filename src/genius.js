// Genius Initializations.
const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_TOKEN);


function getLyric(title) {
  return new Promise((resolve, reject) => {
    Client.songs.search(title).then((songs) => {  // Get songs.
      let song_name = songs[0].title;
      if (!songs[0].fullTitle.toLocaleLowerCase().includes('capo')) {
        reject();
      }
      songs[0].lyrics().then((lyrics) => {
        let lines = lyrics.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].match(/\[.*\]/)) {
            if (lines[i].includes(':') && !lines[i].toLowerCase().includes('capo')) {  // Removes any verse that does not have Capo.
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
        let content = {
          "body": body,
          "title": song_name,
        };
        return resolve(content);
      }).catch((err) => {
        return reject(err);
      });
    });
  });
}

module.exports = { getLyric };
