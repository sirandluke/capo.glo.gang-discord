// YouTube Initializations.
const { google } = require('googleapis');
const url = 'https://www.youtube.com/watch?v=';
const max_size = 10;

function getSong(title) {
  return new Promise((resolve, reject) => {
    google.youtube('v3').search.list({  // Returns YouTube link.
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      q: `${title} 'capo glo gang \-interview \-type \-beat \-killed \-kollege \-kidd`,  // Search for capo, no interviews, no type beats, no murder video (GIP).
      maxResults: max_size,
      type: 'video',
      videoDuration: 'short',
      topicId: '/m/0glt670',
    }).then((res) => {
      const { data } = res;
      while (true) {
        item = data.items[Math.floor(Math.random() * max_size)];
        if (item.id.kind === 'youtube#video') {
          return resolve(url + item.id.videoId);
        }
      }
    }).catch((err) => {
      console.log(err);
      return reject(err);
    });
  });
}

module.exports = { getSong };
