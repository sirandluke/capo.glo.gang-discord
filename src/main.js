require('dotenv').config();

// General.
const fs = require('fs');
const path = require('path');
const songs_path = path.join(__dirname, 'songs.json');
const songs = JSON.parse(fs.readFileSync(songs_path).toString());

// Discord Initializations.
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';

// YouTube Initializations.
const { getSong } = require('./youtube');

// Genius Initializations.
const { getLyric } = require('./genius');


client.once('ready', () => {
  console.log('cap.glo.gang is online');
});

function randSong() {
  let count = songs.count;
  let index = Math.floor(Math.random() * count);
  return songs.discography[index];
}

client.on('message', async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'quote') {  // Return lyric as quote.
    let title = randSong()
    await getLyric(title).then(lyric => {
      msg.channel.send(`> ***"${lyric.body}"***\n *${lyric.title}*`);
    }).catch(error => {
      console.log(error);
    });
  } else if (command === 'song') {
    let title = randSong()
    await getSong(title).then(url => {
      msg.channel.send(url);
    }).catch(error => {
      console.log(error);
      msg.channel.send('Oh no!\nIt looks like Capo bot has exceeded the daily allotment of YouTube API calls :cry:\nIf you enjoy **capo.glo.gang**, consider donating to help pay hosting costs, api calls, and future projects at https://paypal.me/srdbeatz?locale.x=en_US\n Thanks! :heart_decoration:');
    });
  } else if ('help') {
    // Return valid list of commands.
    msg.channel.send('Valid Commands:\n`-quote` => Returns a lyric from a Capo song.\n`-song` => Returns a YouTube link to a Capo related video.\n`-help`  => Returns this message.\n');
  } else {
    return;
  }
});


client.login(process.env.DISCORD_TOKEN);
