require('dotenv').config();

// Discord Initializations.
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';

// YouTube Initializations.
const { google } = require('googleapis');
const url = 'https://www.youtube.com/watch?v=';
const max_size = 10;

// Genius Initializations.
const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_TOKEN);


client.once('ready', () => {
  console.log('cap.glo.gang is online');
});


client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'quote') {  // Return lyric as quote.
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
        msg.channel.send(`> ***"${body}"***\n *${title}*`);
      }).catch((err) => {
        console.log(err);
      });
    });
  } else if (command === 'song') {
    google.youtube('v3').search.list({  // Returns YouTube link.
      key: process.env.YOUTUBE_TOKEN,
      part: 'snippet',
      q: 'capo glo gang \-interview \-type \-beat \-killed \-kollege \-kidd',  // Search for capo, no interviews, no type beats, no murder video (GIP).
      maxResults: max_size,
      type: 'video',
      videoDuration: 'short',
      topicId: '/m/0glt670',
    }).then((res) => {
      const { data } = res;
      while (true) {
        item = data.items[Math.floor(Math.random() * max_size)];
        if (item.id.kind === 'youtube#video') {
          msg.channel.send(url + item.id.videoId);
          break;
        }
      }
    }).catch((err) => {
      console.log(err);
      msg.channel.send('Oh no!\nIt looks like Capo bot has exceeded the daily allotment of YouTube API calls:cry:\nIf you enjoy **capo.glo.gang**, consider donating to help pay hosting costs, api calls, and future projects at https://paypal.me/srdbeatz?locale.x=en_US\n Thanks! :heart_decoration:');
    });
  } else {
    // Return valid list of commands.
    msg.channel.send('Valid Commands:\n`-quote` => Returns a lyric from a Capo song.\n`-song`   => Returns a YouTube link to a Capo related video.');
  }
});


client.login(process.env.DISCORD_TOKEN);
